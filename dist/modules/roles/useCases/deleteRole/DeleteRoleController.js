"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeleteRoleUseCase = _interopRequireDefault(require("./DeleteRoleUseCase"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RolesController {
  async handle(request, response) {
    const {
      role_id
    } = request.params;

    const removeRole = _tsyringe.container.resolve(_DeleteRoleUseCase.default);

    const role = await removeRole.execute({
      role_id
    });
    return response.json(role);
  }

}

var _default = RolesController;
exports.default = _default;