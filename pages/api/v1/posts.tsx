import {NextApiHandler} from 'next';
import {getAllFile} from "../../../lib/posts";


//等于这个方法是用于给next接收post请求用的
const Posts: NextApiHandler = async (req, res) => {
  const posts = await getAllFile();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(posts));
  res.end();
};
export default Posts;
