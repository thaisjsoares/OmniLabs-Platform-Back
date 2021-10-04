"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _CreateUserController = require("../../../../../modules/users/useCases/CreateUser/CreateUserController");

var _UpdateUserAvatarController = require("../../../../../modules/users/useCases/UpdateUserAvatar/UpdateUserAvatarController");

var _celebrate = require("celebrate");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _ensureAuthenticated = _interopRequireDefault(require("../../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const usersController = new _CreateUserController.CreateUserController();
const userAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const upload = (0, _multer.default)(_upload.default.multer);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.handle);
usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.handle);
var _default = usersRouter;
exports.default = _default;