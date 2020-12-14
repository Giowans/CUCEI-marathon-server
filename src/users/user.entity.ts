import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @PrimaryColumn()
    id_user: string;
    
    @Column({unique: true, nullable: false})
    name: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}