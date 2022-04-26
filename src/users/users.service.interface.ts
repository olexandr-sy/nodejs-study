import User from '../../models/user.model';

export interface IUserService {
	createUser: (data: UserCreateInterface) => Promise<User | null>;
	findByEmail: (email: string) => Promise<User | null>;
	comparePasswords: (password: string, hash: string) => Promise<boolean>;
}

export interface UserCreateInterface {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}
