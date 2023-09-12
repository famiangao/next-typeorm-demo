import {AppDataSource, dataSourceConfig} from "src/data-source"
import { Post } from "src/entity/Post"
import {User} from "../src/entity/User";
import {Comment} from "../src/entity/Comment";

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