import {NextPage} from 'next';
import Link from 'next/link';
import styles from "../styles/index.module.scss"

const Home: NextPage = () => {
    return (
        <>
            <div className={styles.cover}>
                <div>
                    <img src="/logo.png" alt=""/>
                </div>
                <div className={styles.title}>杜婉鑫的个人博客</div>
                <p>靡不有初，鲜克有终</p>
                <p><Link href="/posts/show">文章列表</Link></p>
            </div>
        </>
    );
};

export default Home;

//toDo  1,在这个页面添加个背景图
