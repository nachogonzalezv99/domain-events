import { v4 } from "uuid";
import { IUuidGenerator } from "../domain/IUuidGenerator";

export class V4UuidGenerator implements IUuidGenerator {
  generate(): string {
    return v4();
  }
}
