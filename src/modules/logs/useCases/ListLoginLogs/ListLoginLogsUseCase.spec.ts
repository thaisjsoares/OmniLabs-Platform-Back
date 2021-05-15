import FakeLoginLogRepository from '@modules/logs/repositories/fakes/FakeLoginLogRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import { AuthenticateUserUseCase } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserUseCase';

import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';

import ListLoginLogs from './ListLoginLogsUseCase';

let listLoginLogs: ListLoginLogs;
let authenticateUser: AuthenticateUserUseCase;
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

        authenticateUser = new AuthenticateUserUseCase(
            fakeUsersRepository,
            fakeHashProvider,
            fakeLoginLogsRepository,
            fakeUserTokensRepository,
        );

        listLoginLogs = new ListLoginLogs(fakeLoginLogsRepository);
    });

    it('should be able to list login logs', async () => {
        await fakeUsersRepository.create({
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
