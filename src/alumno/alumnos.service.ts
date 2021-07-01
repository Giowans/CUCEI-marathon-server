import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './alumno.entity';
import { AlumnoRepository } from './alumno.repository';
import { AddAlumnoDto } from './dto/addAlumno.dto';
import axios from 'axios';

@Injectable()
export class AlumnosService {
    constructor (
        @InjectRepository(AlumnoRepository)
        private AlumnoRepository: AlumnoRepository,
    ) {}

    async getAlumno(code: string)
    {
        return await this.AlumnoRepository.getAlumnoInformation(code);
    }

    async getAllAlumnos(): Promise<Alumno[]>
    {
        return await this.AlumnoRepository.find();
    }

    async addAlumno(addAlumnoDto: AddAlumnoDto): Promise<Alumno>
    {
        return await this.AlumnoRepository.addAlumno(addAlumnoDto);
    }

    async deleteAlumno(code: string)
    {
        //delete student data from hosted 00webHost database
        await axios.get(`https://tempbackend.000webhostapp.com/deleteStudentByCode.php?codigo=${code}`);
        return await this.AlumnoRepository.remove(await this.AlumnoRepository.getAlumnoInformation(code));
    }
}
