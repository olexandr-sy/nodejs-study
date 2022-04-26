import { Headers } from 'nodemailer/lib/mailer';

export interface IEmail {
  subject: string;
  plain?: string;
  text: string;
  html?: string;
  headers?: Headers;
}
