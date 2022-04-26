import { Column, CreatedAt, Index, IsEmail, Model, Table } from 'sequelize-typescript';

interface ICreateResetPassword {
  email: string;
  code: string;
  createdAt?: string;
}

@Table({
  timestamps: false,
})
export default class ResetPassword extends Model<ResetPassword | ICreateResetPassword> {
  @IsEmail
  @Column
  @Index
  email: string;

  @Column
  code: string;

  @CreatedAt
  @Column
  createdAt: Date;
}
