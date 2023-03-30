import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('NestBootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1/'); 
  
  const config = new DocumentBuilder()
    .setTitle('Test Factory - Enlazaa')
    .setDescription('The test factory API description')
    .setVersion('1.0')
    .addTag('test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  //enable.cors
  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter)); // order matters

  

  await app.listen(3001);
  logger.log(`Listen on port ${3001}`)
}
bootstrap();
