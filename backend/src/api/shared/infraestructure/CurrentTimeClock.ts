import { IClock } from "../domain/IClock";

export class CurrentTimeClock implements IClock {
  now(): Date {
    return new Date();
  }
}
