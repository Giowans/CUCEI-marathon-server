import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT || 8080;
  console.log('Corriendo en el puerto: '+PORT+ ' en modo: '+process.env.NODE_ENV + ' UWU');
  await app.listen(PORT);
}
bootstrap();
