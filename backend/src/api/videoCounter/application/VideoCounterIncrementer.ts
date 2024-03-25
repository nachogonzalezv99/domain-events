import { IUuidGenerator } from "../../shared/domain/IUuidGenerator";
import { IVideoCounterRepository } from "../domain/IVideoCounterRepository";
import { VideoCounter } from "../domain/VideoCounter";

export class VideoCounterIncrementer {
  constructor(
    private readonly uuidGenerator: IUuidGenerator,
    private readonly repository: IVideoCounterRepository
  ) {}

  async run(id: string) {
    const counter =
      (await this.repository.search()) ||
      VideoCounter.create({ id: this.uuidGenerator.generate() });

    counter.increment();

    await this.repository.save(counter);
  }
}
