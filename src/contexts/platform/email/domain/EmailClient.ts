export abstract class EmailClient {
  abstract send(to: string, message: string): Promise<void>;
}
