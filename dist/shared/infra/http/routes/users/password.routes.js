"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ResetPasswordUserController = require("../../../../../modules/users/useCases/ResetPasswordUser/ResetPasswordUserController");

var _express = require("express");

const passwordRouter = (0, _express.Router)();
const resetPasswordController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRouter.post('/reset', resetPasswordController.handle);
var _default = passwordRouter;
exports.default = _default;