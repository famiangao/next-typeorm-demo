import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import {Post} from "./entity/Post";


export const dataSourceConfig: DataSourceOptions={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "",
    database: "blog_development",
    synchronize: false,//如果是true，会把代码里面的东西同步到数据库，会有危险
    logging: false,
    entities: [Post],//'dist/entity/**/*.js' 写路径会认为是commonJs，，太tm恶心了，，
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
}
export const dataSourceConfig2: DataSourceOptions={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "",
    database: "blog_development",
    synchronize: false,//如果是true，会把代码里面的东西同步到数据库，会有危险
    logging: false,
    entities: ['src/entity/**/*{.ts,.js}'],
    migrations: ['src/migration/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
}
export const AppDataSource = new DataSource(dataSourceConfig)
