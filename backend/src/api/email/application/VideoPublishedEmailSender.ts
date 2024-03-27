import { IEmailClient } from "../domain/IEmailClient";

export class VideoPublishedEmailSender {
  constructor(private readonly emailClient: IEmailClient) {}

  async run(email: string, title: string) {
    await this.emailClient.send(
      email,
      `Video <${title}> published successfully.`
    );
  }
}
