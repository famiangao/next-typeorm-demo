// import {getAllFile} from "../lib/posts";




import usePosts from "../hooks/usePosts";
import {getPosts} from "../lib/posts";
import Link from "next/link";
import {IPosts} from "../types/posts.d";
import {NextPage} from "next";
//这个方法是从axios内渲染出来的内容

///客户端渲染的内容
const Home:NextPage<{
    posts:IPosts[]
}>=(props)=> {
    // let filesList= await getAllFile();
    // console.log(filesList,"1111")
    // let {isLoad,fileList}=usePosts();
    let {posts}=props;
    // console.log("这是内容",props)
    return (
        <main>
            <div>aaa</div>
            <div>
                {
                    posts.map((el)=>{
                        return (
                            <div key={el.id}>
                                {el.title}
                                <Link href={`/posts/${el.id}`}>
                                    {el.title}
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

//用ssg静态渲染内容，用ssg主要是为了可以动态渲染，不同的页面显示不同的文章
///因为next的东西是约定大于配置，所以你只要写了getStaticProps就默认是这个页面的ssg了
export const getStaticProps=async ()=>{
    const posts:IPosts[]=await getPosts();
        return {
            props:{
                posts
            }
        }
}
export default Home;
