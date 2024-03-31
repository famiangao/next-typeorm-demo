import Head from 'next/head'
import 'styles/global.scss'
import 'github-markdown-css'
import { Provider } from "react-redux";
import { AppProps } from 'next/app';
import theme from '../utils/themeConfig';
import store from "../store";
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
    return (<>
        <ConfigProvider theme={theme}>
            <Provider store={store}>
                <Head>
                    <title>我的博客 - Seven_Du</title>
                    <meta name="viewport"
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
                </Head>
                <Component {...pageProps} />
            </Provider>
        </ConfigProvider>
    </>)
}
