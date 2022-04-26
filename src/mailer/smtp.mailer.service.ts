import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { CTYPES } from '../container/container.types';
import { IEmail } from './emails/email.interface';
import { ISmptMailerService } from './smtp.mailer.interface';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ILoggerService } from '../logger/logger.service.interface';

@injectable()
export class SmptMailerService implements ISmptMailerService {
	private _email?: IEmail;
	private _client?: Transporter<SMTPTransport.SentMessageInfo>;

	constructor(
		@inject(CTYPES.IConfigService) private configService: IConfigService,
		@inject(CTYPES.ILoggerService) private loggerService: ILoggerService,
	) {
		const host = this.configService.get<string>('MAIL_HOST');
		if (!host) {
			this.loggerService.error('[SmtpMailer] Configuration is not set');
			return;
		}

		this._client = nodemailer.createTransport({
			host: host,
			port: this.configService.get<number>('MAIL_PORT'),
			secure: false, // use TLS
			auth: {
				user: this.configService.get<string>('MAIL_USERNAME'),
				pass: this.configService.get<string>('MAIL_PASSWORD'),
			},
		});
	}

	setEmail(email: IEmail): this {
		this._email = email;
		return this;
	}

	async send(to: string, cc?: string[], bcc?: string[]): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this._client) {
				return reject(new Error('SMTP configuration is not set to .env'));
			}
			if (!this._email) {
				return reject(new Error('Set email template by method: setEmail()'));
			}

			this._client.sendMail(
				{
					from: {
						name: this.configService.get<string>('MAIL_FROM_NAME'),
						address: this.configService.get<string>('MAIL_FROM_ADDRESS'),
					},
					to: to,
					bcc: bcc,
					cc: cc,
					...this._email,
				},
				(error, info) => {
					if (error) {
						this.loggerService.error(`[SmtpMailer] Mailing error: ${error.message}`);
						reject();
					}
					resolve();
				},
			);
		});
	}
}
