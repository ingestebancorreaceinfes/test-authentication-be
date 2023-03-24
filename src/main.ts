import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('NestBootstrap');
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(WINSTON_MODULE_PROVIDER));
  //enable.cors
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); // order matters
  app.setGlobalPrefix('/api/v1/'); 
  await app.listen(3002);
  logger.log(`Listen on port ${3002}`)
}
bootstrap();
