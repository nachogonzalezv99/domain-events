import { DomainEvent, DomainEventClass } from "./DomainEvent";

export interface IDomainEventSubscriber<T extends DomainEvent> {
  subscribedTo(): Array<DomainEventClass>;
  on(domainEvent: T): Promise<void>;
}
