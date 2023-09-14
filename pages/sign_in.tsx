import {GetServerSideProps, NextPage} from "next";
import {useEffect, useState} from "react";
import axios from '../lib/axios';
import {User} from "../src/entity/User";
import {NextApiRequestSession} from "../types/base";
import {withSession} from "../lib/withSession";
import {useForm} from "../hooks/useForm";

type IProps = {
    user: User
}
export type IFormMsg = {
    username: string,
    password: string,
}
const signUp: NextPage<IProps> = (props) => {

    let {Form}=useForm<IFormMsg>({
        formContent:[
            {labelName:"用户名",useKey:"username",inputType:"text"},
            {labelName:"密码",useKey:"password",inputType:"password"},
        ],
        data:{
            username:"",
            password:""
        },
        submitOptions:{
            successWord:"登录成功",
            axiosFn:(formData)=>{
                return axios.post("/api/v1/sessions", formData)
            },
            successCallback:()=>{
                //这里判断是否可以跳转
                let searchParams=new URLSearchParams(window.location.search)
                let backPath=searchParams.get("back")
                if (backPath){
                    window.location.href=backPath;
                }
            }
        }
    })
    useEffect(()=>{
        console.log(window.location);
    },[])
    return (
        <div>
            <div>用户名</div>
            <div>{props.user?.username}</div>
            <h1>登录</h1>
            <div>{Form}</div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withSession(async (context) => {
    //@ts-ignore
    const user = context.req.session.get('currentUser');
    console.log(user)
    // console.log(context)
    return {
        props: {
            user: user||{}
        }
    }
})

export default signUp;