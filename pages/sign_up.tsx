import {NextPage} from "next";
import {useState} from "react";
import axios from '../lib/axios';
import {IErrors} from "./api/v1/users";
import {useForm} from "../hooks/useForm";

type IProps = {}
export type IFormMsg = {
    username: string,
    password: string,
    passwordConfirmation: string
}
const signUp: NextPage<IProps> = (props) => {


    let {Form}=useForm<IFormMsg>({
        formContent:[
            {labelName:"用户名",useKey:"username",inputType:"text"},
            {labelName:"密码",useKey:"password",inputType:"password"},
            {labelName:"确定密码",useKey:"passwordConfirmation",inputType:"password"},
        ],
        data:{
            username:"",
            password:"",
            passwordConfirmation:""
        },
        submitOptions:{
            successWord:"注册成功",
            axiosFn:(formData)=>{
                return  axios.post("/api/v1/users", formData)
            },
            successCallback:()=>{
                window.location.href="/sign_in"
            }
        }
    })

    return (
        <div>
            <h1>注册</h1>
            <div>
                {Form}
            </div>

        </div>
    )
}

export default signUp;