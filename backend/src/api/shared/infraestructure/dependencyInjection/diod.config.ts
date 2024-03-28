import { ContainerBuilder } from "diod";
import { SendEmailOnVideoPublished } from "../../../email/application/SendEmailOnVideoPublished";
import { VideoPublishedEmailSender } from "../../../email/application/VideoPublishedEmailSender";
import { EmailClient } from "../../../email/domain/EmailClient";
import { ConsoleLogEmailClient } from "../../../email/infraestructure/ConsoleLogEmailClient";
import { VideoPublisher } from "../../../video/application/VideoPublisher";
import { VideoRepository } from "../../../video/domain/VideoRepository";
import { InMemoryVideoRepository } from "../../../video/infraestructure/InMemoryVideoRepository";
import { IncrementVideoCounterOnVideoPublished } from "../../../videoCounter/application/IncrementVideoCounterOnVideoPublished";
import { VideoCounterIncrementer } from "../../../videoCounter/application/VideoCounterIncrementer";
import { VideoCounterRepository } from "../../../videoCounter/domain/VideoCounterRepository";
import { InMemoryVideoCounterRepository } from "../../../videoCounter/infraestructure/InMemoryVideoCounterRepository";
import { UuidGenerator } from "../../domain/IUuidGenerator";
import { EventBus } from "../../domain/bus/EventBus";
import { V4UuidGenerator } from "../V4UuidGenerator";
import { RabbitMqConnection } from "../bus/rabbitMq/RabbitMqConnection";
import { RabbitMqEventBus } from "../bus/rabbitMq/RabbitMqEventBus";

const builder = new ContainerBuilder();

builder.register(UuidGenerator).use(V4UuidGenerator);

builder.registerAndUse(RabbitMqConnection);
builder.register(EventBus).use(RabbitMqEventBus);

builder.registerAndUse(SendEmailOnVideoPublished).addTag("subscriber");
builder.registerAndUse(VideoPublishedEmailSender);
builder.register(EmailClient).use(ConsoleLogEmailClient);

builder.registerAndUse(IncrementVideoCounterOnVideoPublished).addTag("subscriber");
builder.registerAndUse(VideoCounterIncrementer);
builder.register(VideoCounterRepository).use(InMemoryVideoCounterRepository);

builder.registerAndUse(VideoPublisher);
builder.register(VideoRepository).use(InMemoryVideoRepository);

export const container = builder.build();