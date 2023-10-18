import {NextApiHandler} from "next";
import {IFormMsg} from "../../sign_in";
import {SignIn} from "../../../src/model/SignIn";
import {NextApiRequestSession} from "../../../types/base";
import {withSessionAPI} from "../../../lib/withSession";

const Sessions:NextApiHandler=async (req:NextApiRequestSession, res)=>{
    if(req.method==="POST"){
    let content=req.body as IFormMsg;
    let signIn=new SignIn(content.username,content.password)
    res.setHeader("Content-Type","application/json;charset=utf-8");
    await signIn.validate();
    if(signIn.hasError()){
        res.statusCode=422;
        res.write(JSON.stringify(signIn.errors))
    }else {
        //在这儿要存一个session
        // req.session.set("currentUser",signIn.user);
        req.session.currentUser=signIn.user
        await  req.session.save();
        res.statusCode=200;
        res.write(JSON.stringify(signIn.user));
    }
    res.end();

    }else if(req.method==="GET"){

        res.setHeader("Content-Type","application/json;charset=utf-8");
        console.log();
        res.write(JSON.stringify(req.session.currentUser||{}))
        res.end();
    }
}

export default withSessionAPI(Sessions);