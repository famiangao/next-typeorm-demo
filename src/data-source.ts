import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"


export const dataSourceConfig: DataSourceOptions={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "",
    database: "blog_development",
    synchronize: false,//如果是true，会把代码里面的东西同步到数据库，会有危险
    logging: false,
    entities: ['dist/entity/**/*.js'],
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
    entities: ['src/entity/**/*.js'],
    migrations: ['src/migration/**/*.js'],
    subscribers: ['src/subscriber/**/*.js'],
}
export const AppDataSource = new DataSource(dataSourceConfig)
