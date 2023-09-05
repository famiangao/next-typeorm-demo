import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {
    ///之前连接之后会返回一个connection对象，现在那个对象变成了AppDataSource对象
    //等量置换一下即可

    console.log("Inserting a new user into the database...")
    console.log(AppDataSource)
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

    console.log("Here you can setup and run express / fastify / any other framework.")
    // await AppDataSource.close();  close 方法被弃用了，改为用display方法
    await AppDataSource.destroy();
}).catch(error => console.log(error))
