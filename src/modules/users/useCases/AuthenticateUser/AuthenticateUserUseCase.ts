import authConfig from '@config/auth';
import ILoginLogRepository from '@modules/logs/repositories/models/ILoginLogRepository';
import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/models/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/models/IUserTokensRepository';
import format from 'date-fns/format';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('LoginLogRepository')
        private loginLogRepository: ILoginLogRepository,

        @inject('UserTokensRepository')
        private userTokensRepositoru: IUserTokensRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        await this.userTokensRepositoru.generate(user.id);

        await this.loginLogRepository.create({
            content: `User ${user.name} entered the application`,
            login_at: `${format(new Date(), "dd-MM-yyyy 'at' HH:mm'h'")}`,
            user_id: user.id,
        });

        return {
            user,
            token,
        };
    }
}

export { AuthenticateUserUseCase };
