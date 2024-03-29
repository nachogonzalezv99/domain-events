import { ContainerBuilder } from "diod";
import { VideoPostController } from "../../../../../apps/api/controllers/v1/video/VideoPostController";
import { ErrorHandlerMiddleware } from "../../../../../apps/api/middlewares/ErrorHandlerMiddleware";
import { SendEmailOnVideoPublished } from "../../../email/application/SendEmailOnVideoPublished";
import { VideoPublishedEmailSender } from "../../../email/application/VideoPublishedEmailSender";
import { EmailClient } from "../../../email/domain/EmailClient";
import { ConsoleLogEmailClient } from "../../../email/infraestructure/ConsoleLogEmailClient";
import { PublishVideoService } from "../../../video/application/PublishVideoService";
import { VideoRepository } from "../../../video/domain/VideoRepository";
import { InMemoryVideoRepository } from "../../../video/infraestructure/InMemoryVideoRepository";
import { IncrementVideoCounterOnVideoPublished } from "../../../videoCounter/application/IncrementVideoCounterOnVideoPublished";
import { VideoCounterIncrementer } from "../../../videoCounter/application/VideoCounterIncrementer";
import { VideoCounterRepository } from "../../../videoCounter/domain/VideoCounterRepository";
import { InMemoryVideoCounterRepository } from "../../../videoCounter/infraestructure/InMemoryVideoCounterRepository";
import { UuidGenerator } from "../../domain/IUuidGenerator";
import { EventBus } from "../../domain/bus/EventBus";
import { Logger } from "../../domain/observability/Logger";
import { V4UuidGenerator } from "../V4UuidGenerator";
import { RabbitMqConnection } from "../bus/rabbitMq/RabbitMqConnection";
import { RabbitMqEventBus } from "../bus/rabbitMq/RabbitMqEventBus";
import { WinstonLogger } from "../observability/WinstonLogger";
import { InMemoryAsyncEventBus } from "../bus/InMemoryAsyncEventBus";
import { IDomainEventSubscriber } from "../../domain/bus/IDomainEventSubscriber";
import { DomainEvent } from "../../domain/bus/DomainEvent";

const builder = new ContainerBuilder();

builder.registerAndUse(VideoPostController);

builder.register(UuidGenerator).use(V4UuidGenerator);
builder.register(Logger).use(WinstonLogger);
builder.registerAndUse(ErrorHandlerMiddleware);

builder.registerAndUse(RabbitMqConnection);

builder.registerAndUse(SendEmailOnVideoPublished).addTag("subscriber");
builder.registerAndUse(VideoPublishedEmailSender);
builder.register(EmailClient).use(ConsoleLogEmailClient);

builder
  .registerAndUse(IncrementVideoCounterOnVideoPublished)
  .addTag("subscriber");
builder.registerAndUse(VideoCounterIncrementer);
builder.register(VideoCounterRepository).use(InMemoryVideoCounterRepository);

builder.registerAndUse(PublishVideoService);
builder.register(VideoRepository).use(InMemoryVideoRepository);

builder.register(EventBus).useFactory((c) => {
  const subscribers = container
    .findTaggedServiceIdentifiers<IDomainEventSubscriber<DomainEvent>>(
      "subscriber"
    )
    .map((id) => container.get(id));

  return new InMemoryAsyncEventBus(subscribers);
});

export const container = builder.build();
