import httpStatus from "http-status";
import { AppError } from "../AppError";

export class InvalidArgumentError extends AppError {
  constructor(value: string) {
    super(value);
    this.statusCode = httpStatus.BAD_REQUEST;
  }
}
