import { ISequelizeService } from './sequelize.service.interface';
import { Sequelize } from 'sequelize-typescript';
import { inject, injectable } from 'inversify';
import { CTYPES } from '../container/container.types';
import { ILoggerService } from '../logger/logger.service.interface';
import { IConfigService } from '../config/config.service.interface';
import 'reflect-metadata';
import { resolve } from 'path';
import { IBaseService } from '../common/base.service.interface';

@injectable()
export class SequeliseService implements IBaseService, ISequelizeService {
  client: Sequelize;

  constructor(
    @inject(CTYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(CTYPES.IConfigService) private configService: IConfigService,
  ) {
    this.client = new Sequelize(this.configService.get('DB_URL'), {
      dialect: 'mysql',
      models: [resolve(__dirname + '/../../models/*.model.ts')],
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.authenticate();
      this.loggerService.info(`[SequeliseService] Database connected`);
    } catch (error) {
      if (error instanceof Error) {
        this.loggerService.error([
          `[SequeliseService] Database connection error: ${error.message}`,
        ]);
      }
    }
  }
  async disconnect(): Promise<void> {
    await this.client.close();
  }
}
