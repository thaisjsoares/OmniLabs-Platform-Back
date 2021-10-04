"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateUserController = _interopRequireDefault(require("../../../../../modules/users/useCases/AuthenticateUser/AuthenticateUserController"));

var _RefreshTokenController = require("../../../../../modules/users/useCases/RefreshToken/RefreshTokenController");

var _celebrate = require("celebrate");

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
const sessionsController = new _AuthenticateUserController.default();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
sessionsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), sessionsController.handle);
sessionsRouter.post('/refresh-token', refreshTokenController.handle);
var _default = sessionsRouter;
exports.default = _default;