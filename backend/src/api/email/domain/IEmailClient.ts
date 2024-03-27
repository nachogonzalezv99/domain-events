export interface IEmailClient {
  send(to: string, message: string): Promise<void>;
}
