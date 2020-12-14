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
    url: "mongodb+srv://giowans999:ppip999@ppipcluster-shard-00-02.yjwj0.mongodb.net:27017/ppip?retryWrites=true&w=majority",
    ssl: true,
    useUnifiedTopology: true,
    replicaSet: "ppipcluster-shard-00-01",
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}; 