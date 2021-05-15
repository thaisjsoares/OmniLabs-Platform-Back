import FakeLoginLogRepository from '@modules/logs/repositories/fakes/FakeLoginLogRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserUseCase;
let fakeLoginLogRepository: FakeLoginLogRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeLoginLogRepository = new FakeLoginLogRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        authenticateUser = new AuthenticateUserUseCase(
            fakeUsersRepository,
            fakeHashProvider,
            fakeLoginLogRepository,
            fakeUserTokensRepository,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'john Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'jhondoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'jhondoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'john Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'jhondoe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
