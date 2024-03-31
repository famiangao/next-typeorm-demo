import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import axios from "../lib/axios";
import { User } from "../src/entity/User";
import { useForm } from "../hooks/useForm";
import { withSessionSSR } from "../lib/withSession";
import styles from "../styles/sing_in.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "../store/reducer/userSlice";
import Layout from "components/Layout";

type IProps = {
  user: User;
};
export type IFormMsg = {
  username: string;
  password: string;
};
const signIn: NextPage<IProps> = (props) => {
  const dispatch = useDispatch();
  let router = useRouter();
  let { Form } = useForm<IFormMsg>({
    formContent: [
      { labelName: "用户名", useKey: "username", inputType: "text" },
      { labelName: "密码", useKey: "password", inputType: "password" },
    ],
    data: {
      username: "",
      password: "",
    },
    submitOptions: {
      successWord: "登录成功",
      axiosFn: (formData) => {
        return axios.post("/api/v1/sessions", formData);
      },
      successCallback: async (msg) => {
        //这里判断是否可以跳转
        let searchParams = new URLSearchParams(window.location.search);
        let backPath = searchParams.get("back");
        if (backPath) {
          window.location.href = backPath;
        } else {
          //如果成功的话把内容存储到redux中
          dispatch(login(msg.data));
          await router.push("/posts");
        }
      },
      cancelCallback: async () => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("back")) {
          await router.push(searchParams.get("back"));
        } else {
          await router.push("/posts");
        }
      },
    },
  });
  return (
    <Layout>
      <div className={styles.main}>
        <h1>登录</h1>
        <div>{Form}</div>
        <div className={styles.sign_in}>
          没有账号?来注册一个 <Link href="/sign_up">注册</Link>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSSR(
  async (context) => {
    const user = context.req.session.currentUser;
    return {
      props: {
        user: user || {},
      },
    };
  }
);

export default signIn;
