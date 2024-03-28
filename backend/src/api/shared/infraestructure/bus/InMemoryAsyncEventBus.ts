import { EventEmitter } from "stream";
import { DomainEvent } from "../../domain/bus/DomainEvent";
import { EventBus } from "../../domain/bus/EventBus";
import { IDomainEventSubscriber } from "../../domain/bus/IDomainEventSubscriber";
import { Service } from "diod";

@Service()
export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: IDomainEventSubscriber<DomainEvent>[]): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
