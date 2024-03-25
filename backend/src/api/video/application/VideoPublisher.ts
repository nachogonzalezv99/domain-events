import { IUuidGenerator } from "../../shared/domain/IUuidGenerator";
import { IEventBus } from "../../shared/domain/bus/IEventBus";
import { IVideoRepository } from "../domain/IVideoRepository";
import { Video } from "../domain/Video";

export class VideoPublisher {
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private readonly repository: IVideoRepository,
    private readonly eventBus: IEventBus
  ) {}

  async run(title: string, description: string) {
    const video = Video.create({
      id: this.uuidGenerator.generate(),
      title,
      description,
    });

    await this.repository.save(video);
    await this.eventBus.publish(video.pullDomainEvents());
  }
}
