import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import {Post} from "./entity/Post";
AppDataSource.initialize().then(async ()=>{
    let david=new User("david","12321");
    // let sophie=new User("sophie","12121")
    let onePost=new Post("这是标题1","这是内容1")
    let twoPost=new Post("这是标题2","这是内容2")
    onePost.author=david;
    twoPost.author=david;

    await AppDataSource.manager.save(david);
    await AppDataSource.manager.save(onePost);
    await AppDataSource.manager.save(twoPost);
    console.log(await AppDataSource.manager.find(User))

    await AppDataSource.destroy();//销毁连接

})