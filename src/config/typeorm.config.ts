import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/*export const typeOrmConfig: TypeOrmModuleOptions = {
    host: 'localhost',
    type: 'mongodb',
    port: 27017,
    database: 'ppip',
    synchronize: true,
};*/

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: `mongodb+srv://giowans999:ppip999@ppipcluster.yjwj0.mongodb.net/ppip?retryWrites=true&w=majority`,
    useNewUrlParser: true,
    logging: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}; 