import { EventEmitter } from "stream";
import { DomainEvent } from "../domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../domain/bus/IDomainEventSubscriber";
import { IEventBus } from "../domain/bus/IEventBus";

export class InMemoryAsyncEventBus extends EventEmitter implements IEventBus {
  async publish(events: DomainEvent[]): Promise<void> {
    events.map((event) => this.emit(event.eventName, event));
  }

  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>) {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((event) => {
        this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
      });
    });
  }
}
