import { Sequelize } from 'sequelize';

export interface ISequelizeService {
  client: Sequelize;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
