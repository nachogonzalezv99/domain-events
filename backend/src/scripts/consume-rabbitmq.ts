import "reflect-metadata";

import { ConsumeMessage } from "amqplib";
import {
  DomainEvent,
  DomainEventClass,
} from "../api/shared/domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../api/shared/domain/bus/IDomainEventSubscriber";
import { DomainEventJsonDeserializer } from "../api/shared/infraestructure/bus/DomainEventJsonDeserializer";
import { RabbitMqConnection } from "../api/shared/infraestructure/bus/rabbitMq/RabbitMqConnection";
import { container } from "../api/shared/infraestructure/dependencyInjection/diod.config";

const connection = new RabbitMqConnection();

const subscribers = container
  .findTaggedServiceIdentifiers<IDomainEventSubscriber<DomainEvent>>(
    "subscriber"
  )
  .map((id) => container.get(id));

const eventMapping = new Map<string, DomainEventClass>();

subscribers.forEach((subscriber) => {
  subscriber.subscribedTo().forEach((eventClass) => {
    eventMapping.set(eventClass.EVENT_NAME, eventClass);
  });
});

const deserializer = new DomainEventJsonDeserializer(eventMapping);

async function main(): Promise<void> {
  await connection.connect();

  await Promise.all(
    subscribers.map((subscriber) =>
      connection.consume(subscriber.name(), consume(subscriber))
    )
  );
}

function consume(subscriber: IDomainEventSubscriber<DomainEvent>) {
  return async function (message: ConsumeMessage): Promise<void> {
    const content = message.content.toString();
    const domainEvent = deserializer.deserialize(content);

    await subscriber.on(domainEvent);
    await connection.ack(message);
  };
}

main().catch(console.error);
