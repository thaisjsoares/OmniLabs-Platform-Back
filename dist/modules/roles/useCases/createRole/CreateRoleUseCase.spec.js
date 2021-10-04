"use strict";

var _FakeRolesRepository = _interopRequireDefault(require("../../repositories/fakes/FakeRolesRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _CreateRoleUseCase = _interopRequireDefault(require("./CreateRoleUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRole;
let fakeRolesRepository;
describe('Create Role', () => {
  beforeEach(() => {
    fakeRolesRepository = new _FakeRolesRepository.default();
    createRole = new _CreateRoleUseCase.default(fakeRolesRepository);
  });
  it('should be able to create a role', async () => {
    expect(await createRole.execute({
      name: 'Admin'
    })).toHaveProperty('id');
  });
  it('should not be able to create role if name of role already exists', async () => {
    await createRole.execute({
      name: 'Admin'
    });
    await expect(createRole.execute({
      name: 'Admin'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});