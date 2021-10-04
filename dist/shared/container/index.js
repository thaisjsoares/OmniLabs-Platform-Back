"use strict";

require("./providers");

var _CoursesRepository = _interopRequireDefault(require("../../modules/courses/infra/typeorm/repositories/CoursesRepository"));

var _GroupsRepository = _interopRequireDefault(require("../../modules/groups/infra/typeorm/repositories/GroupsRepository"));

var _JourneyRepository = _interopRequireDefault(require("../../modules/journey/infra/typeorm/repositories/JourneyRepository"));

var _LessonHistoryRepository = _interopRequireDefault(require("../../modules/lessons/infra/typeorm/repositories/LessonHistoryRepository"));

var _LessonsRepository = _interopRequireDefault(require("../../modules/lessons/infra/typeorm/repositories/LessonsRepository"));

var _RolesRepository = _interopRequireDefault(require("../../modules/roles/infra/typeorm/repositories/RolesRepository"));

var _UserRoleRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserRoleRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('CoursesRepository', _CoursesRepository.default);

_tsyringe.container.registerSingleton('LessonsRepository', _LessonsRepository.default);

_tsyringe.container.registerSingleton('LessonHistoryRepository', _LessonHistoryRepository.default);

_tsyringe.container.registerSingleton('GroupsRepository', _GroupsRepository.default);

_tsyringe.container.registerSingleton('JourneyRepository', _JourneyRepository.default);

_tsyringe.container.registerSingleton('RolesRepository', _RolesRepository.default);

_tsyringe.container.registerSingleton('UserRoleRepository', _UserRoleRepository.default);