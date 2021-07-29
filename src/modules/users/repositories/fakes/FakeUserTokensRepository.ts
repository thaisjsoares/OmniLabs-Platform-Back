import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/models/IUserTokensRepository';
import { v4 } from 'uuid';

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeUserTokensRepository implements IUserTokensRepository {
    private userTokens: UserToken[] = [];

    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        throw new Error('Method not implemented.');
    }

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken> {
        throw new Error('Method not implemented.');
    }

    deleteById(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    findByRefreshToken(refresh_token: string): Promise<UserToken> {
        throw new Error('Method not implemented.');
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: v4(),
            token: v4(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.userTokens.find(
            findToken => findToken.refresh_token === token,
        );

        return userToken;
    }
}

export default FakeUserTokensRepository;
