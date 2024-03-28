import { Service } from "diod";
import { DomainEventClass } from "../../shared/domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../../shared/domain/bus/IDomainEventSubscriber";
import { VideoPublishedDomainEvent } from "../../video/domain/VideoPublishedDomainEvent";
import { VideoCounterIncrementer } from "./VideoCounterIncrementer";

@Service()
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

  
  name(): string {
    return "codely.shop.increment_video_counter_on_video_published";
  }
}

