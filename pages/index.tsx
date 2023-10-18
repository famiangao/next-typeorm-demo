import {NextPage} from 'next';
import styles from "../styles/index.module.scss"
import {useRouter} from "next/router";

const Home: NextPage = () => {
    const router = useRouter()
    let handleClick=async ()=>{
        await router.push("/posts/show")
    }
    return (
        <>
            <div className={styles.cover}>
                <div>
                    <img src="/logo.png" alt=""/>
                </div>
                <div className={styles.title}>杜婉鑫的个人博客</div>
                <p>靡不有初，鲜克有终</p>
                <p onClick={handleClick} className={styles.entry}>进入博客</p>
            </div>
        </>
    );
};

export default Home;

//toDo  1,在这个页面添加个背景图
