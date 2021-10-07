import UserRole from '@modules/users/infra/typeorm/entities/UserRole';

export default interface IUsersRepository {
    findByUserId(user_id: string): Promise<UserRole | undefined>;
}
