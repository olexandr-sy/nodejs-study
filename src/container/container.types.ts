export const CTYPES = {
  // Common types
  App: Symbol.for('App'),
  ILoggerService: Symbol.for('ILoggerService'),
  IConfigService: Symbol.for('IConfigService'),
  ISequelizeService: Symbol.for('ISequelizeService'),
  IExeptionHanler: Symbol.for('IExeptionHandler'),
  IBaseRouter: Symbol.for('IBaseRouter'),
  ISmtpMailerService: Symbol.for('ISmtpMailerService'),

  // Controllers
  IAuthController: Symbol.for('IAuthController'),
  IResetPasswordController: Symbol.for('IResetPasswordController'),

  // Services
  IAuthService: Symbol.for('IAuthService'),
  IUserService: Symbol.for('IUserService'),
  IResetPasswordService: Symbol.for('IResetPasswordService'),

  // Repositories
  IUserRepository: Symbol.for('IUserRepository'),
  IResetPasswordRepository: Symbol.for('IResetPasswordRepository'),
};
