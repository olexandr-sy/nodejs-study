import { NextFunction, Request, Response } from 'express';
import { IBaseController } from '../common/base.controller.interface';

export interface IResetPasswordController extends IBaseController {
	forgotPassword: (request: Request, response: Response, next: NextFunction) => Promise<void>;
	resetPassword: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
