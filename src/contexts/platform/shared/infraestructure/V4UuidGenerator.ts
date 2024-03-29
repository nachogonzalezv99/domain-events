import { v4 } from "uuid";
import { UuidGenerator } from "../domain/IUuidGenerator";

export class V4UuidGenerator implements UuidGenerator {
  generate(): string {
    return v4();
  }
}
