import "reflect-metadata";

import { createExpressServer, useContainer } from "routing-controllers";
import { container } from "../../contexts/platform/shared/infraestructure/dependencyInjection/diod.config";
import { env } from "./env";

useContainer(container);

createExpressServer({
  controllers: [__dirname + "/controllers/**/*{.js,.ts}"],
  middlewares: [__dirname + "/middlewares/*{.js,.ts}"],
  defaultErrorHandler: false,
}).listen(env.APP_PORT, () =>
  console.log(`Server running on port <${env.APP_PORT}>`)
);
