"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

require("express-async-errors");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _celebrate = require("celebrate");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _routes = _interopRequireDefault(require("./routes"));

require("../../container");

var _typeorm = _interopRequireDefault(require("../typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-unused-vars */
// import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
(0, _typeorm.default)();
const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)()); // app.use(rateLimiter);

app.use(_express.default.json());
app.use('/files', _express.default.static(_upload.default.uploadsFolder));
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, _request, response, _next) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});