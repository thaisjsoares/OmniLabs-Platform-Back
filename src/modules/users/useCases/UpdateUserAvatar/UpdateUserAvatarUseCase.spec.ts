import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeSotrageProvider';
import AppError from '@shared/errors/AppError';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarUseCase;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatar = new UpdateUserAvatarUseCase(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg', // não precisa existir
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFilename: 'avatar.jpg', // não precisa existir
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg', // não precisa existir
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg', // não precisa existir
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg', 'avatar');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
