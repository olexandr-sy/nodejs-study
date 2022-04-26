import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import 'reflect-metadata';
import { CTYPES } from '../container/container.types';
import { ILoggerService } from '../logger/logger.service.interface';
import { IBaseService } from '../common/base.service.interface';

@injectable()
export class ConfigService implements IBaseService, IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(CTYPES.ILoggerService) private loggerService: ILoggerService) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.loggerService.error(`[ConfigService] Error with loading .env :${result.error.message}`);
    } else if (result.parsed) {
      this.loggerService.info(`[ConfigService] Env config loaded`);
      this.config = result.parsed;
    } else {
      this.loggerService.error(`[ConfigService] Env config parsing error. Need to check formating`);
    }
  }

  get<T extends string | number | boolean>(key: string, defaultValue?: T): T {
    const value = this.config[key] ?? defaultValue;
    if (!value) {
      throw new Error(`Config value '${key}' is not set`);
    }
    return value as T;
  }
}
