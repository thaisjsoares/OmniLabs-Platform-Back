"use strict";

var _tsyringe = require("tsyringe");

var _DiskStorageProvider = _interopRequireDefault(require("./implementations/DiskStorageProvider"));

var _S3StorageProvider = require("./implementations/S3StorageProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const diskStorage = {
  disk: _DiskStorageProvider.default,
  s3: _S3StorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton('StorageProvider', diskStorage[process.env.STORAGE_DRIVER]);