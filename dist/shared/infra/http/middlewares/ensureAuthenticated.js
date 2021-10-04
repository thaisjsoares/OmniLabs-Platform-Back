"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.default('Invalid token!', 401);
  }
}