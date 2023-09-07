"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataSourceConfig2 = exports.dataSourceConfig = exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
var _Post = require("./entity/Post");
var dataSourceConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  //如果是true，会把代码里面的东西同步到数据库，会有危险
  logging: false,
  entities: [_Post.Post],
  //'dist/entity/**/*.js' 写路径会认为是commonJs，，太tm恶心了，，
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js']
};
exports.dataSourceConfig = dataSourceConfig;
var dataSourceConfig2 = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  //如果是true，会把代码里面的东西同步到数据库，会有危险
  logging: false,
  entities: ['src/entity/**/*{.ts,.js}'],
  migrations: ['src/migration/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}']
};
exports.dataSourceConfig2 = dataSourceConfig2;
var AppDataSource = new _typeorm.DataSource(dataSourceConfig);
exports.AppDataSource = AppDataSource;