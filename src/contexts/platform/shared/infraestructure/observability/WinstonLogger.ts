import winston from "winston";
import { env } from "../../../../../apps/api/env";
import { Logger } from "../../domain/observability/Logger";

export class WinstonLogger implements Logger {
  info(message: string): void {
    
  }

  warning(message: string): void {
    
  }
  
  error(message: string) {
    this.integrateWithConsole();
    this.integrateWithFile();

    winston.error(message);

    // const logger = winston.createLogger({
    //   level: 'info',
    //   format: winston.format.json(),
    //   transports: [new winston.transports.Console()],
    // });

    // logger.error('Error message');

  }



  private integrateWithConsole(): void {
    winston.add(
      new winston.transports.Console({
        level: "info",
        format:
          env.NODE_ENV === "production"
            ? winston.format.json()
            : winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
              ),
        handleExceptions: env.NODE_ENV === "production" ? undefined : true,
      })
    );
  }

  private integrateWithFile(): void {
    winston.add(
      new winston.transports.File({
        level: "info",
        format: winston.format.json(),
        filename: "error.log",
      })
    );
  }

  //   private integrateWithLoki(): void {
  //      winston.add(new LokiTransport({
  //         level: "info",
  //         format: winston.format.json(),
  //         host: env.LOKI_URL,
  //         labels: {
  //             app: String(env.APP_NAME),
  //             env: env,
  //             envConfigure: env
  //         }
  //         onConnectionError: err=>{
  //             console.error("Cannot reach Loki server");
  //             console.error(err)
  //         }
  //      }))
  //   }
}
