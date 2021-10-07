import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/models/IUserTokensRepository';
import { getRepository, Repository } from 'typeorm';

class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken> {
        const usersTokens = await this.ormRepository.findOne({
            user_id,
            refresh_token,
        });
        return usersTokens;
    }

    async deleteById(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.ormRepository.findOne({ refresh_token });

        return userToken;
    }
}

export default UserTokensRepository;
