import httpStatus from "http-status";

export class AppError extends Error {
  protected statusCode: number = httpStatus.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}
