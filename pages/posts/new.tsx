import {GetServerSideProps, NextPage} from "next";
import {useForm} from "../../hooks/useForm";
import axios from '../../lib/axios';
import {connectionDatabase} from "../../src/lib/handleDatabaseConnection";
import {AppDataSource} from "../../src/data-source";
import {Post} from "../../src/entity/Post";
import {useRouter} from "next/router";

interface  IFormMsg{
    title:string,
    content:string
}
interface IEdit{
    isEdit:boolean,
    post?:Post
}
const New:NextPage<{edit:IEdit}>=(props)=>{
    let title="";
    let content="";
    const router = useRouter()
    if(props.edit.isEdit&&props.edit.post){
        title=props.edit.post.title
        content=props.edit.post.content
    }

    let {Form}=useForm<IFormMsg>({
        formContent:[
            {labelName:"标题",useKey:"title",inputType:"text"},
            {labelName:"内容",useKey:"content",inputType:"textarea"},
        ],
        data:{
            title,
            content
        },
        submitOptions:{
            successWord:props.edit.isEdit?"修改成功":"发布成功",
            axiosFn:(formData)=>{
                if(props.edit.isEdit){
                    return axios.patch(`/api/v1/posts/${props.edit.post.id}`, {
                        ...props.edit.post,
                        title:formData.title,
                        content:formData.content,
                    })

                }else{
                    return axios.post("/api/v1/posts", formData)
                }
            },
            successCallback:async ()=>{
                await  router.push(`/posts/show`)
            }
        }
    })
    return (
        <div className="postsNew">
            <div className="form-wrapper">
                {Form}
            </div>
            <style jsx global>{`
              .form-wrapper {
                padding: 16px;
              }

              .postsNew .field-content textarea {
                height: 20em;
                resize: none;
              }

              .postsNew .label-text {
                width: 4em;
                text-align: right;
              }

              .postsNew .actions {
                text-align: center;
                background: #ddd;
                padding: 4px 0;
              }
            `}</style>
        </div>
    );
}
export default New;
export const getServerSideProps: GetServerSideProps =async (context)=>{
    let editId=context.query.editId
    let edit:IEdit={
        isEdit:false
    }
    if(editId){
        await connectionDatabase();
        let post=await AppDataSource.manager.findOne(Post,{
            where:{
                id:Number(editId.toString())
            }
        })
        edit.isEdit=true;
        edit.post=post;
    }
    return {
        props:{
            edit:JSON.parse(JSON.stringify(edit))
        }
    }

}