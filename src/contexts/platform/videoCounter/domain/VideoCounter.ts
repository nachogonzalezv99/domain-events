import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { VideoCounterDto } from "./VideoCounterDto";
import { VideoCounterId } from "./VideoCounterId";
import { VideoCounterTotal } from "./VideoCounterTotal";

export class VideoCounter extends AggregateRoot {
  private readonly _id: VideoCounterId;
  private _total: VideoCounterTotal;

  constructor(videoCounter: VideoCounterDto) {
    super();
    this._id = new VideoCounterId(videoCounter.id);
    this._total = new VideoCounterTotal(videoCounter.total);

  }

  static create(videoCounter: Omit<VideoCounterDto, "total">): VideoCounter {
    return new VideoCounter({ ...videoCounter, total: 0 });
  }

  increment() {
    this._total = this._total.increment();
  }

  get id(): string {
    return this._id.value;
  }
  get total(): number {
    return this._total.value;
  }

  toPrimitives(): VideoCounterDto {
    return {
      id: this._id.value,
      total: this._total.value,
    };
  }
}
