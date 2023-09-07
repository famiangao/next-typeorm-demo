
import Link from "next/link";
import {NextPage} from "next";
import {Post} from "../src/entity/Post";
import {AppDataSource, dataSourceConfig} from "../src/data-source";
import {createConnection} from "typeorm/browser";
//import usePosts from "../hooks/usePosts";//这个方法是从axios内渲染出来的内容

type IHomeProp={
    posts:Post[]
}
///客户端渲染的内容
const Home:NextPage<IHomeProp>=(props)=> {
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
    // const posts:IPosts[]=await getPosts();
        let posts:Post[]=[];
        AppDataSource.setOptions({
            ...dataSourceConfig,
            entities:[Post]
        })
        await AppDataSource.initialize();
        // posts=await AppDataSource.manager.find(Post);
    //@ts-ignore
    // createConnection({
    //     ...dataSourceConfig,
    //     entities:[Post]
    // }).then(()=>{
    //     posts=await AppDataSource.manager.find(Post);
    // })

        return {
            props:{
                posts
            }
        }
}
export default Home;
