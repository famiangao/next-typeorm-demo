import { AppDataSource } from "./data-source"

///呜呜呜，，好累啊，，好想休息啊，，哎，，但是不行，，坚持！！！！！！可以的！！

//这个函数其实 理论上来说是主函数，先不写内容
AppDataSource.initialize().then(async () => {
    ///之前连接之后会返回一个connection对象，现在那个对象变成了AppDataSource对象
    //等量置换一下即可

    // console.log(AppDataSource)
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    //
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // await AppDataSource.close();  close 方法被弃用了，改为用display方法
    // await AppDataSource.destroy();
}).catch(error => console.log(error))
