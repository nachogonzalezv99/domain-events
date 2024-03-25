import { IVideoRepository } from "../domain/IVideoRepository";
import { Video } from "../domain/Video";

export class InMemoryVideoRepository implements IVideoRepository {
  async save(video: Video): Promise<void> {
    console.log(video);
  }
}
