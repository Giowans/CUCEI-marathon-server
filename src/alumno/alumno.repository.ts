import { EntityRepository, Repository } from "typeorm";
import { Alumno } from "./alumno.entity";
import { AddAlumnoDto } from "./dto/addAlumno.dto";
import { ConflictException } from "@nestjs/common";

@EntityRepository(Alumno)
export class AlumnoRepository extends Repository<Alumno> {
    async addAlumno(addAlumnoDto: AddAlumnoDto): Promise<Alumno>
    {
        try {

            const { name, code, career} = addAlumnoDto;
            const alumno = new Alumno();
    
            alumno.code = code;
            alumno.name = name;
            alumno.career = career;
    
            return await alumno.save();
            
        } catch (err) {
            throw new ConflictException('Nombre y/o Código de alumno ya registrado o campos vacíos');
        }
    }

    async getAlumnoInformation(code: string): Promise<Alumno>
    {
        const findedalumno = await this.findOne({code: code});
        if(findedalumno)
        {
            return findedalumno;
        }
        else
        {
            throw ConflictException;
        } 
    }
}