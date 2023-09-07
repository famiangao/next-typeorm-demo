"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataSource = require("./data-source");
var _User = require("./entity/User");
var _Post = require("./entity/Post");
var _Comment = require("./entity/Comment");
_dataSource.AppDataSource.initialize().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var user, sophie, david, onePost, twoPost, oneComment;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _dataSource.AppDataSource.manager.find(_User.User);
        case 2:
          user = _context.sent;
          if (!(user.length == 0)) {
            _context.next = 19;
            break;
          }
          sophie = new _User.User("sophie", "12121");
          david = new _User.User("david", "12321");
          _context.next = 8;
          return _dataSource.AppDataSource.manager.save(sophie);
        case 8:
          _context.next = 10;
          return _dataSource.AppDataSource.manager.save(david);
        case 10:
          onePost = new _Post.Post("My first title", "My first content", sophie);
          twoPost = new _Post.Post("My second title", "My second content", sophie);
          _context.next = 14;
          return _dataSource.AppDataSource.manager.save(onePost);
        case 14:
          _context.next = 16;
          return _dataSource.AppDataSource.manager.save(twoPost);
        case 16:
          oneComment = new _Comment.Comment("sophie's post is so perfect", david, onePost);
          _context.next = 19;
          return _dataSource.AppDataSource.manager.save(oneComment);
        case 19:
          _context.next = 21;
          return _dataSource.AppDataSource.destroy();
        case 21:
          //销毁连接
          console.log('OK!');
        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));