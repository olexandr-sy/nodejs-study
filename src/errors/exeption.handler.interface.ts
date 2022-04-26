import { NextFunction, Request, Response } from 'express';
import { HttpError } from './http-error.class';

export interface IExeptionHandler {
  catch: (
    error: Error | HttpError,
    request: Request,
    response: Response,
    next: NextFunction,
  ) => void;
}
