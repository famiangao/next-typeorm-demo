import { NextApiHandler, NextApiRequest } from "next"
import { AppDataSource } from "src/data-source";
import { Post } from "src/entity/Post";
import { connectionDatabase } from "src/lib/handleDatabaseConnection";
import { ILike } from "typeorm";


export interface ISearchParams {
    searchWord?:string,
    start:string|number,
    limit:string|number
}
export interface ISearchResult{
    content:Post[],
    total:number
}
const Search: NextApiHandler = async (req: NextApiRequest, res) => {
    res.setHeader('Content-Type', 'application/json');
    let { searchWord='', start, limit }:ISearchParams = req.body
    start = Number(start) || 1
    limit = Number(limit) || 1
    await connectionDatabase();
    const posts = await AppDataSource.manager.findAndCount(Post, {
        skip: (start-1) * limit,
        take: limit,
        where: {
            title: ILike(`%${searchWord}%`)
        }
    })
    res.write(JSON.stringify({content:posts[0],total:posts[1]}))
    res.statusCode = 200
    res.end();
}
export default Search