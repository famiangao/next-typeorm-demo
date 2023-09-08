import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm"
import {Post} from "./entity/Post";
import {User} from "./entity/User";
import {Comment} from "./entity/Comment";


export const dataSourceConfig: DataSourceOptions={
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "",
    database: "blog_development",
    synchronize: false,//如果是true，会把代码里面的东西同步到数据库，会有危险
    logging: false,
    entities: [Post,User,Comment],//'dist/entity/**/*.js' 写路径会认为是commonJs，，太tm恶心了，，
    // 最后验证，只能这么写，别的所有写法都会出错的，太tm混乱了，，，回家了回家了
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
