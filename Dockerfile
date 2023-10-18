FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# 用*.json是因为如果用的npm会有俩文件，一个是package*.json一个是package-lock.json
COPY package*.json ./

# 应该是不需要install的，因为你build了
# RUN yarn install


# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .

RUN npm run docker:build
# 暴漏端口
EXPOSE 3000
# 配置启动命令
CMD [ "npm", "run","start"]