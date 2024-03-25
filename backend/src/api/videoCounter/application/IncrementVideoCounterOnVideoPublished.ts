import { DomainEventClass } from "../../shared/domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../../shared/domain/bus/IDomainEventSubscriber";
import { VideoPublishedDomainEvent } from "../../video/domain/VideoPublishedDomainEvent";
import { VideoCounterIncrementer } from "./VideoCounterIncrementer";

export class IncrementVideoCounterOnVideoPublished
  implements IDomainEventSubscriber<VideoPublishedDomainEvent>
{
  constructor(private incrementer: VideoCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [VideoPublishedDomainEvent];
  }

  async on(domainEvent: VideoPublishedDomainEvent) {
    await this.incrementer.run(domainEvent.aggregateId);
  }
}
