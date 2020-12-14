import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlumnosService } from './alumnos.service';
import { AddAlumnoDto } from './dto/addAlumno.dto';

@Controller('alumnos')
export class AlumnosController {
    constructor(
        private AlumnosService: AlumnosService
    ){}

    @Get('/')
    @UseGuards(AuthGuard())
    async getAlumnos()
    {
        return await this.AlumnosService.getAllAlumnos();
    }

    @Get('/:code')
    @UseGuards(AuthGuard())
    async getParticularAlumno(@Param('code') code: string)
    {
        return await this.AlumnosService.getAlumno(code);
    }

    @Post('/add')
    @UseGuards(AuthGuard())
    async addAlumno(@Body() addAlumnoDto: AddAlumnoDto)
    {
        return await this.AlumnosService.addAlumno(addAlumnoDto);
    }

    /*@Get('/verify_token')
    @UseGuards(AuthGuard())
    verifyToken(@Req() request){
        return this.AlumnosService.verifyToken(request);
    }*/

    @Post('/')
    async LogIn(@Body('code') code: string)
    {
        return await this.AlumnosService.logIn(code);
    }

}
