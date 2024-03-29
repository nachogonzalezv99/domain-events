export abstract class Logger {
  abstract info(message:string): void;
  abstract warning(message:string): void;
  abstract error(message:string): void;
}
