"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAdmin;

var _UserRoleRepository = _interopRequireDefault(require("../../../../modules/users/infra/typeorm/repositories/UserRoleRepository"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const userRoleRepository = new _UserRoleRepository.default();
  const userRole = await userRoleRepository.findByUserId(id);

  if (!userRole) {
    throw new _AppError.default("User isn't admin");
  }

  return next();
}