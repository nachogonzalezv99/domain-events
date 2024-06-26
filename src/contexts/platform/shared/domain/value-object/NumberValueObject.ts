import { ValueObject } from "./ValueObject";

export abstract class NumberValueObject extends ValueObject<number> {
  constructor(value: number) {
    super(Number(value));
  }
  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }
}
