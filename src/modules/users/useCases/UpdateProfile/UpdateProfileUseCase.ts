import User from '@modules/users/entities/User';
import IUsersRepository from '@modules/users/repositories/models/IUsersRepository';
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

/* eslint-disable camelcase */
interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(
            email,
        );

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError('E-mail already in use.');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError(
                'You need to inform the old password to set a new password.',
            );
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export { UpdateProfileUseCase };
