import { EntityRepository, Repository } from "typeorm";
import { Alumno } from "./alumno.entity";
import { AddAlumnoDto } from "./dto/addAlumno.dto";
import { ConflictException } from "@nestjs/common";
import { v1 as uuid } from 'uuid';

@EntityRepository(Alumno)
export class AlumnoRepository extends Repository<Alumno> {
    async addAlumno(addAlumnoDto: AddAlumnoDto): Promise<Alumno> {
        try {

            const { name, code, career, meters, minutes, evidence } = addAlumnoDto;
            const alumno = new Alumno();

            alumno.idTry = uuid();
            alumno.code = code;
            alumno.name = name;
            alumno.career = career;
            alumno.minutes = minutes;
            alumno.meters = meters;
            alumno.evidence = evidence;
            alumno.status = 1;
            return await alumno.save();

        } catch (err) {
            throw new ConflictException('Nombre y/o Código de alumno ya registrado o campos vacíos');
        }
    }

    async getAlumnoInformation(code: string): Promise<Alumno[]> {
        const alumnos = await this.find({ code: code });
        if (alumnos) {
            return alumnos;
        }
        else {
            throw ConflictException;
        }
    }
}