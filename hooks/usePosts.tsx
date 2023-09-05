///这个东西的内容就是通过请求的方式获取链接  api/v1/posts 中的内容
///这是一个hooks，用到了useEffect方法
import {useEffect, useState} from "react";
import axios from 'axios';


///因为next是渲染在同一个服务器内的，所以这是通过axios的方式获取到的数据
export default function usePosts(){
    let [isLoad,setIsLoad]=useState(true);
    let [fileList,setFileList]=useState([]);

    //在内容加载完成之后运行useEffect，跳出react
    useEffect(()=>{
        setIsLoad(false);
        axios.get("/api/v1/posts")
            .then((response)=>{
                // console.log("请求回来的数据",response.data)
                setFileList(response.data)
            })
    },[])
    return {
        isLoad,
        fileList
    }
}