import { EmailClient } from "../domain/EmailClient";


export class ConsoleLogEmailClient implements EmailClient {
  async send(to: string, message: string): Promise<void> {
    console.log(to, message);
  }
}
