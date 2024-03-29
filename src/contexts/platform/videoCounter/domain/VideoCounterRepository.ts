import { VideoCounter } from "./VideoCounter";

export abstract class VideoCounterRepository {
  abstract search(): Promise<VideoCounter | null>;
  abstract save(videoCounter: VideoCounter): Promise<void>;
}
