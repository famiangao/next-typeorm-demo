import {User} from "../entity/User";
import {AppDataSource} from "../data-source";
import md5 from "md5";
import {connectionDatabase} from "../../lib/handleDatabaseConnection";
export type IErrors={
    username:string[],
    password:string[]
}
export class SignIn{
    // userName:string;
    // password:string;
    user:User;
    errors:IErrors={password: [], username: []}
    constructor(public userName:string,public password:string) {
    }
    //判断是否正确
    async validate(){
        if(this.userName==""){
            this.errors.username.push("用户名不能为空")
        }
        if (this.password==""){
            this.errors.password.push("密码不能为空")
        }
        //连接数据库
        await connectionDatabase();
        let user=await AppDataSource.manager.findOne(User,{
            where:{
                username:this.userName,
                // password:this.password
            }
        })
        if(user){
            this.user=user;
            if(md5(this.password)!==user.password_digest){
                this.errors.password.push("用户名和密码不匹配")
            }
        }else {
            this.errors.username.push("用户名不存在")
        }

    }
    hasError():boolean{
        return Object.values(this.errors).some(el=>{
            return el.length!==0
        })
    }

}