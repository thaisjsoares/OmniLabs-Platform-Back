import { getRepository, Repository } from 'typeorm';

import Module from '../entities/Module';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ICreateModuleDTO from '@modules/modules/dtos/ICreateModuleDTO';

class ModulesRepository implements IModulesRepository {
    private ormRepository: Repository<Module>;

    constructor() {
        this.ormRepository = getRepository(Module);
    }

    public async findById(id: string): Promise<Module | undefined> {
        const module = await this.ormRepository.findOne(id);

        return module;
    }

    public async create(data: ICreateModuleDTO): Promise<Module> {
        const module = await this.ormRepository.create(data);

        await this.ormRepository.save(module);

        return module;
    }

    public async save(module: Module): Promise<Module> {
        return this.ormRepository.save(module);
    }

}

export default ModulesRepository;
