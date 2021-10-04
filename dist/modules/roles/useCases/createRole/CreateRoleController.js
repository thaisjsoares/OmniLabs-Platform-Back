"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateRoleUseCase = _interopRequireDefault(require("./CreateRoleUseCase"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RolesController {
  async handle(request, response) {
    try {
      const {
        name
      } = request.body;

      const createRole = _tsyringe.container.resolve(_CreateRoleUseCase.default);

      const role = await createRole.execute({
        name
      });
      return response.status(201).json(role);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

var _default = RolesController;
exports.default = _default;