import httpStatus from "http-status";
import { DomainError } from "../DomainError";

export class InvalidArgumentError extends DomainError {
  constructor(value: string) {
    super(value);
    this.statusCode = httpStatus.BAD_REQUEST;
  }
}
