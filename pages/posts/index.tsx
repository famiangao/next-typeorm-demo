import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { NextPage } from "next";
import cls from "classnames";
import { useRouter } from "next/router";
import { Post } from "../../src/entity/Post";
import { usePager } from "../../hooks/usePager";
import styles from "../../styles/posts/index.module.scss";
import { useLogin } from "../../hooks/useLogin";
import axios, { AxiosResponse } from "axios";
import Layout from "../../components/Layout";
import { ISearchParams, ISearchResult } from "pages/api/v1/posts/search";
import { set } from "lodash";

type IPostsInfo = {
  posts: Post[];
  maxPage: number;
  currentPage: number;
  pageCount: number;
};

const PAGE_COUNT = 10;
///客户端渲染的内容
const Home: NextPage = () => {
  const router = useRouter();
  const [showNoneAnim, setShowNoneAnim] = useState(true);
  const [postsInfo, setPostsInfo] = useState<IPostsInfo>({
    posts: [],
    maxPage: 1,
    currentPage: 1,
    pageCount: 1,
  });
  const [searchContent, setSearchContent] = useState("");
  const { pager } = usePager({
    maxPage: postsInfo.maxPage,
    currentPage: postsInfo.currentPage,
    showCount: postsInfo.pageCount,
    onChange: (page: number) => {
      getPostInfo({ start: page, limit: PAGE_COUNT });
    },
  });
  useEffect(() => {
    getPostInfo({
      start: 1,
      limit: PAGE_COUNT,
    });
  }, []);
  const getPostInfo = async (params: ISearchParams) => {
    if (!params.searchWord) params.searchWord = searchContent;
    axios
      .post("/api/v1/posts/search", params)
      .then((res: AxiosResponse<ISearchResult>) => {
        setPostsInfo({
          ...postsInfo,
          posts: res.data.content,
          maxPage: Math.ceil(res.data.total / Number(params.limit)),
          currentPage: Number(params.start),
        });
        if (res.data.content.length == 0) {
          setShowNoneAnim(false);
          setTimeout(() => setShowNoneAnim(true), 0);
        }
      });
  };
  const loginBar = useLogin();
  return (
    <div>
      {loginBar}
      <Layout className={styles["main_container"]}>
        <div className={styles.title}>文章列表</div>
        <hr />
        <div className={styles.content}>
          <div className={styles.searchBox}>
            <div className={styles.search}>搜索</div>
            <Input
              placeholder="标题关键字"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
            <Button
              className={styles.submit}
              onClick={() =>
                getPostInfo({ start: postsInfo.currentPage, limit: PAGE_COUNT })
              }
            >
              确定
            </Button>
          </div>
          {postsInfo.posts.length > 0 ? (
            postsInfo.posts.map((el) => {
              return (
                <div
                  key={el.id}
                  className={styles.content_bar}
                  onClick={() => {
                    router.push(`/posts/${el.id}`);
                  }}
                >
                  {el.title}
                </div>
              );
            })
          ) : (
            <div
              className={cls(
                showNoneAnim ? styles.no_content_anim : "",
                styles.no_content
              )}
            >
              暂无内容
            </div>
          )}
        </div>
        {postsInfo.maxPage > 1 && <div>{pager}</div>}
      </Layout>
    </div>
  );
};

//放弃这个ssr,每次翻页都要刷新页面的体验太不好了。这一块和搜素合并成后端接口吧。
// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<{ page: string }>) => {
//     //现在页面有一个传参了，page=x。设置一页几个和一共几页
//     const pageNumber = Number(context.query.page) || 1;
//     await connectionDatabase();
//     const posts = await AppDataSource.manager.findAndCount(Post, {
//         skip: (pageNumber - 1) * PAGE_COUNT,
//         take: PAGE_COUNT
//     })
//     return {
//         props: {
//             posts: JSON.parse(JSON.stringify(posts[0])),
//             maxPage: Math.ceil(posts[1] / PAGE_COUNT),
//             currentPage: pageNumber,
//             postCount: PAGE_COUNT
//         }
//     }
// }
export default Home;
