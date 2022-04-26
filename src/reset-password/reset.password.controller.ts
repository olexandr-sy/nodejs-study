import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { CTYPES } from '../container/container.types';
import { HttpError } from '../errors/http-error.class';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { IResetPasswordService } from './reset.password.service.interface';
import 'reflect-metadata';
import { ValidationError } from '../errors/validation.error';

@injectable()
export class ResetPasswordController extends BaseController {
  constructor(
    @inject(CTYPES.IResetPasswordService) private resetPasswordService: IResetPasswordService,
  ) {
    super();
    this.bindRoutes([
      {
        path: '/email',
        method: 'post',
        func: this.forgotPassword,
        middlewares: [new ValidateMiddleware(ForgotPasswordDto)],
      },
      {
        path: '/reset',
        method: 'post',
        func: this.resetPassword,
        middlewares: [new ValidateMiddleware(ResetPasswordDto)],
      },
    ]);
  }

  async forgotPassword(
    { body }: Request<{}, {}, ForgotPasswordDto>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.resetPasswordService.sendResetEmail(body.email);
    response.json({ message: 'Email sent' });
  }

  async resetPassword(
    { body }: Request<{}, {}, ResetPasswordDto>,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.resetPasswordService.resetPassword(body);
    if (!result) {
      return next(new ValidationError({ code: { isExpired: 'Code is wrong or expired' } }));
    }
    response.json({ message: 'Password updated' });
  }
}
