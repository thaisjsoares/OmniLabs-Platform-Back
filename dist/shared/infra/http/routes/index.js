"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _courses = _interopRequireDefault(require("./courses.routes"));

var _groups = _interopRequireDefault(require("./groups.routes"));

var _journey = _interopRequireDefault(require("./journey.routes"));

var _lessons = _interopRequireDefault(require("./lessons.routes"));

var _roles = _interopRequireDefault(require("./roles.routes"));

var _password = _interopRequireDefault(require("./users/password.routes"));

var _profile = _interopRequireDefault(require("./users/profile.routes"));

var _sessions = _interopRequireDefault(require("./users/sessions.routes"));

var _users = _interopRequireDefault(require("./users/users.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/profile', _profile.default);
routes.use('/password', _password.default);
routes.use('/sessions', _sessions.default);
routes.use('/groups', _groups.default);
routes.use('/courses', _courses.default);
routes.use('/lessons', _lessons.default);
routes.use('/journey', _journey.default);
routes.use('/roles', _roles.default);
var _default = routes;
exports.default = _default;