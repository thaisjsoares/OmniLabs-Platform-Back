import UserRole from '@modules/users/infra/typeorm/entities/UserRole';
import IUserRoleRepository from '@modules/users/repositories/models/IUserRoleRepository';
import { getRepository, Repository } from 'typeorm';

class UserRoleRepository implements IUserRoleRepository {
    private ormRepository: Repository<UserRole>;

    constructor() {
        this.ormRepository = getRepository(UserRole);
    }

    public async findByUserId(user_id: string): Promise<UserRole | undefined> {
        const userRole = await this.ormRepository.findOne({
            where: {
                user_id,
            },
        });

        return userRole;
    }
}

export default UserRoleRepository;
