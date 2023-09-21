import {AppDataSource} from "./data-source";
import {User} from "./entity/User";
import {Post} from "./entity/Post";
import {Comment} from "./entity/Comment";
AppDataSource.initialize().then(async ()=>{
    ///检查如果没有用户就给填充数据，随便填充一下啦
    let user=await AppDataSource.manager.find(User);
    if (user.length==0){
        let sophie=new User("sophie","12121")
        let david=new User("david","12321");
        await AppDataSource.manager.save(sophie);
        await AppDataSource.manager.save(david)
        let onePost=new Post("My first title","My first content",sophie)
        let twoPost=new Post("My second title","My second content",sophie)
        await AppDataSource.manager.save(onePost);
        await AppDataSource.manager.save(twoPost);
        let oneComment=new Comment("sophie's post is so perfect",david,onePost);
        await AppDataSource.manager.save(oneComment);
    }

    await AppDataSource.destroy();//销毁连接
    console.log('OK!')
})