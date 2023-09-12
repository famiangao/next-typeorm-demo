import {NextPage} from "next";
import {useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import {IErrors} from "./api/v1/users";

type IProps = {}
export type IFormMsg = {
    name: string,
    password: string,
    passwordConfirmation: string
}
const signUp: NextPage<IProps> = (props) => {
    let [formData, setFormData] = useState<IFormMsg>({
        name: "",
        password: "",
        passwordConfirmation: ""
    })
    let [errors,setErrors]=useState<IErrors>({password: [], passwordConfirmation: [], username: []})
    const onSubmit = async () => {
        //点击确定要做的事儿是发送ajax，ajax肯定没办法静态化
        axios.post("/api/v1/users", formData)
            .then((res:AxiosResponse) => {
                // console.log(res);
            }).catch((error:AxiosError<IErrors>) => {
            console.log(error);
            setErrors(error.response.data)
        })
    }
    return (
        <div>
            <h1>注册</h1>
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
                <label>
                    确定密码
                    <input type="password" onChange={(event) => {
                        setFormData({
                            ...formData,
                            passwordConfirmation: event.target.value
                        })
                    }
                    }/>
                </label>
                <div>{errors.passwordConfirmation.length!==0&&errors.passwordConfirmation.join(" ")}</div>

            </div>
            <div>
                <button onClick={onSubmit}>确定</button>
            </div>
        </div>
    )
}

export default signUp;