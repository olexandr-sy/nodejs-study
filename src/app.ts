import { json } from 'body-parser';
import { Server } from 'http';
import express, { Express } from 'express';
import { CTYPES } from './container/container.types';
import { IConfigService } from './config/config.service.interface';
import { ILoggerService } from './logger/logger.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IBaseRouter } from './routes/base.router.interface';
import { IExeptionHandler } from './errors/exeption.handler.interface';
import { ISequelizeService } from './database/sequelize.service.interface';

@injectable()
export default class App {
  app: Express;
  server: Server;
  port: number;
  host: string;

  constructor(
    @inject(CTYPES.IConfigService) private configService: IConfigService,
    @inject(CTYPES.ILoggerService) private loggerService: ILoggerService,
    @inject(CTYPES.IBaseRouter) private baseRouter: IBaseRouter,
    @inject(CTYPES.IExeptionHanler) private exeptionHandler: IExeptionHandler,
    @inject(CTYPES.ISequelizeService) private sequelizeService: ISequelizeService,
  ) {
    this.app = express();

    this.port = this.configService.get<number>('POST', 8000);
    this.host = this.configService.get<string>('HOST', 'localhost');
  }

  useMiddlewares(): void {
    this.app.use(json()); // Json body parser for all requests
  }

  useRouters(): void {
    this.baseRouter.initRouters(this.app);
    this.baseRouter.initErrorRouters(this.app);
  }

  useErrors(): void {
    this.app.use(this.exeptionHandler.catch.bind(this.exeptionHandler));
  }

  async init(): Promise<void> {
    this.useMiddlewares();
    this.useRouters();
    this.useErrors();
    await this.sequelizeService.connect();
    this.server = this.app.listen(this.port, this.host, () => {
      this.loggerService.info(`Server listening at host ${this.host}:${this.port}`);
    });
  }
}
