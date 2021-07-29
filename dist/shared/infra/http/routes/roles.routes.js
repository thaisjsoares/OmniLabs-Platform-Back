"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateRoleController = _interopRequireDefault(require("../../../../modules/roles/useCases/createRole/CreateRoleController"));

var _DeleteRoleController = _interopRequireDefault(require("../../../../modules/roles/useCases/deleteRole/DeleteRoleController"));

var _ShowRolesController = _interopRequireDefault(require("../../../../modules/roles/useCases/showRoles/ShowRolesController"));

var _express = require("express");

var _ensureAdmin = _interopRequireDefault(require("../middlewares/ensureAdmin"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rolesRouter = (0, _express.Router)();
rolesRouter.use(_ensureAuthenticated.default);
const createRolesController = new _CreateRoleController.default();
const showRolesController = new _ShowRolesController.default();
const deleteRoleController = new _DeleteRoleController.default();
rolesRouter.post('/', _ensureAdmin.default, createRolesController.handle);
rolesRouter.get('/', showRolesController.handle);
rolesRouter.delete('/:role_id', _ensureAdmin.default, deleteRoleController.handle);
var _default = rolesRouter;
exports.default = _default;