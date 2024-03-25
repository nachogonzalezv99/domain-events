import { Video } from "./Video";

export interface IVideoRepository{
    save(video: Video): Promise<void>
}