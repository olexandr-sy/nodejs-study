import { NextFunction, Request, Response, Router } from 'express';
import { IBaseMiddleware } from './base.middleware.interface';

export interface IBaseRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
	func: (request: Request, response: Response, next: NextFunction) => void;
	middlewares?: IBaseMiddleware[];
}
