"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataSourceConfig2 = exports.dataSourceConfig = exports.AppDataSource = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
var process = _interopRequireWildcard(require("process"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DEVELOPMENT_ID = "192.168.1.179";
var PRODUCTION_ID = "localhost";
var dataSourceConfig = {
  type: "postgres",
  host: process.env.NODE_ENV === 'production' ? PRODUCTION_ID : DEVELOPMENT_ID,
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  //如果是true，会把代码里面的东西同步到数据库，会有危险
  logging: false,
  entities: ['dist/entity/**/*.js'],
  //'dist/entity/**/*.js' 写路径会认为是commonJs，，太tm恶心了，，
  // 最后验证，只能这么写，别的所有写法都会出错的，太tm混乱了，，，回家了回家了
  migrations: ['dist/migration/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js']
};
exports.dataSourceConfig = dataSourceConfig;
var dataSourceConfig2 = {
  type: "postgres",
  host: "192.168.1.179",
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