import {NextPage} from "next";
import axios from '../lib/axios';
import {useForm} from "../hooks/useForm";
import styles from "../styles/sing_in.module.scss"
import Link from "next/link";

type IProps = {}
export type IFormMsg = {
    username: string,
    password: string,
    passwordConfirmation: string
}
const signUp: NextPage<IProps> = (props) => {


    let {Form} = useForm<IFormMsg>({
        formContent: [
            {labelName: "用户名", useKey: "username", inputType: "text"},
            {labelName: "密码", useKey: "password", inputType: "password"},
            {labelName: "确定密码", useKey: "passwordConfirmation", inputType: "password"},
        ],
        data: {
            username: "",
            password: "",
            passwordConfirmation: ""
        },
        submitOptions: {
            successWord: "注册成功",
            axiosFn: (formData) => {
                return axios.post("/api/v1/users", formData)
            },
            successCallback: () => {
                window.location.href = "/sign_in"
            }
        }
    })

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h1>注册</h1>
                <div>
                    {Form}
                </div>
                <div className={styles.sign_up}>返回登录:<Link href="/sign_in">登录</Link></div>
            </div>
        </div>
    )
}

export default signUp;