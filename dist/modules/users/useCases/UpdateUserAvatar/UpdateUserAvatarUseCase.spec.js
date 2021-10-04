"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../repositories/fakes/FakeUsersRepository"));

var _FakeSotrageProvider = _interopRequireDefault(require("../../../../shared/container/providers/StorageProvider/fakes/FakeSotrageProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeStorageProvider;
let updateUserAvatar;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeStorageProvider = new _FakeSotrageProvider.default();
    updateUserAvatar = new _UpdateUserAvatarUseCase.UpdateUserAvatarUseCase(fakeUsersRepository, fakeStorageProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg' // não precisa existir

    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg' // não precisa existir

    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg' // não precisa existir

    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg' // não precisa existir

    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});