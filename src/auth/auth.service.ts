import { inject, injectable } from 'inversify';
import { IAuthService, IJwtResponse } from './auth.service.interface';
import 'reflect-metadata';
import { CTYPES } from '../container/container.types';
import { IUserService } from '../users/users.service.interface';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { sign } from 'jsonwebtoken';
import User from '../../models/user.model';
import { IConfigService } from '../config/config.service.interface';
import { ISmptMailerService } from '../mailer/smtp.mailer.interface';
import pify from 'pify';
import { IBaseService } from '../common/base.service.interface';

@injectable()
export class AuthService implements IBaseService, IAuthService {
  constructor(
    @inject(CTYPES.IConfigService) private configService: IConfigService,
    @inject(CTYPES.IUserService) private userService: IUserService,
    @inject(CTYPES.ISmtpMailerService) private smtpMailerService: ISmptMailerService,
  ) {}

  async login({ email, password }: LoginDTO): Promise<IJwtResponse | null> {
    const existedUser = await this.userService.findByEmail(email);
    if (
      !existedUser ||
      !(await this.userService.comparePasswords(password, existedUser.password))
    ) {
      return null;
    }

    const jwt = await this.signJWT(existedUser, this.configService.get('JWT_SECRET'));
    return { access_token: jwt };
  }

  async register(data: RegisterDTO): Promise<User | null> {
    const existedUser = await this.userService.findByEmail(data.email);
    if (existedUser) {
      return null;
    }
    return this.userService.createUser(data);
  }

  private async signJWT(user: User, secret: string): Promise<string> {
    return await pify(sign)(
      {
        id: user.id,
        email: user.email,
        iat: Math.floor(Date.now() / 1000),
      },
      secret,
      {
        algorithm: 'HS256',
      },
    );
  }
}
