import { connectionDatabase } from "src/lib/handleDatabaseConnection";
import { GetServerSideProps, NextPage } from "next";
import { AppDataSource } from "../../src/data-source";
import { Post } from "../../src/entity/Post";
import { marked } from 'marked';
import styles from "../../styles/posts/[id]/index.module.scss"
import { withSessionSSR } from "../../lib/withSession";
import { User } from "../../src/entity/User";
import { useCallback } from "react";
import axios from "../../lib/axios";
import { useRouter } from 'next/router';
import { useLogin } from "../../hooks/useLogin";

type IProps = {
    id: number;
    post: Post;
    currentUser: User | null;
}
const postShow: NextPage<IProps> = (props) => {
    const router = useRouter()
    let loginBar = useLogin();
    const onRemove = useCallback(() => {
        axios.delete(`/api/v1/posts/${props.id}`).then(async () => {
            window.alert('删除成功');
            await router.push('/posts')
        }, () => {
            window.alert('删除失败');
        });
    }, [props.id]);
    const onEdit = useCallback(async () => {
        await router.push(`/posts/new?editId=${props.id}`)
    }, [props.id])
    return (
        <div>
            {loginBar}
            <div className={styles.wrapper}>
                <header>
                    <div className={styles.title}>{props.post.title}</div>
                    {props.currentUser &&
                        <p className={styles.actions}>
                            <button onClick={onEdit}>编辑</button>
                            <button onClick={onRemove}>删除</button>
                        </p>
                    }
                </header>
                <article className="markdown-body" dangerouslySetInnerHTML={{ __html: marked(props.post.content) }}>
                </article>
            </div>
        </div>
    )
}
////现在这个东西从ssg变成ssr了，炫酷~！
export const getServerSideProps: GetServerSideProps = withSessionSSR(async (context) => {
    const id = Number(context.params.id);
    if (isNaN(id)) {
        context.res.writeHead(307, { Location: '/error' })
        context.res.end()
        return {
            props: {}
        }
    }
    //从数据库中获取此id的相关信息
    await connectionDatabase();
    let post = await AppDataSource.manager.findOne(Post, {
        where: {
            id: Number(context.params.id)
        }
    })
    if(post?.id===undefined){
        context.res.writeHead(307, { Location: '/error' })
        context.res.end()
        return {
            props: {}
        }
    }
    const currentUser = context.req.session.currentUser || null;
    return {
        props: {
            id: id,
            post: JSON.parse(JSON.stringify(post)),
            currentUser
        }
    }
})

export default postShow;