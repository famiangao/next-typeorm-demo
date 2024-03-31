import {NextPage} from 'next';
import styles from "../styles/index.module.scss"
import {useRouter} from "next/router";
import dynamic from 'next/dynamic';
import { Button } from 'antd';

const Bg= dynamic(() => import('../components/Background'), {
    ssr: false
});

const Home: NextPage = () => {
    const router = useRouter()
    let handleClick=async ()=>{
        await router.push("/posts")
    }
    return (
        <div className={styles.coverContainer}>
            <div className={styles.cover}>
                <div>
                    {/* <img src="/logo.png" alt=""/> */}
                </div>
                <div className={styles.title}>杜婉鑫的个人博客</div>
                <p className={styles.motto}>靡不有初，鲜克有终</p>
                <Button type="text" className={styles.entry} onClick={handleClick}>进入博客</Button>
            </div>
            <Bg/>
        </div>
    );
};

export default Home;

