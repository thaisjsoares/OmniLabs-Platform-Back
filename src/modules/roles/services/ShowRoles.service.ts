import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

import Roles from '../infra/typeorm/entities/Roles';

@injectable()
class ShowRoles {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute(): Promise<Roles[]> {
        const roles = await this.rolesRepository.findAll();

        return roles;
    }
}

export default ShowRoles;
