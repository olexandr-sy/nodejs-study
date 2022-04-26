import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILoggerService } from './logger.service.interface';
import 'reflect-metadata';
import { IBaseService } from '../common/base.service.interface';

@injectable()
export class LoggerService implements IBaseService, ILoggerService {
  logger: Logger;
  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false,
    });
  }

  info(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }
}
