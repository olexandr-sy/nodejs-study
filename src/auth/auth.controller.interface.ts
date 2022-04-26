import { NextFunction, Request, Response } from 'express';
import { IBaseController } from '../common/base.controller.interface';

export interface IAuthController extends IBaseController {
	login: (request: Request, response: Response, next: NextFunction) => Promise<void>;
	register: (request: Request, response: Response, next: NextFunction) => Promise<void>;
}
