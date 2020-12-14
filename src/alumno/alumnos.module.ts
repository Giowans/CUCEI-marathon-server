import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AlumnoRepository } from './alumno.repository';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([AlumnoRepository]),
  ],
  controllers: [AlumnosController],
  providers: [
    AlumnosService
  ]
})
export class AlumnosModule {}
