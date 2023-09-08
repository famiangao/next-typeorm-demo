import {AppDataSource, dataSourceConfig} from "src/data-source"
import { Post } from "src/entity/Post"

export const connectionDatabase=async ()=>{
    AppDataSource.isInitialized||await AppDataSource.initialize();
}
export const closeDatabase=async ()=>{
    AppDataSource.isInitialized&&await AppDataSource.destroy();
}