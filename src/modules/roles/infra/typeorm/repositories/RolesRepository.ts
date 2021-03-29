import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';

import Roles from '../entities/Roles';

class RolesRepository implements IRolesRepository {
    private ormRepository: Repository<Roles>;

    constructor() {
        this.ormRepository = getRepository(Roles);
    }

    public async findByName(name: string): Promise<Roles | undefined> {
        const role = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return role;
    }

    public async findById(id: string): Promise<Roles | undefined> {
        const role = await this.ormRepository.findOne(id);

        return role;
    }

    public async create(roleData: ICreateRoleDTO): Promise<Roles> {
        const role = this.ormRepository.create(roleData);

        await this.ormRepository.save(role);

        return role;
    }

    public async save(role: Roles): Promise<Roles> {
        return this.ormRepository.save(role);
    }

    public async findAll(): Promise<Roles[]> {
        const roles = await this.ormRepository.find();

        return roles;
    }
}

export default RolesRepository;
