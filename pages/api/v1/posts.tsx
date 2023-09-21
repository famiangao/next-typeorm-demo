import {NextApiHandler} from 'next';
import {getPosts} from "../../../lib/posts";
import {NextApiRequestSession} from "../../../types/base";
import {User} from "../../../src/entity/User";
import {Post} from "../../../src/entity/Post";
import {connectionDatabase} from "../../../src/lib/handleDatabaseConnection";
import {AppDataSource} from "../../../src/data-source";
import {withSessionAPI} from "../../../lib/withSession";

//等于这个方法是用于给next接收post请求用的
const Posts: NextApiHandler = async (req:NextApiRequestSession, res) => {
  let user:User=req.session.currentUser
  res.setHeader('Content-Type', 'application/json');
  if(!user){
    res.statusCode=401;
    res.end();
  }
  let  {title,content}:{title:string,content:string}=req.body;
  let post=new Post(title,content,user);
  await connectionDatabase();
  await AppDataSource.manager.save(post);
  res.statusCode = 200;
  res.write(JSON.stringify(post));
  res.end();
};
export default   withSessionAPI(Posts);

