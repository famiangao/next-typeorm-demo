import Link from "next/link";
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {Post} from "../../src/entity/Post";
import {AppDataSource} from "../../src/data-source";
import {connectionDatabase} from "../../src/lib/handleDatabaseConnection";
import {usePager} from "../../hooks/usePager";
//import usePosts from "../hooks/usePosts";//这个方法是从axios内渲染出来的内容
import styles from "../../styles/posts/index.module.scss"
import {useLogin} from "../../hooks/useLogin";

type IHomeProp = {
    posts: Post[],
    maxPage:number,
    currentPage:number,
    postCount:number

}

const PAGE_COUNT=3;
///客户端渲染的内容
const Home: NextPage<IHomeProp> = (props) => {
    let {posts} = props;
    let {pager}=usePager({
        maxPage:props.maxPage,
        currentPage:props.currentPage,
        showCount:props.postCount,
        onChange:(page:number)=>{
            window.location.href=`${window.location.pathname}?page=${page}`
        }
    })
    let loginBar=useLogin();
    return (
        <div>
            {loginBar}
            <div className={styles.main_container}>
                <div className={styles.title}>文章列表</div>
                <hr/>
                <div className={styles.content}>
                    {
                        posts.map((el) => {
                            return (
                                <div key={el.id} className={styles.content_bar}>
                                    {el.title}：
                                    <Link href={`/posts/${el.id}`}>
                                        {el.title}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    props.maxPage>1&&
                    <div>{
                        pager
                    }</div>
                }
            </div>
        </div>
    )
}

//用ssg静态渲染内容，用ssg主要是为了可以动态渲染，不同的页面显示不同的文章
///因为next的东西是约定大于配置，所以你只要写了getStaticProps就默认是这个页面的ssg了
export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext<{page:string}>) => {

    //现在页面有一个传参了，page=x。设置一页几个和一共几页
    // console.log(context.query.page);//获取到当前的查询参数
    const pageNumber=Number(context.query.page)||1;
    await connectionDatabase();
    let posts=await AppDataSource.manager.findAndCount(Post,{
        skip:(pageNumber-1)*PAGE_COUNT,
        take:PAGE_COUNT
    })
    // console.log(posts);
    return {
        props: {
            posts:JSON.parse(JSON.stringify(posts[0])),
            maxPage:Math.ceil(posts[1]/PAGE_COUNT),
            currentPage:pageNumber,
            postCount:PAGE_COUNT
        }
    }
}
export default Home;
