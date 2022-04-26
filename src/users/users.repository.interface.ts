import User from '../../models/user.model';

export interface IUserRepository {
  create: (data: UserCreateInterface) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}

export interface UserCreateInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
