import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Wrong email format' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty()
  password: string;
}
