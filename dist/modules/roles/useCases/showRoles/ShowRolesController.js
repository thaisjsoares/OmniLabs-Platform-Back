"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowRolesUseCase = _interopRequireDefault(require("./ShowRolesUseCase"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RolesController {
  async handle(request, response) {
    try {
      const showRoles = _tsyringe.container.resolve(_ShowRolesUseCase.default);

      const role = await showRoles.execute();
      return response.status(200).json(role);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

var _default = RolesController;
exports.default = _default;