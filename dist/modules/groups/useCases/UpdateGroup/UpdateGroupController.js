"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateGroupController = void 0;

var _UpdateGroupUseCase = require("./UpdateGroupUseCase");

var _tsyringe = require("tsyringe");

class UpdateGroupController {
  async handle(request, response) {
    const {
      group_id
    } = request.params;
    const {
      name,
      description,
      journey_id
    } = request.body;

    const updateGroup = _tsyringe.container.resolve(_UpdateGroupUseCase.UpdateGroupUseCase);

    const group = await updateGroup.execute({
      group_id,
      name,
      description,
      journey_id
    });
    return response.json(group);
  }

}

exports.UpdateGroupController = UpdateGroupController;