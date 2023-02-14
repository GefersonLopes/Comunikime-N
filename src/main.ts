import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    allowedHeaders: [
      'Accept',
      'Accept-Version',
      'Content-Type',
      'Api-Version',
      'Origin',
      'X-Requested-With',
      'Authorization',
    ],
    credentials: true,
    exposedHeaders: ['API-Token-Expiry'],
  });

  const config = new DocumentBuilder()
    .setTitle('Documentation of Test of Geferson')
    .setDescription('GEFERSON ALMEIDA LOPES - Gefersonjefreey@gmail.com')
    .setVersion('1,0gl')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3003);
}
bootstrap();
