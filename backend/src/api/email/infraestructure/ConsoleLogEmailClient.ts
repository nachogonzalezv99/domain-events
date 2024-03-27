import { IEmailClient } from "../domain/IEmailClient";

export class ConsoleLogEmailClient implements IEmailClient {
  async send(to: string, message: string): Promise<void> {
    console.log(to, message);
  }
}
