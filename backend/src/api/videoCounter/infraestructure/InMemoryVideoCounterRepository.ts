import { Uuid } from "../../shared/domain/value-object/Uuid";
import { IVideoCounterRepository } from "../domain/IVideoCounterRepository";
import { VideoCounter } from "../domain/VideoCounter";

export class InMemoryVideoCounterRepository implements IVideoCounterRepository {
  async search(): Promise<VideoCounter | null> {
    return new VideoCounter({ id: Uuid.random().value, total: 0 });
  }

  async save(videoCounter: VideoCounter): Promise<void> {
    console.log(videoCounter);
  }
}
