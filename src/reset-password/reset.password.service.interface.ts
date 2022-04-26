import { ResetPasswordDto } from './dto/reset.password.dto';

export interface IResetPasswordService {
  sendResetEmail: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<boolean | null>;
  createNewCode: (email: string) => Promise<string | null>;
}
