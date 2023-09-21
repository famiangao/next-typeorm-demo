"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionDatabase = exports.closeDatabase = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dataSource = require("src/data-source");
var _Post = require("src/entity/Post");
var _User = require("../entity/User");
var _Comment = require("../entity/Comment");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var connectionDatabase = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _dataSource.AppDataSource.setOptions(_objectSpread(_objectSpread({}, _dataSource.dataSourceConfig), {}, {
              entities: [_Post.Post, _User.User, _Comment.Comment]
            }));
            _context.t0 = _dataSource.AppDataSource.isInitialized;
            if (_context.t0) {
              _context.next = 5;
              break;
            }
            _context.next = 5;
            return _dataSource.AppDataSource.initialize();
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function connectionDatabase() {
    return _ref.apply(this, arguments);
  };
}();
exports.connectionDatabase = connectionDatabase;
var closeDatabase = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _dataSource.AppDataSource.isInitialized;
            if (!_context2.t0) {
              _context2.next = 4;
              break;
            }
            _context2.next = 4;
            return _dataSource.AppDataSource.destroy();
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function closeDatabase() {
    return _ref2.apply(this, arguments);
  };
}();
exports.closeDatabase = closeDatabase;