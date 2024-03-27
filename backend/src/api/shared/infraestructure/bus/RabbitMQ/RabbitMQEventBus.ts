import { DomainEvent } from "../../../domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../../../domain/bus/IDomainEventSubscriber";
import { IEventBus } from "../../../domain/bus/IEventBus";
import { RabbitMQConnection } from "./RabbitMQConnection";

export class RabbitMQEventBus implements IEventBus {
  private connection: RabbitMQConnection;
  private exchange: string;

  constructor(params: { connection: RabbitMQConnection }) {
    this.connection = params.connection;
    this.exchange = 'amq.topic';
  }

  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void {
    throw new Error('Method not implemented.');
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      const routingKey = event.eventName;
      const content = this.serialize(event);
      const options = this.options(event);

      await this.connection.publish({ routingKey, content, options, exchange: this.exchange });
    }
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8'
    };
  }

  private serialize(event: DomainEvent): Buffer {
    const eventPrimitives = {
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        attributes: event.toPrimitives()
      }
    };

    return Buffer.from(JSON.stringify(eventPrimitives));
  }
}