"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowGroupsController = void 0;

var _ShowGroupsUseCase = require("./ShowGroupsUseCase");

var _tsyringe = require("tsyringe");

class ShowGroupsController {
  async handle(request, response) {
    const showGroups = _tsyringe.container.resolve(_ShowGroupsUseCase.ShowGroupsUseCase);

    const gruops = await showGroups.execute();
    return response.json(gruops);
  }

}

exports.ShowGroupsController = ShowGroupsController;