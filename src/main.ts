import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nest.js Codigo Facilito API')
    .setDescription(
      'This API is the final project of the Bootcamp "JavaScript en el Backend" by Codigo Facilito',
    )
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();
  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(3000, () => {
    console.log(`Server listen in port ${process.env.PORT}`);
  });
}
bootstrap();
