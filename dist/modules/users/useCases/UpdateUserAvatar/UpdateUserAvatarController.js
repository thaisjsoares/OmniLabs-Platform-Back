"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class UpdateUserAvatarController {
  async handle(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;