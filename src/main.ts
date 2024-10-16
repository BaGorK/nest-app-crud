import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'warn'],
  });

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}...`);
  });
}
bootstrap();

// Learn Nest.js
// Read Documentation
// Do Projects
// Repeat
