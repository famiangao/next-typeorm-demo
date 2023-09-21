import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { Post } from "./Post";
import {Comment} from "./Comment";
import {IErrors} from "../../pages/api/v1/users";
import {connectionDatabase} from "../lib/handleDatabaseConnection";
import md5 from 'md5';
import _ from 'lodash';
import {AppDataSource} from "../data-source";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column("varchar")
    username:string;

    @Column("varchar")
    password_digest:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @OneToMany(()=>Post,post=>post.author)
    posts:Post[]

    @OneToMany(()=>Comment,comment=>comment.author)
    comments:Comment[]

    constructor(username:string,password:string,) {
        this.username=username;
        this.password_digest=password;
    }
    password:string
    passwordConfirmation:string
    errors:IErrors={password: [], passwordConfirmation: [], username: []};
    async validate(){
        await connectionDatabase();
        let sameNameUser=await AppDataSource.manager.find(User,{
            where:{
                username:this.username
            }
        });
        if(sameNameUser.length!=0){
            this.errors.username.push("用户名重复")
        }
        if(this.username.trim()===""){
            this.errors.username.push("用户名不能为空")
        }
        if(!this.password){
            this.errors.password.push("密码不能为空")
        }
        if(!/[a-z]|[0-9]|[A-Z]/.test(this.password)){
            this.errors.password.push("格式不合法")
        }
        if(this.password!=this.passwordConfirmation){
            this.errors.passwordConfirmation.push("密码不匹配")
        }
    }
    existErrors(){
        let result=false;
        Object.values(this.errors).forEach(el=>{
            if (el.length!=0)result=true;
        })
        return result;
    }

    @BeforeInsert()
    generatePasswordDigest(){
        this.password_digest=md5(this.password)
    }

    toJSON(){
        return _.omit(this,["password","passwordConfirmation","errors","password_digest"])
    }


}
