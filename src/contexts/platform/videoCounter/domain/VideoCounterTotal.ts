import { NumberValueObject } from "../../shared/domain/value-object/NumberValueObject";

export class VideoCounterTotal extends NumberValueObject {
  increment(): VideoCounterTotal {
    return new VideoCounterTotal(this.value + 1);
  }

  static initialize(): VideoCounterTotal {
    return new VideoCounterTotal(0);
  }
}
