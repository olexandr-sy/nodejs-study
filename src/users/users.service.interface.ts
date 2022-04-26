import User from '../../models/user.model';

export interface IUserService {
  createUser: (data: IUserCreate) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  hashPassword: (password: string) => Promise<string>;
  comparePasswords: (password: string, hash: string) => Promise<boolean>;
}

export interface IUserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserUpdate {
  password: string;
}
