import {NextApiHandler} from "next";
import {connectionDatabase} from "../../../../src/lib/handleDatabaseConnection";
import {AppDataSource} from "../../../../src/data-source";
import {Post} from "../../../../src/entity/Post";

const id:NextApiHandler=async (req, res)=>{
   if(req.method==="DELETE"){
        let id=req.query.id;
        //然后运行删除内容
       //运行typeorm的删除
       await connectionDatabase();
       let deleteResult=await AppDataSource.manager.delete(Post,{
           id:id,
       })
       res.setHeader("Content-Type","application/json");
       if(deleteResult.affected>0){
            res.statusCode=200
       }else{
            res.statusCode=401
       }
        res.end();
   }else if(req.method==="PATCH"){
       let post:Post =req.body as any
       await connectionDatabase();
       res.setHeader("Content-Type","application/json");
       let result=await  AppDataSource.manager.update(Post,{id:post.id},post)
       if(result.affected>0){
           res.statusCode=200
       }else{
           res.statusCode=401
       }
       res.end();
   }
}

export default id;