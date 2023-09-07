"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataSourceConfig2 = exports.dataSourceConfig = exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
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
  entities: ['dist/entity/**/*.js'],
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
  entities: ['src/entity/**/*.js'],
  migrations: ['src/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.js']
};
exports.dataSourceConfig2 = dataSourceConfig2;
var AppDataSource = new _typeorm.DataSource(dataSourceConfig);
exports.AppDataSource = AppDataSource;