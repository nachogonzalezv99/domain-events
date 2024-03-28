import { Video } from "./Video";

export abstract class VideoRepository{
    abstract save(video: Video): Promise<void>
}