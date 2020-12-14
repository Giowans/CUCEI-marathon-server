import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
  console.log('Corriendo en el puerto: '+process.env.PORT+ ' en modo: '+process.env.NODE_ENV + ' UWU');
}
bootstrap();
