import IUsersRepository from '@modules/users/repositories/models/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/models/IUserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export { ResetPasswordUseCase };

// Hash
// 2h expiração
// userToken inexistente
// user inexistente
