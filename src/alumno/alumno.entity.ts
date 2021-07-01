import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Alumno extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    idTry: string

    @Column()
    code: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    career: string;

    @Column({ default: 0 })
    minutes: number;

    @Column({ default: 0 })
    meters: number;

    @Column({ nullable: false })
    evidence: string;

    @Column({ nullable: false, default: 1 })
    status: number;

}