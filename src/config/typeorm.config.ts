import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    host: 'localhost',
    type: 'mongodb',
    port: 27017,
    database: 'marathon',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
};

/*export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: "mongodb+srv://giowans999:ppip999@ppipcluster-shard-00-01.yjwj0.mongodb.net:27017/ppip?retryWrites=true&w=majority",
    ssl: true,
    authSource: 'ppip999',
    replicaSet: "ppipcluster-shard-00-01",
    entities: [__dirname + '/../**//*.entity.{js,ts}'],
    synchronize: true,
};*/