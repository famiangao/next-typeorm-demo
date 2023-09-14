import {NextApiHandler} from "next";
import { User } from "src/entity/User";
import {IFormMsg} from "../../sign_up";
import {connectionDatabase} from "../../../lib/handleDatabaseConnection";
import {AppDataSource} from "../../../src/data-source";
type IErrors = {
    username: string[],
    password: string[],
    passwordConfirmation: string[]
}

const Users: NextApiHandler = async (req, res) => {
    console.log("0000000")
    // console.log(req.body)//body内塞的就是请求的内容，请求完内容返回
    //你要先验证请求是否合规
    let {username, password, passwordConfirmation} = req.body as IFormMsg;
    await connectionDatabase();
    let user=new User(username,password);
    user.password=password;
    user.passwordConfirmation=passwordConfirmation;

    res.setHeader("Content-Type", "application/json");
    await user.validate();
    if (!user.existErrors()){
        //进行数据写入，可算写完了，，要回家睡觉，，感觉自己跟散架了一样，，嘎了，，
        await AppDataSource.manager.save(user);
        res.statusCode=200;
        console.log("成功保存"+user.username)
    }else{
        res.statusCode=422;
        console.log("失败保存"+user.username)
    }

    res.write(JSON.stringify(user.errors))
    res.end();
}

export type {IErrors};
export default Users;