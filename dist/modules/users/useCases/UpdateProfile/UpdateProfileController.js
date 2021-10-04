"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProfileController = void 0;

var _UpdateProfileUseCase = require("./UpdateProfileUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class UpdateProfileController {
  async handle(request, response) {
    const user_id = request.user.id;
    const {
      name,
      email,
      password,
      old_password
    } = request.body;

    const udpateProfile = _tsyringe.container.resolve(_UpdateProfileUseCase.UpdateProfileUseCase);

    const user = await udpateProfile.execute({
      // tem que ser await pois o método execute é async
      user_id,
      name,
      email,
      old_password,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.UpdateProfileController = UpdateProfileController;