import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('Corriendo en el puerto: '+process.env.PORT+ ' en modo: '+process.env.NODE_ENV + ' UWU');
  await app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 8080);
}
bootstrap();
