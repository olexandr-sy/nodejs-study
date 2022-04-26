import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { CTYPES } from '../container/container.types';
import { IAuthController } from './auth.controller.interface';
import { IAuthService } from './auth.service.interface';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import 'reflect-metadata';
import { HttpError } from '../errors/http-error.class';

@injectable()
export class AuthController extends BaseController implements IAuthController {
	constructor(@inject(CTYPES.IAuthService) private authService: IAuthService) {
		super();
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(LoginDTO)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(RegisterDTO)],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, LoginDTO>,
		response: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.authService.login(body);
		if (!result) {
			return next(new HttpError('Wrong credetials', 422));
		}
		response.status(200).json(result);
	}

	async register(
		{ body }: Request<{}, {}, RegisterDTO>,
		response: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.authService.register(body);
		if (!result) {
			return next(new HttpError('Email already taken', 422));
		}
		response.status(201).json({});
	}
}
