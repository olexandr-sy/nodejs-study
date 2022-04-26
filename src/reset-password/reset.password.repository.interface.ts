import ResetPassword from '../../models/reset.password.model';

export interface IResetPasswordRepository {
	findByCode: (code: string) => Promise<ResetPassword | null>;
	create: (email: string, code: string) => Promise<ResetPassword | null>;
}
