import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationErrorType } from '../errors/validation.error';
import { IBaseMiddleware } from './base.middleware.interface';

export class ValidateMiddleware implements IBaseMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, response: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors): void => {
      if (errors.length > 0) {
        const result: validationErrorType = {};
        errors.forEach((error) => {
          if (error.constraints) {
            result[error.property] = error.constraints;
          }
        });
        next(new ValidationError(result));
      } else {
        next();
      }
    });
  }
}
