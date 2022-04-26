import { ContainerModule, interfaces } from 'inversify';
import App from '../app';
import { AuthController } from '../auth/auth.controller';
import { IAuthController } from '../auth/auth.controller.interface';
import { AuthService } from '../auth/auth.service';
import { IAuthService } from '../auth/auth.service.interface';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { SequeliseService } from '../database/sequelize.service';
import { ISequelizeService } from '../database/sequelize.service.interface';
import { ExeptionHandler } from '../errors/exeption.handler';
import { IExeptionHandler } from '../errors/exeption.handler.interface';
import { LoggerService } from '../logger/logger.service';
import { ILoggerService } from '../logger/logger.service.interface';
import { ISmptMailerService } from '../mailer/smtp.mailer.interface';
import { SmptMailerService } from '../mailer/smtp.mailer.service';
import { ResetPasswordController } from '../reset-password/reset.password.controller';
import { IResetPasswordController } from '../reset-password/reset.password.controller.interface';
import { ResetPasswordRepository } from '../reset-password/reset.password.repository';
import { IResetPasswordRepository } from '../reset-password/reset.password.repository.interface';
import { ResetPasswordService } from '../reset-password/reset.password.service';
import { IResetPasswordService } from '../reset-password/reset.password.service.interface';
import { BaseRouter } from '../routes/base.router.class';
import { IBaseRouter } from '../routes/base.router.interface';
import { UserRepository } from '../users/users.repository';
import { IUserRepository } from '../users/users.repository.interface';
import { UserService } from '../users/users.service';
import { IUserService } from '../users/users.service.interface';
import { CTYPES } from './container.types';

export default new ContainerModule((bind: interfaces.Bind): void => {
	bind<App>(CTYPES.App).to(App).inSingletonScope();
	bind<ILoggerService>(CTYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<IConfigService>(CTYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<ISequelizeService>(CTYPES.ISequelizeService).to(SequeliseService).inSingletonScope();
	bind<IExeptionHandler>(CTYPES.IExeptionHanler).to(ExeptionHandler);
	bind<IBaseRouter>(CTYPES.IBaseRouter).to(BaseRouter);
	bind<ISmptMailerService>(CTYPES.ISmtpMailerService).to(SmptMailerService).inSingletonScope();

	// Controllers
	bind<IAuthController>(CTYPES.IAuthController).to(AuthController);
	bind<IResetPasswordController>(CTYPES.IResetPasswordController).to(ResetPasswordController);

	// Services
	bind<IAuthService>(CTYPES.IAuthService).to(AuthService);
	bind<IUserService>(CTYPES.IUserService).to(UserService);
	bind<IResetPasswordService>(CTYPES.IResetPasswordService).to(ResetPasswordService);
	bind<IResetPasswordRepository>(CTYPES.IResetPasswordRepository).to(ResetPasswordRepository);

	// Repositories
	bind<IUserRepository>(CTYPES.IUserRepository).to(UserRepository);
});
