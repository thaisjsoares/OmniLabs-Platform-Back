import UserRole from '../../entities/UserRole';

export default interface IUsersRepository {
    findByUserId(user_id: string): Promise<UserRole | undefined>;
}
