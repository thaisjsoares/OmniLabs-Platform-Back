import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserUseCase;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserUseCase(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'john Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user whith email from another', async () => {
        await createUser.execute({
            name: 'john Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        await expect(
            createUser.execute({
                name: 'john Doe',
                email: 'jhondoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
