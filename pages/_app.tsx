import Head from 'next/head'
import 'styles/global.scss'
import 'github-markdown-css'
import {Provider} from "react-redux";
import store from "../store";

export default function App({Component, pageProps}: any) {
    return <>
        <Provider store={store}>
            <Head>
                <title>我的博客 - Seven_Du</title>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
            </Head>
            <Component {...pageProps} />
        </Provider>
    </>
}
