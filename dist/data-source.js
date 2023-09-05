"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
var AppDataSource = new _typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: true,
  //如果是true，会把代码里面的东西同步到数据库，会有危险
  logging: false,
  entities: [],
  migrations: [],
  subscribers: []
});
exports.AppDataSource = AppDataSource;