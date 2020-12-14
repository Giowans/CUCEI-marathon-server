import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Alumno extends BaseEntity {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    code: string;

    @Column({unique: true, nullable: false})
    name: string;

    @Column({nullable: false})
    career: string;

    @Column({default: 0})
    service_seconds: number;
}