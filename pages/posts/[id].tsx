import {getPosts} from "../../lib/posts";

export default function postShow(props){
    return (
        <div>
            这里放文章内容
            <div>{props.post.content}</div>
        </div>
    )
}
///如果一个页面你想要静态渲染动态页面的话就要用到getStaticPaths
//简单来说就是如果这个页面你想用到ssg，但是这是个动态路由页面,你想要把他静态化
//那就用getStaticPaths
export const getStaticPaths =async ()=>{
    const idList=await getPosts();
    return {
        paths:idList.map(el=>{
            return {
                params:{
                    id:el.id
                }
            }
        }),///这个对象内应该包含的是所有可能 的path的id
        fallback:true
    }
}
export const getStaticProps = async (x: any) => {
    const id = x.params.id;
    console.log(x,"这是x")
    const idList=await getPosts();

    return {
        props: {
            post: idList.find((el)=>el.id===id)
        }
    };
};
