import { injectable } from 'inversify';
import ResetPassword from '../../models/reset.password.model';
import { IResetPasswordRepository } from './reset.password.repository.interface';
import 'reflect-metadata';

@injectable()
export class ResetPasswordRepository implements IResetPasswordRepository {
  async findByCode(code: string): Promise<ResetPassword | null> {
    return ResetPassword.findOne<ResetPassword>({
      where: {
        code: code,
      },
    });
  }

  async create(email: string, code: string): Promise<ResetPassword | null> {
    return ResetPassword.create({
      email,
      code,
    });
  }
}
