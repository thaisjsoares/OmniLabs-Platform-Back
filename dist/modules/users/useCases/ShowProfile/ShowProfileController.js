"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowProfileController = void 0;

var _ShowProfileUseCase = require("./ShowProfileUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class ShowProfileController {
  async handle(request, response) {
    // exibição do perfil
    const user_id = request.user.id;

    const showProfile = _tsyringe.container.resolve(_ShowProfileUseCase.ShowProfileUseCase);

    const user = await showProfile.execute({
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.ShowProfileController = ShowProfileController;