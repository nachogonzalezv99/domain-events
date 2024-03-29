import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { VideoDescription } from "./VideoDescription";
import { VideoDto } from "./VideoDto";
import { VideoId } from "./VideoId";
import { VideoPublishedDomainEvent } from "./VideoPublishedDomainEvent";
import { VideoTitle } from "./VideoTitle";

export class Video extends AggregateRoot {
  private readonly _id: VideoId;
  private readonly _title: VideoTitle;
  private readonly _description: VideoDescription;

  constructor(video: VideoDto) {
    super();
    this._id = new VideoId(video.id);
    this._title = new VideoTitle(video.title);
    this._description = new VideoDescription(video.description);
  }

  static create(video: VideoDto): Video {
    const newVideo = new Video(video);

    newVideo.record(
      new VideoPublishedDomainEvent({
        aggregateId: newVideo.id,
        title: newVideo.title,
        description: newVideo.description,
        authorEmail: "nacho.99@live.com"
      })
    );

    return newVideo;
  }

  get id(): string {
    return this._id.value;
  }
  get title(): string {
    return this._title.value;
  }
  get description(): string {
    return this._description.value;
  }

  toPrimitives(): VideoDto {
    return {
      id: this._id.value,
      title: this._title.value,
      description: this._description.value,
    };
  }
}
