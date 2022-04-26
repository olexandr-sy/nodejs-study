import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

export interface IAuthService {
	login: (data: LoginDTO) => Promise<object | null>;
	register: (data: RegisterDTO) => Promise<object | null>;
}

export interface IJwtResponse {
	access_token: string;
}
