import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import * as process from "process";
// const DEVELOPMENT_ID="192.168.1.179"
// const PRODUCTION_ID="localhost"
const DEVELOPMENT_ID="localhost"
const PRODUCTION_ID="172.17.0.1"
export const dataSourceConfig: DataSourceOptions={
    type: "postgres",
    host: process.env.NODE_ENV==='production'?PRODUCTION_ID:DEVELOPMENT_ID,
    port: 5432,
    username: "blog",
    password: "",
    database: "blog_development",
    synchronize: false,//如果是true，会把代码里面的东西同步到数据库，会有危险
    logging: false,
    entities: ['dist/entity/**/*.js'],//'dist/entity/**/*.js' 写路径会认为是commonJs，，太tm恶心了，，
    // 最后验证，只能这么写，别的所有写法都会出错的，太tm混乱了，，，回家了回家了
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
}

///也可以用2，只不过2 不经过babel转换，而typeorm转换ts用的是ts-node 和next转换ts的方法不同，可能会出现问题
export const dataSourceConfig2: DataSourceOptions={
    type: "postgres",
    host: "192.168.1.179",
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
