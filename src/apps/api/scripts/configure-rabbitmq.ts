import "reflect-metadata"
import { DomainEvent } from "../../../contexts/platform/shared/domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../../../contexts/platform/shared/domain/bus/IDomainEventSubscriber";
import { RabbitMqConnection } from "../../../contexts/platform/shared/infraestructure/bus/rabbitMq/RabbitMqConnection";
import { container } from "../../../contexts/platform/shared/infraestructure/dependencyInjection/diod.config";

const connection = new RabbitMqConnection();

 const exchangeName = "domain_events";

const subscribers = container
  .findTaggedServiceIdentifiers<IDomainEventSubscriber<DomainEvent>>(
    "subscriber"
  )
  .map((id) => container.get(id));

const queues: {
  name: string;
  bindingKeys: string[];
}[] = subscribers.map((subscriber) => ({
  name: subscriber.name(),
  bindingKeys: subscriber.subscribedTo().map((event) => event.EVENT_NAME),
}));

async function main(): Promise<void> {
  await connection.connect();

  await connection.declareExchange(exchangeName);

  await Promise.all(
    queues.map((queue) =>
      connection.declareQueue(queue.name, exchangeName, queue.bindingKeys)
    )
  );

  await connection.close();
}

main().catch(console.error);
