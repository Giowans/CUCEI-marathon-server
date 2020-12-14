import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './alumno.entity';
import { AlumnoRepository } from './alumno.repository';
import { AddAlumnoDto } from './dto/addAlumno.dto';

@Injectable()
export class AlumnosService {
    constructor (
        @InjectRepository(AlumnoRepository)
        private AlumnoRepository: AlumnoRepository,
    ) {}

    async logIn(code: string){
        const payload = await this.AlumnoRepository.getAlumnoInformation(code);
        if(!payload)
        {
            throw new UnauthorizedException('Código no registrado o inexistente.')
        }
        const reducedPayload = {
            code: payload.code,
            name: payload.name,
            career: payload
        }
        return {...reducedPayload}
    }

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

    /*async verifyToken(request) {
        const { authorization } = request.headers;
        if (!authorization) {
            throw new UnauthorizedException('Token inválido');
        }
        const token = authorization.replace('Bearer ', '');
        try {
            const payload = this.JwtService.verify(token);
            const { code } = payload;
            const userFounded = await this.AlumnoRepository.findOne({code: code});
            if(userFounded)
            {
                return {
                    code: userFounded.code,
                    name: userFounded.name,
                    career: userFounded.career,
                }
            }
            else
            {
                throw new UnauthorizedException('No autorizado');
            }
        } catch (err) {
            throw new UnauthorizedException('Token inválido');
        }
    }*/
}
