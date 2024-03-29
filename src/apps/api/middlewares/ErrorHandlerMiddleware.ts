import { Service } from "diod";
import { Request, Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { DomainError } from "../../../contexts/platform/shared/domain/DomainError";
import { Logger } from "../../../contexts/platform/shared/domain/observability/Logger";

@Service()
@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(private readonly logger: Logger) {}

  public error(originalError: Error, req: Request, res: Response) {
    const responseError = this.toReponseError(originalError);

    res.status(responseError.httpCode).json({
      name: responseError.name,
      message: responseError.message,
      type: originalError.constructor.name,
    });

    const logError = this.toLogError(originalError);

    const errorMsg = `${logError.message}: ${logError.stack}`;
    // const errorTitle = `[user-id: ${req.user.id}] ${logError.name}`;

    this.logger.error(errorMsg);
  }

  private toReponseError(originalError: Error): HttpError {
    const error = {
      httpCode:
        originalError instanceof DomainError ? originalError.statusCode : 500,
      name: originalError.name,
      message:
        originalError instanceof DomainError
          ? originalError.message
          : "Something went wrong.Try again.",
    };

    return error;
  }

  private toLogError(originalError: Error): HttpError {
    const error = {
      httpCode:
        originalError instanceof DomainError ? originalError.statusCode : 500,
      name: originalError.name,
      message: originalError.message,
      stack: originalError.stack,
    };

    return error;
  }
}
