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
    useNewUrlParser: true,
    url: "mongodb://giowans999:ppip999@ppipcluster-shard-00-00.yjwj0.mongodb.net:27017,ppipcluster-shard-00-01.yjwj0.mongodb.net:27017,ppipcluster-shard-00-02.yjwj0.mongodb.net:27017/ppip?ssl=true&replicaSet=ppipcluster-shard-00-01&authSource=ppip999&retryWrites=true",
    ssl: true,
    useUnifiedTopology: true,
    authSource: 'ppip999',
    replicaSet: "ppipcluster-shard-00-01",
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}; 