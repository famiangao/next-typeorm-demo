import {AppDataSource} from "./data-source";
import {Post} from "./entity/Post";
async function main(){
    console.log("运行了函数",AppDataSource.isInitialized)
    AppDataSource.isInitialized|| (await AppDataSource.initialize());///创建与数据库的连接，作用等同于AppDataSource.connect();
    // await AppDataSource.connect();
    const content=await AppDataSource.manager.find(Post);
    console.log(content);
    if(content.length===0){
        await AppDataSource.manager.save([1,2,3,4,5,6,7,8,9,10].map(el=>{
            return new Post(`第${el}篇内容`,`这是第${el}篇的内容`)
        }))
    }
    console.log(await AppDataSource.manager.find(Post))
    await AppDataSource.destroy();//销毁连接
}
main().then(()=>[

])