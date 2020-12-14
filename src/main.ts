import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {   
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 8080);
    logger.log(`Corriendo en el puerto: ${await app.getUrl()} en modo: '+process.env.NODE_ENV + ' UWU`);
    
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
