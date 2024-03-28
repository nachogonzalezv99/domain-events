import { Service } from "diod";
import { DomainEvent } from "../../../domain/bus/DomainEvent";
import { EventBus } from "../../../domain/bus/EventBus";
import { RabbitMqConnection } from "./RabbitMqConnection";

@Service()
export class RabbitMqEventBus implements EventBus {
  constructor(private readonly connection: RabbitMqConnection) {}

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      const routingKey = event.eventName;
      const content = this.serialize(event);
      const options = this.options(event);

      await this.connection.publish({
        routingKey,
        content,
        options,
        exchange: "domain_events",
      });
    }
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: "application/json",
      contentEncoding: "utf-8",
    };
  }

  private serialize(event: DomainEvent): Buffer {
    const eventPrimitives = {
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        attributes: event.toPrimitives(),
      },
    };

    return Buffer.from(JSON.stringify(eventPrimitives));
  }
  
}
