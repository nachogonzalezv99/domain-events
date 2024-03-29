import { Service } from "diod";
import { UuidGenerator } from "../../shared/domain/IUuidGenerator";
import { EventBus } from "../../shared/domain/bus/EventBus";
import { Video } from "../domain/Video";
import { VideoRepository } from "../domain/VideoRepository";

@Service()
export class PublishVideoService {
  constructor(
    private readonly uuidGenerator: UuidGenerator,
    private readonly repository: VideoRepository,
    private readonly eventBus: EventBus
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
