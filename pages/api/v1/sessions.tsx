import {NextApiHandler, NextApiRequest} from "next";
import {IFormMsg} from "../../sign_in";
import {SignIn} from "../../../src/model/SignIn";
import {withSession} from "../../../lib/withSession";
import {NextApiRequestSession} from "../../../types/base";

const Sessions:NextApiHandler=async (req:NextApiRequestSession, res)=>{
    console.log(req.body);
    let content=req.body as IFormMsg;
    let signIn=new SignIn(content.username,content.password)
    res.setHeader("Content-Type","application/json;charset=utf-8");
    await signIn.validate();
    if(signIn.hasError()){
        res.statusCode=422;
        res.write(JSON.stringify(signIn.errors))
    }else {
        //在这儿要存一个session
        req.session.set("currentUser",signIn.user);
        await  req.session.save();
        res.statusCode=200;
        res.write(JSON.stringify(signIn.user));
    }
    console.log(res.statusCode);
    res.end();
}

export default withSession(Sessions);