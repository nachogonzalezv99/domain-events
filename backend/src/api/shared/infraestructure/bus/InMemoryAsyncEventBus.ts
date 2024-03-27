import { EventEmitter } from "stream";
import { DomainEvent } from "../../domain/bus/DomainEvent";
import { IEventBus } from "../../domain/bus/IEventBus";
import { IDomainEventSubscriber } from "../../domain/bus/IDomainEventSubscriber";

export class InMemoryAsyncEventBus extends EventEmitter implements IEventBus {
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
