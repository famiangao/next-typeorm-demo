import { connectionDatabase } from "lib/handleDatabaseConnection";
import {GetServerSideProps, NextPage} from "next";
import {AppDataSource} from "../../src/data-source";
import {Post} from "../../src/entity/Post";

type IProps={
    post:Post
}
const postShow:NextPage<IProps>=(props)=>{
    return (
        <div>
            这里放文章内容
            <div>{props.post.content}</div>
        </div>
    )
}
////现在这个东西从ssg变成ssr了，炫酷~！
export const getServerSideProps:GetServerSideProps=async (context)=>{
    //从数据库中获取此id的相关信息
    await connectionDatabase();
    let post=await AppDataSource.manager.findOne(Post,{
        where:{
            id:Number(context.params.id)
        }
    })
    return {
        props:{
            post:JSON.parse(JSON.stringify(post))
        }
    }
}

export default postShow;