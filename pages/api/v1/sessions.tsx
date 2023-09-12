import {NextApiHandler, NextApiRequest} from "next";
import {IFormMsg} from "../../sign_in";
import {SignIn} from "../../../src/model/SignIn";
import {getPosts} from "../../../lib/posts";

const Sessions:NextApiHandler=async (req, res)=>{
    console.log(req.body);
    let content=req.body as IFormMsg;
    let signIn=new SignIn(content.name,content.password)
    res.setHeader("Content-Type","application/json;charset=utf-8");
    await signIn.validate();
    if(signIn.hasError()){
        res.statusCode=422;
        res.write(JSON.stringify(signIn.errors))
    }else {
        res.statusCode=200;
        res.write(JSON.stringify(signIn.user));
    }
    console.log(res.statusCode);
    res.end();
}

export default Sessions;