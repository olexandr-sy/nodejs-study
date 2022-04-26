import {
  Column,
  CreatedAt,
  DataType,
  Index,
  IsEmail,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

interface IUserCreate {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

@Table({
  timestamps: true, // add the timestamp attributes (updatedAt, createdAt)
  indexes: [
    {
      unique: true,
      name: 'unique_email_index',
      fields: ['email'],
    },
  ],
})
export default class User extends Model<User | IUserCreate> {
  @Index
  @IsEmail
  @Column
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
