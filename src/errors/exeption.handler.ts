import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { CTYPES } from '../container/container.types';
import { LoggerService } from '../logger/logger.service';
import { IExeptionHandler } from './exeption.handler.interface';
import { HttpError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionHandler implements IExeptionHandler {
	constructor(@inject(CTYPES.ILoggerService) private loggerService: LoggerService) {}

	catch(error: Error | HttpError, request: Request, response: Response, next: NextFunction): void {
		if (error instanceof HttpError) {
			this.loggerService.error(
				`[ExeptionHandler] [${error.context ?? '-'}] Error (${error.code}) - ${error.message}`,
			);
			response.status(error.code).send({ message: error.message });
		} else {
			this.loggerService.error(`[ExeptionHandler] Unexpected error: ${error.message}`);
			response.status(500).json({ message: 'Internal server error' });
		}
	}
}
