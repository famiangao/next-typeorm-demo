import {AppDataSource, dataSourceConfig} from "../data-source"
import { Post } from "../entity/Post"
import {User} from "../entity/User";
import {Comment} from "../entity/Comment";

//这么写是为了区别js和ts之间运行的一些问题，其实最后感觉还是babel用babel，ts-node用ts-node
export const connectionDatabase=async ()=>{
    AppDataSource.setOptions({
        ...dataSourceConfig,
        entities:[Post,User,Comment]
    })
    AppDataSource.isInitialized||await AppDataSource.initialize();
}
export const closeDatabase=async ()=>{
    AppDataSource.isInitialized&&await AppDataSource.destroy();
}