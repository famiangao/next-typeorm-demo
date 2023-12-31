import {AppDataSource, dataSourceConfig} from "../data-source"
import { Post } from "../entity/Post"
import {User} from "../entity/User";
import {Comment} from "../entity/Comment";

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