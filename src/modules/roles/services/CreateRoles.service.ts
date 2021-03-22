import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

import Roles from '../infra/typeorm/entities/Roles';

interface IRequest {
    name: string;
}

@injectable()
class CreateRolesService {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: IRolesRepository,
    ) {}

    public async execute({ name }: IRequest): Promise<Roles> {
        const alreadyExistentRole = await this.rolesRepository.findByName(name);

        if (alreadyExistentRole) {
            throw new AppError('This role already created');
        }

        const role = await this.rolesRepository.create({
            name,
        });

        return role;
    }
}

export default CreateRolesService;
