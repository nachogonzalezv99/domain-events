import { DomainEventClass } from "../../shared/domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../../shared/domain/bus/IDomainEventSubscriber";
import { VideoPublishedDomainEvent } from "../../video/domain/VideoPublishedDomainEvent";
import { VideoPublishedEmailSender } from "./VideoPublishedEmailSender";

export class SendEmailOnVideoPublished
  implements IDomainEventSubscriber<VideoPublishedDomainEvent>
{
  constructor(private emaiLSender: VideoPublishedEmailSender) {}

  subscribedTo(): DomainEventClass[] {
    return [VideoPublishedDomainEvent];
  }

  async on(domainEvent: VideoPublishedDomainEvent) {
    await this.emaiLSender.run(domainEvent.authorEmail, domainEvent.title);
  }
}
