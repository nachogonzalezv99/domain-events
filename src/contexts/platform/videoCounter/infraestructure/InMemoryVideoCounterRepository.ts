import { Uuid } from "../../shared/domain/value-object/Uuid";
import { VideoCounter } from "../domain/VideoCounter";
import { VideoCounterRepository } from "../domain/VideoCounterRepository";

export class InMemoryVideoCounterRepository implements VideoCounterRepository {
  async search(): Promise<VideoCounter | null> {
    return new VideoCounter({ id: Uuid.random().value, total: 0 });
  }

  async save(videoCounter: VideoCounter): Promise<void> {
    console.log(videoCounter);
  }
}
