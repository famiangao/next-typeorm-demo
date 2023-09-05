//post的作用主要是获取到markdown列表及其内容
//我们先想想用node如何实现这个逻辑

import path from "node:path";
import * as fs from "node:fs";
import {IPosts} from "../types/posts.d";
import matter from "gray-matter";

let markdownPath=path.join(process.cwd(),"markdown")///markdown文件的目录

///获取此目录下的所有文件名

async function getPosts(){
    const files=fs.readdirSync(markdownPath);
    let posts:IPosts[]=files.map((el)=>{
        let id=el.split(".")[0];
        // let title=id;
        let pagePath=path.join(markdownPath,el);
        let pageContent=fs.readFileSync(pagePath,"utf8");
        let {data:{title,data},content}=matter(pageContent)
        return {
            id,
            title,
            content
        }
    })
    return posts;
}

export {
    getPosts
}