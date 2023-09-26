import {GetServerSideProps, NextPage} from "next";
import {useEffect} from "react";
import axios from '../lib/axios';
import {User} from "../src/entity/User";
import {useForm} from "../hooks/useForm";
import {withSessionSSR} from "../lib/withSession";
import styles from "../styles/sing_in.module.scss"

type IProps = {
    user: User
}
export type IFormMsg = {
    username: string,
    password: string,
}
const signUp: NextPage<IProps> = (props) => {

    let {Form} = useForm<IFormMsg>({
        formContent: [
            {labelName: "用户名", useKey: "username", inputType: "text"},
            {labelName: "密码", useKey: "password", inputType: "password"},
        ],
        data: {
            username: "",
            password: ""
        },
        submitOptions: {
            successWord: "登录成功",
            axiosFn: (formData) => {
                return axios.post("/api/v1/sessions", formData)
            },
            successCallback: () => {
                //这里判断是否可以跳转
                let searchParams = new URLSearchParams(window.location.search)
                let backPath = searchParams.get("back")
                if (backPath) {
                    window.location.href = backPath;
                }
            }
        }
    })
    useEffect(() => {
        console.log(window.location);
    }, [])
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                {/*<div>用户名</div>*/}
                {/*<div>{props.user?.username}</div>*/}
                <h1>登录</h1>
                <div>{Form}</div>
            </div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withSessionSSR(async (context) => {
    const user = context.req.session.currentUser;
    console.log(user)
    // console.log(context)
    return {
        props: {
            user: user || {}
        }
    }
})

export default signUp;