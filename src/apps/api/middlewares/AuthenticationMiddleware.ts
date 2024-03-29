import { Service } from "diod";
import { Request, Response } from "express";
import { Middleware, UnauthorizedError } from "routing-controllers";
import { Logger } from "../../../contexts/platform/shared/domain/observability/Logger";

@Service()
@Middleware({ type: "before" })
export class ErrorHandlerMiddleware {
  constructor(private readonly logger: Logger) {}

  public authenticate(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) throw new UnauthorizedError()

    let token = authHeader.split(" ")[1];
    token = token.split("!").join(".");

    const email = validateToken(token);
    const user = await userRepository.findByEmail(new UserEmail(email));
    const userPrimitives = user.toPrimitives();

    req.userId = userPrimitives.id;
    req.userRoles = userPrimitives.roles;
    req.user = new User(userPrimitives);
    user.activeGuard();
  }
}
