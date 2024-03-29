import { VideoRepository } from "../domain/VideoRepository";
import { Video } from "../domain/Video";

export class InMemoryVideoRepository implements VideoRepository {
  async save(video: Video): Promise<void> {
    console.log(video);
  }
}
