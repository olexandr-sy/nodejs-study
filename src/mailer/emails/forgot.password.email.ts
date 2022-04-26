import { IEmail } from './email.interface';

export class ForgotPasswordEmail implements IEmail {
	subject = 'Forgot password';
	text = 'Forgot password temprorrary code: {code}';
}
