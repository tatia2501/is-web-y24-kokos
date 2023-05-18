import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import hbs = require('hbs');
import { LoadtimeInterceptor } from './loadtime.interceptor';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './supertokens-exception.filter';
import { HttpExceptionFilter } from './exceptions.filter';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['https://web-tatia.onrender.com'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('BookShop')
    .setDescription('The bookshop API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('book')
    .addTag('basket')
    .addTag('order')
    .addTag('wishlist')
    .addTag('special-offer')
    .addTag('mail')
    .addTag('faq')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views', 'pages'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );

  app.useGlobalInterceptors(new LoadtimeInterceptor());

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  const port = process.env.PORT || 3000;
  Logger.log(`Application is running on: http://localhost:${port}`);
  Logger.log(`Swagger is running on: http://localhost:${port}/api`);
  await app.listen(port);
}
bootstrap();
