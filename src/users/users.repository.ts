import { injectable } from 'inversify';
import User from '../../models/user.model';
import { IUserRepository } from './users.repository.interface';
import 'reflect-metadata';
import { UserCreateInterface } from './users.service.interface';

@injectable()
export class UserRepository implements IUserRepository {
	async create(data: UserCreateInterface): Promise<User> {
		return await User.create<User>(data);
	}

	async findByEmail(email: string): Promise<User | null> {
		return await User.findOne<User>({
			where: {
				email: email,
			},
		});
	}
}
