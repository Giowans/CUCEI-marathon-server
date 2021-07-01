import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignInDTO } from './dto/user-sigin.dto';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { getConnection, Like } from 'typeorm';
import { Alumno } from 'src/alumno/alumno.entity';
import { AddAlumnoDto } from 'src/alumno/dto/addAlumno.dto';
import axios from 'axios';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository,
        private JwtService: JwtService
    ) {}

    async SignUp(UserSignUpDTO: UserSignUpDTO): Promise<Object>
    {
        return await this.UserRepository.SignUp(UserSignUpDTO); 
    }
    
    async LogIn(UserSignInDTO: UserSignInDTO) {
        const payload =  await this.UserRepository.SignIn(UserSignInDTO);
        if(!payload)
        {
            throw new UnauthorizedException('Credenciales Inválidas');
        }

        const accessToken = await this.JwtService.sign(payload);
        return {...payload, token: accessToken};
    }

    async verifyToken(request) {
        const { authorization } = request.headers;
        if (!authorization) {
            throw new UnauthorizedException('Token inválido');
        }
        const token = authorization.replace('Bearer ', '');
        try {
            const payload = this.JwtService.verify(token);
            const { id_user } = payload;
            const userFounded = await this.UserRepository.findOne({id_user: id_user});
            if(userFounded)
            {
                return {
                    id_user: userFounded.id_user,
                    name: userFounded.name,
                    email: userFounded.email,
                    token: token
                }
            }
            else
            {
                throw new UnauthorizedException('No autorizado');
            }
        } catch (err) {
            throw new UnauthorizedException('No autorizado');
        }
    }

    async changePassword(id_user: string, newPassword: string){
        const response = await this.UserRepository.ChangeUserPassword(id_user, newPassword);
        if(!response)
        {
            throw new NotFoundException;
        }
        return response;
    }

    async updateAlumntoRegisterStatus(idTry: string, status: number)
    {
        const alumnoRepo = getConnection().getRepository(Alumno);
        const foundedAlumno = await alumnoRepo.findOne({idTry: idTry});
        if(!foundedAlumno)
        {
            throw new ConflictException('El alumno no existe en la Base de datos');
        }
        foundedAlumno.status = status;
        if(status === 2)
        {
            //Obtain data from hosted 00webHost database
            const response = await axios.get(`https://tempbackend.000webhostapp.com/getStudentByCode.php?codigo=${foundedAlumno.code}`);
            const newTime = Number(foundedAlumno.minutes) + Number(response.data[0].Tiempo);
            const newDistance = Number(foundedAlumno.meters) + Number(response.data[0].Distancia);
            console.log(foundedAlumno.minutes, foundedAlumno.meters,Number(response.data[0].Tiempo), Number(response.data[0].Distancia), newTime, newDistance);
            //Update time and distance on DB hosted on 00webHost
            await axios.get(`https://tempbackend.000webhostapp.com/updateDistanceAndTime.php?codigo=${foundedAlumno.code}&tiempo=${newTime}&distancia=${newDistance}`).then(res => console.log(res.data));
        }
        return await alumnoRepo.save(foundedAlumno);
    }

    async getUser(id_user: string){
        const findedUser = await this.UserRepository.findOne({id_user: id_user});
        if(findedUser)
        {
            return {
                id_user: findedUser.id_user,
                name: findedUser.name,
                email: findedUser.email
            }
        }
        else
        {
            throw new NotFoundException;
        }
    }

    async getAlumno(code: string)
    {
        return await getConnection().getRepository(Alumno).findOne({code: code});
    }

    async getAllAlumnos(filter: string): Promise<Alumno[]>
    {
        if(filter)
        {
            return await getConnection().getMongoRepository(Alumno).find({
               where: {
                   $or: [
                    {name:  new RegExp(filter, 'i')},
                    {code: new RegExp(filter, 'i')},
                    {career: new RegExp(filter, 'i')},
                   ]
               }
            })
        }
        else
        {
            return await getConnection().getRepository(Alumno).find();
        }
    }
}
