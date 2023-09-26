////这是一个封装全部表单结构的hook
import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import {IErrors} from "../src/model/SignIn";
import cs from 'classnames';
import styles from "../styles/hooks/useForm.module.scss"

interface IFormContent<T> {
    labelName: string,
    useKey: keyof T,
    inputType: "text" | "password" | "textarea",
    className?: string;
}

interface IOptions<T> {
    formContent: IFormContent<T>[]//表单需要的内容
    data: T,//需要的数据格式
    // onSubmit: (data: T) => {}
    submitOptions: {
        axiosFn: (formData: T) => Promise<AxiosResponse>,
        successCallback: (res?: AxiosResponse) => any,
        successWord: string
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
    console.log(formData);
    const Form = (
        <div className={styles.main}>
            {
                formContent.map((item) => {
                    return (
                        <div key={item.useKey.toString()}
                             className={cs(styles.field, `field-${item.useKey.toString()}`, item.className)}
                        >
                            <label className={styles.label}>
                                <span className={styles.label_text}>
                                    {item.labelName}
                                </span>
                                {item.inputType === "textarea" ?
                                    <textarea  className={styles.control} value={formData[item.useKey].toString()} onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            [item.useKey]: event.target.value
                                        })
                                    }
                                    }></textarea> :
                                    <input className={styles.control} value={formData[item.useKey].toString()} type={item.inputType}
                                           onChange={(event) => {
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
            <div className={styles.btn_container}>
                <button onClick={async () => {
                    //点击确定要做的事儿是发送ajax，ajax肯定没办法静态化
                    //点击后需要验证是否合规，是否有错，然后返回数据
                    // console.log(submitOptions.axiosFn(formData))
                    submitOptions.axiosFn(formData).then((res) => {
                        console.log(res);
                        setErrors(initError);
                        alert(submitOptions.successWord)
                        submitOptions.successCallback(res)
                    }).catch((error: AxiosError<IErrors>) => {
                        setErrors(error.response.data)

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