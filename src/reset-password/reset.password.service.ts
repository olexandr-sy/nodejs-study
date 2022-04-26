import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { CTYPES } from '../container/container.types';
import { IUserService } from '../users/users.service.interface';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { IResetPasswordService } from './reset.password.service.interface';
import 'reflect-metadata';
import { IResetPasswordRepository } from './reset.password.repository.interface';
import { ISmptMailerService } from '../mailer/smtp.mailer.interface';
import { ForgotPasswordEmail } from '../mailer/emails/forgot.password.email';
import { send } from 'process';

@injectable()
export class ResetPasswordService implements IResetPasswordService {
	constructor(
		@inject(CTYPES.IConfigService) private configService: IConfigService,
		@inject(CTYPES.IUserService) private userService: IUserService,
		@inject(CTYPES.IResetPasswordRepository) private resetPswRepository: IResetPasswordRepository,
		@inject(CTYPES.ISmtpMailerService) private smtpMailerService: ISmptMailerService,
	) {}

	async sendResetEmail(email: string): Promise<void> {
		const existedUser = await this.userService.findByEmail(email);
		if (!existedUser) {
			return;
		}

		const code = await this.createNewCode(existedUser.email);
		if (!code) {
			return;
		}

		this.smtpMailerService.setEmail(new ForgotPasswordEmail()).send(existedUser.email);
	}

	async resetPassword({ code, password }: ResetPasswordDto): Promise<boolean | null> {
		// check code
		// find user
		// update user

		return true;
	}

	async createNewCode(email: string): Promise<string | null> {
		const code = String(this.randomIntBetween(10000000, 99999999));
		const newResetPassword = await this.resetPswRepository.create(email, code);
		return newResetPassword ? code : null;
	}

	private randomIntBetween(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}
}
