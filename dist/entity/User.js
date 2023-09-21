"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _typeorm = require("typeorm");
var _Post = require("./Post");
var _Comment = require("./Comment");
var _handleDatabaseConnection = require("../lib/handleDatabaseConnection");
var _md = _interopRequireDefault(require("md5"));
var _lodash = _interopRequireDefault(require("lodash"));
var _dataSource = require("../data-source");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
var User = (_dec = (0, _typeorm.Entity)('users'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)("increment"), _dec3 = (0, _typeorm.Column)("varchar"), _dec4 = (0, _typeorm.Column)("varchar"), _dec5 = (0, _typeorm.CreateDateColumn)(), _dec6 = (0, _typeorm.UpdateDateColumn)(), _dec7 = (0, _typeorm.OneToMany)(function () {
  return _Post.Post;
}, function (post) {
  return post.author;
}), _dec8 = (0, _typeorm.OneToMany)(function () {
  return _Comment.Comment;
}, function (comment) {
  return comment.author;
}), _dec9 = (0, _typeorm.BeforeInsert)(), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function User(username, password) {
    (0, _classCallCheck2["default"])(this, User);
    (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "username", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "password_digest", _descriptor3, this);
    (0, _initializerDefineProperty2["default"])(this, "createdAt", _descriptor4, this);
    (0, _initializerDefineProperty2["default"])(this, "updatedAt", _descriptor5, this);
    (0, _initializerDefineProperty2["default"])(this, "posts", _descriptor6, this);
    (0, _initializerDefineProperty2["default"])(this, "comments", _descriptor7, this);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "passwordConfirmation", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      password: [],
      passwordConfirmation: [],
      username: []
    });
    this.username = username;
    this.password_digest = password;
  }
  (0, _createClass2["default"])(User, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var sameNameUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _handleDatabaseConnection.connectionDatabase)();
              case 2:
                _context.next = 4;
                return _dataSource.AppDataSource.manager.find(User, {
                  where: {
                    username: this.username
                  }
                });
              case 4:
                sameNameUser = _context.sent;
                if (sameNameUser.length != 0) {
                  this.errors.username.push("用户名重复");
                }
                if (this.username.trim() === "") {
                  this.errors.username.push("用户名不能为空");
                }
                if (!this.password) {
                  this.errors.password.push("密码不能为空");
                }
                if (!/[a-z]|[0-9]|[A-Z]/.test(this.password)) {
                  this.errors.password.push("格式不合法");
                }
                if (this.password != this.passwordConfirmation) {
                  this.errors.passwordConfirmation.push("密码不匹配");
                }
              case 10:
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
    key: "existErrors",
    value: function existErrors() {
      var result = false;
      Object.values(this.errors).forEach(function (el) {
        if (el.length != 0) result = true;
      });
      return result;
    }
  }, {
    key: "generatePasswordDigest",
    value: function generatePasswordDigest() {
      this.password_digest = (0, _md["default"])(this.password);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return _lodash["default"].omit(this, ["password", "passwordConfirmation", "errors", "password_digest"]);
    }
  }]);
  return User;
}(), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "username", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "password_digest", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "createdAt", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "updatedAt", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "posts", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "comments", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "generatePasswordDigest", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "generatePasswordDigest"), _class2.prototype)), _class2)) || _class);
exports.User = User;