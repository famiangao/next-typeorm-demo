import { message } from "antd";
import axios from "axios";

let instance = axios.create({
    headers: {
        'content-type': "application/json"
    }
})
//请求拦截器
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        throw error;
    }
)
//相应拦截器
instance.interceptors.response.use(
    response => {
        if (response) {

        } else {

        }
        return response
    },
    error => {
        if (error.response.status === 401) {
            message.error('用户未登录', 3, () => {
                ///跳转到登录页面，然后登录页面的url中要带着参数，可以返回到这个页面中
                window.location.href = `/sign_in?back=${window.location.pathname}`
            })
        }
        throw error;
    }
)
export default instance;