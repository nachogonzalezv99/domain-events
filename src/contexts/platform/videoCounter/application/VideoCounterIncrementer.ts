
import { Service } from "diod";
import { UuidGenerator } from "../../shared/domain/IUuidGenerator";
import { VideoCounter } from "../domain/VideoCounter";
import { VideoCounterRepository } from "../domain/VideoCounterRepository";

@Service()
export class VideoCounterIncrementer {
  constructor(
    private readonly uuidGenerator: UuidGenerator,
    private readonly repository: VideoCounterRepository
  ) {}

  async run(id: string) {
    const counter =
      (await this.repository.search()) ||
      VideoCounter.create({ id: this.uuidGenerator.generate() });

    counter.increment();

    await this.repository.save(counter);
  }
}
