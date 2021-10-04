"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteGroupController = void 0;

var _DeleteGroupUseCase = require("./DeleteGroupUseCase");

var _tsyringe = require("tsyringe");

class DeleteGroupController {
  async handle(request, response) {
    const {
      group_id
    } = request.params;

    const deleteGroup = _tsyringe.container.resolve(_DeleteGroupUseCase.DeleteGroupUseCase);

    const group = await deleteGroup.execute({
      group_id
    });
    return response.json(group);
  }

}

exports.DeleteGroupController = DeleteGroupController;