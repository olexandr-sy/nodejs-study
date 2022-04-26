import User from '../../models/user.model';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

export interface IAuthService {
  login: (data: LoginDTO) => Promise<IJwtResponse | null>;
  register: (data: RegisterDTO) => Promise<User | null>;
}

export interface IJwtResponse {
  access_token: string;
}
