"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _User = require("../entity/User");
var _dataSource = require("../data-source");
var _md = _interopRequireDefault(require("md5"));
var _handleDatabaseConnection = require("../../lib/handleDatabaseConnection");
var SignIn = /*#__PURE__*/function () {
  // userName:string;
  // password:string;

  function SignIn(userName, password) {
    (0, _classCallCheck2["default"])(this, SignIn);
    this.userName = userName;
    this.password = password;
    (0, _defineProperty2["default"])(this, "user", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      password: [],
      username: []
    });
  }
  //判断是否正确
  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.userName == "") {
                  this.errors.username.push("用户名不能为空");
                }
                if (this.password == "") {
                  this.errors.password.push("密码不能为空");
                }
                //连接数据库
                _context.next = 4;
                return (0, _handleDatabaseConnection.connectionDatabase)();
              case 4:
                _context.next = 6;
                return _dataSource.AppDataSource.manager.findOne(_User.User, {
                  where: {
                    username: this.userName
                    // password:this.password
                  }
                });
              case 6:
                user = _context.sent;
                if (user) {
                  this.user = user;
                  if ((0, _md["default"])(this.password) !== user.password_digest) {
                    this.errors.password.push("用户名和密码不匹配");
                  }
                } else {
                  this.errors.username.push("用户名不存在");
                }
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function validate() {
        return _validate.apply(this, arguments);
      }
      return validate;
    }()
  }, {
    key: "hasError",
    value: function hasError() {
      return Object.values(this.errors).some(function (el) {
        return el.length !== 0;
      });
    }
  }]);
  return SignIn;
}();
exports.SignIn = SignIn;