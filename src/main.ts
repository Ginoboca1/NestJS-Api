import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el origen correcto de tu aplicación front-end
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () => {
    console.log(`Server listen in port ${process.env.PORT}`);
  });
}
bootstrap();
