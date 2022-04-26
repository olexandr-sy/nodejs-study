import { Express } from 'express';

export interface IBaseRouter {
  initRouters: (app: Express) => void;
  initErrorRouters: (app: Express) => void;
}
