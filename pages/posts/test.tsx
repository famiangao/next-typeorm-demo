import {NextPage} from 'next';
import {useRouter} from "next/router";
import {useState} from "react";
import axios from "../../lib/axios";

const Home: NextPage = () => {
    let [str,setStr]=useState("")
    let [propContent,setPropContent]=useState(1)
    function fn(str2:string){
        setStr(str+str2)
        setPropContent(propContent+1)
        console.log(this);
        axios.get("http://localhost:3011/api/1").then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <>
            <div>{str}------------</div>
            <Child fn={fn} num={propContent}></Child>
        </>
    );
};

const Child=({num,fn}:{
    num:number,
    fn:(str:string)=>void
})=>{
    let test=1111;
    return (
        <div>
            <div onClick={()=>{fn("=_=")}}>点击 </div>
            <div>{num}</div>
        </div>
    )
}

export default Home;