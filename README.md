这是一个用来学习next的练习项目，最终将完成一个博客后台系统
## 运行代码
```bash
npm i 
npm run dev
```

## 知识点

### 运行项目

我的docker容器名为next-postgres-container，大家要换成自己的

创建容器
```
docker run --name next-postgres-container -v $PWD/blog-data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```
启动容器
````
docker start next-postgres-container
````
进入容器
```
docker exec -it next-postgres-container bash
```
进入postgres命令行(blog是我的用户名)
```
psql -U blog -W

```
sql命令
```
 \l                    //查看所有数据库 (list database)
 \c                   //连接对应数据库 （connect a database)
 \dt                  //用于display table 
 \d                   //列出当前数据库的所有表格。
 \d [table_name]      //列出某一张表格的结构。
 \h                  //查看SQL命令的解释，比如\h select。
 \?                  // 查看psql命令列表。
```

### js知识 

获取当前页面的查询参数(查询参数是 url？后面的内容，用于传递当前页面的额外信息，以键值对的形式出现，参数之间用&分隔)
````
let searchParams=new URLSearchParams(window.location.search)
console.log(searchParams.get("back"));
````

window.location下的内容
````
window.location.href    ///完整url   http://localhost:3000/sign_in?back=/posts/new

window.location.pathname  //当前的地址  /sign_in

window.location.search    //查询参数    ?back=/posts/new

````

页面跳转
````
window.location.href=`/sign_in?back=${window.location.pathname}`   
///用半路径的方式，浏览器会自动拼接当前的域名和端口号
````