import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Настройка для статических файлов
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  // Настройка CORS
  app.enableCors({
    origin: 'http://localhost:3001', // URL вашего React-приложения
    credentials: true, // Разрешение отправки куки
  });

  // Настройка сессий
  app.use(
    session({
      secret: process.env.PRIVATE_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false, // Установите true, если используется HTTPS
        httpOnly: true,
        maxAge: 600000, // Время жизни куки
      },
    }),
  );

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
