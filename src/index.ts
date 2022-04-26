import { Container } from 'inversify';
import App from './app';
import ContainerBindings from './container/container.module';
import { CTYPES } from './container/container.types';

interface IBootstrap {
  app: App;
  appContainer: Container;
}

function bootstrap(): IBootstrap {
  const appContainer = new Container();
  appContainer.load(ContainerBindings);
  const app = appContainer.get<App>(CTYPES.App);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
