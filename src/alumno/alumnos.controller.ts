import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AlumnosService } from './alumnos.service';
import { AddAlumnoDto } from './dto/addAlumno.dto';

@Controller('alumnos')
export class AlumnosController {
    constructor(
        private AlumnosService: AlumnosService
    ) { }

    @Get('/')
    @UseGuards(AuthGuard())
    async getAlumnos() {
        return await this.AlumnosService.getAllAlumnos();
    }

    @Get('/:code')
    async getParticularAlumno(@Param('code') code: string) {
        return await this.AlumnosService.getAlumno(code);
    }

    @Post('/addTry')
    async addAlumno(@Body() addAlumnoDto: AddAlumnoDto) {
        return await this.AlumnosService.addAlumno(addAlumnoDto);
    }

    @Delete('/:code')
    async deleteAlumnoInfo(@Param('code') code: string) {
        return await this.AlumnosService.deleteAlumno(code);
    }

}
