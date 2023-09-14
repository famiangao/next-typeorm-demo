////这是一个封装全部表单结构的hook
import {useState} from "react";
import {AxiosResponse} from "axios";
import {AxiosError} from "axios/index";
import {IErrors} from "../src/model/SignIn";

interface IFormContent<T> {
    labelName: string,
    useKey: keyof T,
    inputType: "text" | "password" | "textarea"
}

interface IOptions<T> {
    formContent: IFormContent<T>[]//表单需要的内容
    data: T,//需要的数据格式
    // onSubmit: (data: T) => {}
    submitOptions:{
        axiosFn:(formData:T)=>Promise<AxiosResponse>,
        successCallback:(res?:AxiosResponse)=>any,
        successWord:string
    }
}

function useForm<T>(options: IOptions<T>) {
    const {formContent, data, submitOptions} = options;
    const [formData, setFormData] = useState(data);
    let initError: { [key in keyof T]?: string[] } = {};
    Object.keys(data).forEach((item) => {
        initError[item as keyof T] = [];
    })
    const [errors, setErrors] = useState(initError)

    const Form = (
        <div>
            {
                formContent.map((item) => {
                    return (
                        <div key={item.useKey.toString()}>
                            <label>
                                {item.labelName}
                                {item.inputType==="textarea"?
                                    <textarea onChange={(event)=>{
                                        setFormData({
                                            ...formData,
                                            [item.useKey]: event.target.value
                                        })
                                    }
                                    }></textarea>:
                                    <input type={item.inputType} onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            [item.useKey]: event.target.value
                                        })
                                    }}/>
                                }
                            </label>
                                {/*{JSON.stringify(errors)+item.useKey}*/}
                            <div>{errors[item.useKey]?.length !== 0 && errors[item.useKey]?.join(" ")}</div>
                        </div>
                    )
                })
            }
            <div>
                <button onClick={async () => {
                        //点击确定要做的事儿是发送ajax，ajax肯定没办法静态化
                        //点击后需要验证是否合规，是否有错，然后返回数据
                        submitOptions.axiosFn(formData).then((res) => {
                            setErrors(initError);
                            alert(submitOptions.successWord)
                            submitOptions.successCallback(res)
                        }).catch((error: AxiosError<IErrors>) => {
                            setErrors(error.response.data)
                            if(error.response.status===401){
                                console.log(window.location);
                                alert("用户未登录")
                                ///跳转到登录页面，然后登录页面的url中要带着参数，可以返回到这个页面中
                                window.location.href=`/sign_in?back=${window.location.pathname}`
                            }
                        })
                }}>确定
                </button>
            </div>
        </div>
    )
    return {
        Form,
    }
}

export {useForm};