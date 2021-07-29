"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeUsersRepository"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _ShowProfileUseCase = require("./ShowProfileUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfile = new _ShowProfileUseCase.ShowProfileUseCase(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('should not be able to show the profile from non existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});