import { DomainEvent } from "../../../src/api/shared/domain/bus/DomainEvent";
import { DomainEventSubscriber } from "../../../src/api/shared/domain/bus/IDomainEventSubscriber";
import { EventBus } from "../../../src/api/shared/domain/bus/EventBus";


export default class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: DomainEvent[]) {
    this.publishSpy(events);
  }

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][0];

    const expected = this.getDataFromDomainEvent(expectedEvent);
    const published = this.getDataFromDomainEvent(lastPublishedEvent);

    expect(expected).toMatchObject(published);
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event;

    return attributes;
  }
}