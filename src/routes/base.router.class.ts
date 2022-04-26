import { Express, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IAuthController } from '../auth/auth.controller.interface';
import { CTYPES } from '../container/container.types';
import { IResetPasswordController } from '../reset-password/reset.password.controller.interface';
import { IBaseRouter } from './base.router.interface';
import 'reflect-metadata';

@injectable()
export class BaseRouter implements IBaseRouter {
  constructor(
    @inject(CTYPES.IAuthController) private authController: IAuthController,
    @inject(CTYPES.IResetPasswordController) private resetPswController: IResetPasswordController,
  ) {}

  initRouters(app: Express): void {
    app.use('/auth', this.authController.router);
    app.use('/forgot-password', this.resetPswController.router);
  }

  initErrorRouters(app: Express): void {
    app.get(/.*/, (request: Request, response: Response) => {
      response.status(404).json({ message: 'Page not found' });
    });
  }
}
