"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateGroupController = void 0;

var _CreateGroupUseCase = require("./CreateGroupUseCase");

var _tsyringe = require("tsyringe");

class CreateGroupController {
  async handle(request, response) {
    const {
      name,
      description,
      journey_id
    } = request.body;

    const createGroup = _tsyringe.container.resolve(_CreateGroupUseCase.CreateGroupUseCase);

    const group = await createGroup.execute({
      name,
      description,
      journey_id
    });
    return response.json(group);
  }

}

exports.CreateGroupController = CreateGroupController;