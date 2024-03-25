import { DomainEvent } from "./DomainEvent";
import { IDomainEventSubscriber } from "./IDomainEventSubscriber";

export interface IEventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: Array<IDomainEventSubscriber<DomainEvent>>): void;
}
