"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _CreateUserUseCase = require("./CreateUserUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.CreateUserController = CreateUserController;