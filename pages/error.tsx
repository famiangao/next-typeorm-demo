import {NextPage} from 'next';
import styles from "../styles/error.module.scss"
import {useRouter} from "next/router";
import dynamic from 'next/dynamic';

const Bg= dynamic(() => import('../components/Background'), {
    ssr: false
});

const Error: NextPage = () => {
    const router = useRouter()
    return (
        <div>
           <div className={styles.main}>
            出错啦  
            <div className={styles.detail}>页面无效或无权限访问&nbsp;&nbsp;</div>
            </div>
           <div className={styles.back} onClick={()=>{
                history.back();
           }}>点击返回上一页吧 &nbsp;&nbsp;</div>
            <Bg type='tadpole'/>
        </div>
    );
};

export default Error;

