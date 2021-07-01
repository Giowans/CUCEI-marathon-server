import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    host: 'localhost',
    type: 'mongodb',
    port: 27017,
    database: 'marathon',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
