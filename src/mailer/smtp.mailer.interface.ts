import { IEmail } from './emails/email.interface';

export interface ISmptMailerService {
  setEmail: (email: IEmail) => this;
  send: (to: string, scc?: string[], bcc?: string[]) => Promise<void>;
}
