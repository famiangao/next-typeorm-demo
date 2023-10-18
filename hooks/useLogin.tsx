import style from "../styles/hooks/useLogin.module.scss"
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "../lib/axios";
import {AxiosResponse} from "axios";
import {User} from "../src/entity/User";
import {useRouter} from "next/router";

interface UserInfo{
    showName:string,
    isLogin:boolean
}
export function useLogin(){
    // let userInfo:UserInfo=useSelector((state:RootState)=>{
    //     return {
    //         showName:state.user.isLogin?state.user.user.username:"请登录",
    //         isLogin:state.user.isLogin
    //     }
    // })
    let router=useRouter();
    let [userInfo,setUserInfo]=useState({
        showName:"",
        isLogin:false
    })
    useEffect(()=>{
        axios.get("/api/v1/sessions").then((res:AxiosResponse<User|{}>)=>{
            console.log(res);
            if("username" in res.data){
                setUserInfo({
                    showName: res.data.username,
                    isLogin: true
                })
            }
        })

    },[])
    async function routerTo(url:string){
       await router.push(url);
    }
    return (
        <div className={style.main}>
            <div className={style.left}>
                <div className={style.link} onClick={routerTo.bind({},"/posts/show")}>文章列表</div>
                <div className={style.link} onClick={routerTo.bind({},"/posts/new")}>新建文章</div>
            </div>
            <div className={style.right}>
                <div className={style.user_name}>{userInfo.showName}</div>
                <div className={style.login}>
                    {
                        userInfo.isLogin?
                            (
                                <span>欢迎使用</span>
                            ):
                            (
                                <span>
                                    <Link  href="/sign_in">登录</Link>/
                                    <Link href="/sign_up">注册</Link>
                                </span>
                            )
                    }
                </div>
            </div>
        </div>
    )
}