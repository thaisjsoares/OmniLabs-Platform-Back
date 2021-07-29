import { IUserResponseDTO } from '@modules/users/dtos/IUserResponseDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { UserMap } from '@modules/users/mapper/UserMap';
import IUsersRepository from '@modules/users/repositories/models/IUsersRepository';
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';

/* eslint-disable camelcase */
interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        return UserMap.toDTO(user);
    }
}

export { ShowProfileUseCase };
