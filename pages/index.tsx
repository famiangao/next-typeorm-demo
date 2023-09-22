import {NextPage} from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <>
            <div className="cover">
                <div>
                    <img src="/logo.png" alt=""/>
                </div>
                <div className="title">杜婉鑫的个人博客</div>
                <p>靡不有初，鲜克有终</p>
                <p><Link href="/posts/show">文章列表</Link></p>
            </div>
            <style jsx>{`
              .title {
                font-size: 30px;
              }

              .cover {
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                //background-image:url("../public/homeBg.jpg");
                background-repeat: no-repeat;
                background-position: center;
                background-attachment: fixed;
                background-color: #eaf4f8;

              }

              .cover > img {
                width: 120px;
                height: 120px;
              }
              .cover > p{
              padding: 10px;
              }
            `}</style>
        </>
    );
};

export default Home;

//toDo 1,替换css换为那个经典react css 2,在这个页面添加个背景图
