import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import UserTokens from '@modules/users/infra/typeorm/entities/UserToken';

interface IUsersTokensRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserTokens>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserTokens>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}

export default IUsersTokensRepository;
