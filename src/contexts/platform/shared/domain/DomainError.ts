import httpStatus from "http-status";

export class DomainError extends Error {
  public statusCode: number = httpStatus.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}
