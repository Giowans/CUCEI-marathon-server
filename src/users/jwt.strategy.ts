import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ObjectID } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private UserRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecretEnginer'
        });
    }
    async validate(payload){
        const { id_user } = payload;
        const user = await this.UserRepository.findOne({id_user: id_user});
        if(!user)
        {
            throw new UnauthorizedException('Token no válido: Guardian activado');
        }
        return user;
    }
}