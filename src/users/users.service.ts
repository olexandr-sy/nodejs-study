import User from '../../models/user.model';
import { inject, injectable } from 'inversify';
import { CTYPES } from '../container/container.types';
import { IUserRepository } from './users.repository.interface';
import { IUserService, UserCreateInterface } from './users.service.interface';
import 'reflect-metadata';
import { compare, hash } from 'bcryptjs';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(CTYPES.IUserRepository) private userRepository: IUserRepository,
		@inject(CTYPES.IConfigService) private configService: IConfigService,
	) {}

	async createUser({
		email,
		password,
		firstName,
		lastName,
	}: UserCreateInterface): Promise<User | null> {
		return this.userRepository.create({
			email,
			password: await this.hashPassword(password),
			firstName,
			lastName,
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findByEmail(email);
	}

	private async hashPassword(password: string): Promise<string> {
		const salt = this.configService.get<number>('PASSWORD_SALT');
		return hash(password, Number(salt));
	}

	async comparePasswords(password: string, hash: string): Promise<boolean> {
		return compare(password, hash);
	}
}
