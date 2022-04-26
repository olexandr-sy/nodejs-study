import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { IBaseMiddleware } from './base.middleware.interface';
import { IBaseRoute } from './base.route.interface';
import 'reflect-metadata';
import { IBaseController } from './base.controller.interface';

@injectable()
export class BaseController implements IBaseController {
	private _router: Router;
	constructor() {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	bindRoutes(routes: IBaseRoute[]): void {
		routes.forEach((route: IBaseRoute) => {
			const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		});
	}
}
