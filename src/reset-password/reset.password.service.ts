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
import ResetPassword from '../../models/reset.password.model';
import { ILoggerService } from '../logger/logger.service.interface';
import { IBaseService } from '../common/base.service.interface';

@injectable()
export class ResetPasswordService implements IBaseService, IResetPasswordService {
  constructor(
    @inject(CTYPES.IConfigService) private configService: IConfigService,
    @inject(CTYPES.IUserService) private userService: IUserService,
    @inject(CTYPES.IResetPasswordRepository) private resetPswRepository: IResetPasswordRepository,
    @inject(CTYPES.ISmtpMailerService) private smtpMailerService: ISmptMailerService,
    @inject(CTYPES.ILoggerService) private loggerService: ILoggerService,
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

    this.smtpMailerService.setEmail(new ForgotPasswordEmail(code)).send(existedUser.email);
  }

  async resetPassword({ code, password }: ResetPasswordDto): Promise<boolean | null> {
    const existedCode = await this.resetPswRepository.findByCode(code);
    if (!existedCode || !this.validateCode(existedCode)) {
      return null;
    }
    const existedUser = await this.userService.findByEmail(existedCode.email);
    if (existedUser) {
      existedUser.password = await this.userService.hashPassword(password);
      existedUser?.save();
    } else {
      this.loggerService.error(
        `[ResetPasswordService] Wrong email saved in reset password table: ${existedCode.email}`,
      );
      return false;
    }
    return true;
  }

  async createNewCode(email: string): Promise<string | null> {
    const code = String(this.randomIntBetween(10000000, 99999999));
    const newResetPassword = await this.resetPswRepository.create(email, code);
    return newResetPassword ? code : null;
  }

  private validateCode(existedCode: ResetPassword | null): boolean {
    return (existedCode &&
      (new Date().getTime() - existedCode.createdAt.getTime()) / 60000 < 35) as boolean;
  }

  private randomIntBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
