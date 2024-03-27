import express from "express";
import { InMemoryAsyncEventBus } from "./shared/infraestructure/InMemoryEventBus";
import { V4UuidGenerator } from "./shared/infraestructure/V4UuidGenerator";
import { VideoPublisher } from "./video/application/VideoPublisher";
import { InMemoryVideoRepository } from "./video/infraestructure/InMemoryVideoRepository";
import { IncrementVideoCounterOnVideoPublished } from "./videoCounter/application/IncrementVideoCounterOnVideoPublished";
import { VideoCounterIncrementer } from "./videoCounter/application/VideoCounterIncrementer";
import { InMemoryVideoCounterRepository } from "./videoCounter/infraestructure/InMemoryVideoCounterRepository";
import { VideoPublishedEmailSender } from "./email/application/VideoPublishedEmailSender";
import { ConsoleLogEmailClient } from "./email/infraestructure/ConsoleLogEmailClient";
import { VideoPublishedDomainEvent } from "./video/domain/VideoPublishedDomainEvent";
import { SendEmailOnVideoPublished } from "./email/application/SendEmailOnVideoPublished";

const app = express();

const uuidGenerator = new V4UuidGenerator();
const videoRepository = new InMemoryVideoRepository();
const videoCounterRepository = new InMemoryVideoCounterRepository();
const eventBus = new InMemoryAsyncEventBus();
const videoPublisher = new VideoPublisher(
  uuidGenerator,
  videoRepository,
  eventBus
);

const videoCountSubscriber = new VideoCounterIncrementer(
  uuidGenerator,
  videoCounterRepository
);
const videoCountIncrementerEvent= new IncrementVideoCounterOnVideoPublished(
  videoCountSubscriber
);

const emailClient = new ConsoleLogEmailClient()
const emailSender = new VideoPublishedEmailSender(emailClient)
const emailSendDomainEvent = new SendEmailOnVideoPublished(emailSender)
eventBus.addSubscribers([videoCountIncrementerEvent, emailSendDomainEvent]);

app.post("/videos", async () => {
  await videoPublisher.run("Titulo 1", "Descripción");
});

app.listen(3000, () => {
  console.log(`Server listening on  port ${3000}`);
});
