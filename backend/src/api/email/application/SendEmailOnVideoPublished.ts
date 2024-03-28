import { Service } from "diod";
import { DomainEventClass } from "../../shared/domain/bus/DomainEvent";
import { IDomainEventSubscriber } from "../../shared/domain/bus/IDomainEventSubscriber";
import { VideoPublishedDomainEvent } from "../../video/domain/VideoPublishedDomainEvent";
import { VideoPublishedEmailSender } from "./VideoPublishedEmailSender";

@Service()
export class SendEmailOnVideoPublished
  implements IDomainEventSubscriber<VideoPublishedDomainEvent>
{
  constructor(private emailSender: VideoPublishedEmailSender) {}

  subscribedTo(): DomainEventClass[] {
    return [VideoPublishedDomainEvent];
  }

  async on(domainEvent: VideoPublishedDomainEvent) {
    await this.emailSender.run(domainEvent.authorEmail, domainEvent.title);
  }

  name(): string {
    return "codely.retention.send_email_on_video_published";
  }
}
