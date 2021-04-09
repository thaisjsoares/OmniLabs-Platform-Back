import FakeLoginLogRepository from '@modules/logs/repositories/fakes/FakeLoginLogRepository';
import FakeRolesRepository from '@modules/roles/repositories/fakes/FakeRolesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import ListLoginLogs from './ListLoginLogsUseCase';

let listLoginLogs: ListLoginLogs;
let authenticateUser: AuthenticateUserService;
let fakeLoginLogsRepository: FakeLoginLogRepository;

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('List Login Logs', () => {
    beforeEach(() => {
        fakeLoginLogsRepository = new FakeLoginLogRepository();

        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
            fakeLoginLogsRepository,
            fakeUserTokensRepository,
        );

        listLoginLogs = new ListLoginLogs(fakeLoginLogsRepository);
    });

    it('should be able to list login logs', async () => {
        const user = await fakeUsersRepository.create({
            name: 'john Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        await authenticateUser.execute({
            email: 'jhondoe@example.com',
            password: '123456',
        });

        const response = await listLoginLogs.execute({
            page: 1,
            limit: 5,
        });

        expect(response).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    content: 'User john Doe entered the application',
                }),
            ]),
        );
    });
});
