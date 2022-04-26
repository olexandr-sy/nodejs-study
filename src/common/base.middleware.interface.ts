import { NextFunction, Request, Response } from 'express';

export class IBaseMiddleware {
	execute: (request: Request, response: Response, next: NextFunction) => void;
}
