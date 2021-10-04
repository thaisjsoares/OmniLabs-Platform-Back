"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUseCase = void 0;

var _IUsersRepository = _interopRequireDefault(require("../../repositories/models/IUsersRepository"));

var _tsyringe = require("tsyringe");

var _IStorageProvider = _interopRequireDefault(require("../../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarUseCase {
  constructor(usersRepository, storageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    user_id,
    avatarFilename
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, 'avatar');
    }

    const filename = await this.storageProvider.saveFile(avatarFilename, 'avatar');
    user.avatar = filename;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;