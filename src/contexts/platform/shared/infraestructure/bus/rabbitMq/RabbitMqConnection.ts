import amqplib, { ConsumeMessage } from "amqplib";
import { ConnectionSettings } from "./ConnectionSettings";

export class RabbitMqConnection {
  private readonly connectionSettings: ConnectionSettings = {
    username: "guest",
    password: "guest",
    vhost: "/",
    connection: {
      hostname: "localhost",
      port: 5672,
      secure: false,
    },
  };

  protected channel?: amqplib.ConfirmChannel;
  protected connection?: amqplib.Connection;

  async connect() {
    this.connection = await this.amqpConnect();
    this.channel = await this.amqpChannel();
  }

  private async amqpConnect() {
    const { hostname, port, secure } = this.connectionSettings.connection;
    const { username, password, vhost } = this.connectionSettings;
    const protocol = secure ? "amqps" : "amqp";

    const connection = await amqplib.connect({
      protocol,
      hostname,
      port,
      username,
      password,
      vhost,
    });

    connection.on("error", (err: any) => {
      Promise.reject(err);
    });

    return connection;
  }

  private async amqpChannel(): Promise<amqplib.ConfirmChannel> {
    const channel = await this.connection!.createConfirmChannel();
    await channel.prefetch(1);

    return channel;
  }

  async declareExchange(exchangeName: string): Promise<void> {
    await this.channel!.assertExchange(exchangeName, "topic", {
      durable: true,
    });
  }

  async declareQueue(
    name: string,
    exchangeName: string,
    bindingKeys: string[]
  ): Promise<void> {
    await this.channel!.assertQueue(name, {
      exclusive: false,
      durable: true,
      autoDelete: false,
    });

    await Promise.all(
      bindingKeys.map((bindingKey) =>
        this.channel!.bindQueue(name, exchangeName, bindingKey)
      )
    );
  }

  async publish(params: {
    exchange: string;
    routingKey: string;
    content: Buffer;
    options: {
      messageId: string;
      contentType: string;
      contentEncoding: string;
    };
  }) {
    await this.connect();

    const { routingKey, content, options, exchange } = params;
    return new Promise((resolve: Function, reject: Function) => {
      this.channel!.publish(
        exchange,
        routingKey,
        content,
        options,
        (error: any) => (error ? reject(error) : resolve())
      );
    });
  }

  async consume(queue: string, subscriber: (message: ConsumeMessage) => {}): Promise<void> {
		await this.channel!.consume(queue, (message: ConsumeMessage | null) => {
			if (message) {
				subscriber(message);
			}
		});
	}

  async ack(message: ConsumeMessage): Promise<void> {
		this.channel!.ack(message);
	}


  async close() {
    await this.channel?.close();
    return await this.connection?.close();
  }
}
