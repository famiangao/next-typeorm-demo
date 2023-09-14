import axios from "axios";

let instance=axios.create({
    headers:{
        'content-type':"application/json"
    }
})
//请求拦截器
instance.interceptors.request.use(
    config=>{
        console.log(config);
        return config;
    },
    error => {

    }
)
//相应拦截器
instance.interceptors.response.use(
    response=>{
        console.log(response);

        return response
    },
    error => {

    }
)
export default instance;