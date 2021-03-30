import { getRepository, Repository } from 'typeorm';

import IUserRoleRepository from '@modules/users/repositories/IUserRoleRepository';

import UserRole from '../entities/UserRole';

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
