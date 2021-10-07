import IRolesRepository from '@modules/roles/repositories/models/IRolesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    role_id: string;
}

@injectable()
class DeleteRole {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute({ role_id }: IRequest): Promise<void> {
        const role = await this.rolesRepository.findById(role_id);

        if (!role) {
            throw new AppError('Not possible to find Role');
        }

        await this.rolesRepository.remove(role);
    }
}

export default DeleteRole;
