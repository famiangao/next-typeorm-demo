import {NextPage} from "next";
import {useState} from "react";
import {IErrors} from "../src/model/SignIn";
import axios, {AxiosError} from "axios";
import {Simulate} from "react-dom/test-utils";
import {User} from "../src/entity/User";

type IProps = {}
export type IFormMsg = {
    name: string,
    password: string,
}
const signUp: NextPage<IProps> = (props) => {
    let [formData, setFormData] = useState<IFormMsg>({
        name: "",
        password: "",
    })
    let [errors,setErrors]=useState<IErrors>({password: [] ,username: []})
    let [user,setUser]=useState<any>({})
    const onSubmit = async () => {
        //点击确定要做的事儿是发送ajax，ajax肯定没办法静态化
        //点击后需要验证是否合规，是否有错，然后返回数据
        axios.post("/api/v1/sessions",formData).then((res)=>{
            alert("登录成功")
            console.log(res.data);
            setUser(res.data)
        }).catch((error:AxiosError<IErrors>)=>{
            setErrors(error.request)
        })
    }
    return (
        <div>
            <div>{user.username}</div>
            <h1>登录</h1>
            <div>
                <label>
                    用户名
                    <input type="text" onChange={(event) => {
                        setFormData({
                            ...formData,
                            name: event.target.value
                        })
                    }
                    }/>
                </label>
                <div>{errors.username.length!==0&&errors.username.join(" ")}</div>
            </div>

            <div>
                <label>
                    密码
                    <input type="password" onChange={(event) => {
                        setFormData({
                            ...formData,
                            password: event.target.value
                        })
                    }
                    }/>
                </label>
                <div>{errors.password.length!==0&&errors.password.join(" ")}</div>
            </div>
            <div>
                <button onClick={onSubmit}>确定</button>
            </div>
        </div>
    )
}

export default signUp;