import { Button, Menu, MenuProps, message } from "antd";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { AxiosResponse } from "axios";
import { User } from "../src/entity/User";
import { useRouter } from "next/router";
import style from "../styles/hooks/useLogin.module.scss"

const items: MenuProps['items'] = [
    {
        label: '文章列表',
        key: 'posts',
    },
    {
        label: '新建文章',
        key: 'new',
    }
]
export function useLogin() {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState('posts')
    const [userInfo, setUserInfo] = useState({
        showName: "",
        isLogin: false
    })
    useEffect(() => {
        setSelectedItem(window.location.pathname.split("/").pop())
        getUserInfo();
    }, [])
    const getUserInfo = () => {
        axios.get("/api/v1/sessions").then((res: AxiosResponse<User | {}>) => {
            if ("username" in res.data) {
                setUserInfo({ showName: res.data.username, isLogin: true })
            } else {
                setUserInfo({ showName: "", isLogin: false })
            }
        })
    }
    const onClickMenu = (info: any) => {
        switch (info.key) {
            case 'list': router.push("/posts"); break;
            case 'new': router.push("/posts/new"); break;
            default: router.push("/posts");

        }
        // setSelectedItem(info.key)
    }
    return (
        <div className={style.main}>
            <div className={style.left}>
                <Menu onClick={onClickMenu} mode="horizontal" items={items} selectedKeys={[selectedItem]} />
            </div>
            <div className={style.right}>
                <div className={style.login}>
                    {
                        userInfo.isLogin ?
                            (
                                <>
                                    <div className={style.user_name}>{userInfo.showName}</div>
                                    <div className={style.welcome}>欢迎使用</div>
                                    <div>
                                        <Button type="link" onClick={async () => {
                                            axios.delete('/api/v1/sessions').then((res) => {
                                                message.success('退出登录成功', 3, () => {
                                                    //退出登录成功了要刷新页面     
                                                    location.reload();
                                                })
                                            }).catch(e => { })
                                        }}>退出登录</Button>
                                    </div>
                                </>

                            ) :
                            (
                                <span>
                                    <Button type="primary" onClick={() => router.push('/sign_in')} className={style.loginBtn}>登录</Button>
                                    <Button onClick={() => router.push('/sign_up')}>注册</Button>
                                </span>
                            )

                    }
                </div>
            </div>
        </div>
    )
}