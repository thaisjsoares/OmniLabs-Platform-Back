import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import Roles from '@modules/roles/infra/typeorm/entities/Roles';
import IRolesRepository from '@modules/roles/repositories/models/IRolesRepository';
import { getRepository, Repository } from 'typeorm';

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

    public async remove(role: Roles): Promise<Roles> {
        return this.ormRepository.remove(role);
    }
}

export default RolesRepository;
