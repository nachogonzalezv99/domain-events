import { DomainEvent } from "../../shared/domain/bus/DomainEvent";

type VideoPublishedDomainEventAttributes = {
  readonly title: string;
  readonly description: string;
  readonly authorEmail: string;
};

export class VideoPublishedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "vide.published";

  readonly title: string;
  readonly description: string;
  readonly authorEmail: string;

  constructor({
    aggregateId,
    title,
    description,
    authorEmail,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    description: string;
    authorEmail: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: VideoPublishedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.title = title;
    this.description = description;
    this.authorEmail = authorEmail;
  }

  toPrimitives(): VideoPublishedDomainEventAttributes {
    const { title, description, authorEmail } = this;
    return {
      title,
      description,
      authorEmail
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: VideoPublishedDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new VideoPublishedDomainEvent({
      aggregateId,
      title: attributes.title,
      description: attributes.description,
      authorEmail: attributes.authorEmail,
      eventId,
      occurredOn,
    });
  }
}
