import { Service } from "diod";
import { EmailClient } from "../domain/EmailClient";

@Service()
export class VideoPublishedEmailSender {
  constructor(private readonly emailClient: EmailClient) {}

  async run(email: string, title: string) {
    await this.emailClient.send(
      email,
      `Video <${title}> published successfully.`
    );
  }
}
