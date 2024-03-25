import { VideoCounter } from "./VideoCounter";

export interface IVideoCounterRepository {
  search(): Promise<VideoCounter | null>;
  save(videoCounter: VideoCounter): Promise<void>;
}
