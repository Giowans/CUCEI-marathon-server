import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserSignInDTO } from './dto/user-sigin.dto';
import { UserSignUpDTO } from './dto/user-signup.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private UsersService: UsersService,
    ){}

    @Post('/signup')
    SignUp(@Body() UserSignUpDTO: UserSignUpDTO): Promise<Object>{
        return this.UsersService.SignUp(UserSignUpDTO);    
    }

    @Post('/login')
    LogIn(@Body() UserSignInDTO: UserSignInDTO) {
        return this.UsersService.LogIn(UserSignInDTO);
    }

    @Get('/verify_token')
    @UseGuards(AuthGuard())
    verifyToken(@Req() request){
        return this.UsersService.verifyToken(request);
    }

    @Get('/getAlumnos')
    @UseGuards(AuthGuard())
    async getAlumnos(@Query('filter') filter: string)
    {
        return await this.UsersService.getAllAlumnos(filter);
    }

    @Get('/alumnos/:code')
    @UseGuards(AuthGuard())
    async getParticularAlumno(@Param('code') code: string)
    {
        return await this.UsersService.getAlumno(code);
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getUser(@Param('id') id_user: string){
        return this.UsersService.getUser(id_user);
    }

    @Put('/:id/restore-password')
    @UseGuards(AuthGuard())
    restorePassword(@Param('id') id_user: string, @Body('newPassword') newPassword: string){
        return this.UsersService.changePassword(id_user, newPassword);
    }

    @Put('/update-student-try/:idTry')
    @UseGuards(AuthGuard())
    updateServiceTime(@Param('idTry') idTry: string, @Body('status') status: number)
    {
        return this.UsersService.updateAlumntoRegisterStatus(idTry, status);
    }
}
