import { injectable, inject } from 'tsyringe';

import Roles from '@modules/roles/entities/Roles';
import IRolesRepository from '../../repositories/models/IRolesRepository';

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
