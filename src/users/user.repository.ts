import { AdvancedConsoleLogger, EntityRepository, Repository } from "typeorm";
import { UserSignUpDTO } from "./dto/user-signup.dto";
import { User } from "./user.entity";
import { v1 as uuidv1} from 'uuid';
import { UserSignInDTO } from "./dto/user-sigin.dto";
import * as bcrypt from 'bcrypt';
import { ConflictException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async SignUp(UserSignUpDTO: UserSignUpDTO): Promise<Object>
    {
        try {
            
            const { name, password, email} = UserSignUpDTO;
            const user = new User();
    
            var contraseña = password;
            user.id_user = uuidv1();
            user.name = name;
            user.email = email;
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(contraseña, user.salt);
    
            await user.save();
            return {data: {
                contraenaGenerada: contraseña,
            }};

        } catch (err) {
            throw new ConflictException('Nombre y/o email en uso o campos vacíos');
        }
    }

    async SignIn(UsersSignInDTO: UserSignInDTO): Promise<Object>
    {
        const { email, password } = UsersSignInDTO;
        const findedUser = await this.findOne({email: email});
        if(findedUser && await findedUser.validatePassword(password))
        {
            return {
                id_user: findedUser.id_user,
                name: findedUser.name,
                email: findedUser.email
            };
        }
        else
        {
            return null;
        } 
    }

    async ChangeUserPassword(id_user: string, newPassword: string)
    {
        const findedUser = await this.findOne({id_user: id_user});
        if(!findedUser)
        {
            return null;
        }
        findedUser.password = await this.hashPassword(newPassword, findedUser.salt);
        return await this.save(findedUser);
    }
    
    private async hashPassword(password: string, salt: string)
    {
        return bcrypt.hash(password, salt);
    }
}