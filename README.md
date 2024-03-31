这是一个用来学习next的练习项目，最终将完成一个博客后台系统
## 运行代码
```bash
pnpm i 
npm run dev
```

## 知识点
pages 下是next相关的内容
src   下是typeorm相关内容


如果在页面渲染之前获取的信息可以使用服务端渲染，就不用使用axios，直接调用typeorm api就可以了。
如果是页面的交互就需要使用 axios请求，请求api/v1 文件下的接口了。

然后 api/v1 下的请求还分为get/post/delet/put请求

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
创建数据库
```
docker exec -it <id> bash
psql -U blog

```CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

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
### docker 打包

````
docker build . -t seven/node-web-app  //把当前目录按照Dockerfile打包
docker run -p 3000:3000 -d seven/node-web-app  //根据镜像启动一个容器

````
### 把代码同步到云上的步骤
1. 登录云服务器
2. 到项目的对应目录
3. git pull 代码
4. 运行pnpm i 下载更新以来
5. docker ps 查看镜像
6. docker rm xxx 删除上次的镜像/或者 docker stop xxx 停止对应镜像
7. 打包
```
docker build . -t seven/node-web-app  //把当前目录按照Dockerfile打包
docker run -p 3000:3000 -d seven/node-web-app  //根据镜像启动一个容器
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