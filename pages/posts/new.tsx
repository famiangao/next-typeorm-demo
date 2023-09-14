import {NextPage} from "next";
import {useForm} from "../../hooks/useForm";
import axios from '../../lib/axios';

interface  IFormMsg{
    title:string,
    content:string
}
const New:NextPage=()=>{
    let {Form}=useForm<IFormMsg>({
        formContent:[
            {labelName:"标题",useKey:"title",inputType:"text"},
            {labelName:"内容",useKey:"content",inputType:"textarea"},
        ],
        data:{
            title:"",
            content:""
        },
        submitOptions:{
            successWord:"发布成功",
            axiosFn:(formData)=>{
                return axios.post("/api/v1/posts", formData)
            },
            successCallback:()=>{
            }
        }
    })
    return (
        <div>
            {Form}
        </div>
    )
}
export default New;