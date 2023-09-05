//post的作用主要是获取到markdown列表及其内容
//我们先想想用node如何实现这个逻辑

import path from "node:path";
import * as fs from "fs";

let markdownPath=path.join(process.cwd(),"markdown")///markdown文件的目录

///获取此目录下的所有文件名

async function getAllFile(){
    const files=fs.readdirSync(markdownPath);
    // console.log(files)
    return files;
}

export {
    getAllFile
}