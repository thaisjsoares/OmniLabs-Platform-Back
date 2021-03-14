import {v4} from 'uuid'

import ICreateModuleDTO from '@modules/modules/dtos/ICreateModuleDTO';
import IModulesRepository from '../IModulesRepository';

import Modules from '@modules/modules/infra/typeorm/entities/Module';

class FakeModulesRepository implements IModulesRepository {
    private modules: Modules[] = [];

    public async findById(id: string): Promise<Modules | undefined> {
        const module = this.modules.find(module => module.id === id);

        return module;
    }

    public async create(data: ICreateModuleDTO): Promise<Modules> {
        const module = new Modules();

        Object.assign(module, { id: v4() }, data);

        this.modules.push(module);

        return module;
    }

    public async save(module: Modules): Promise<Modules> {
        const findIndex = this.modules.findIndex(
            findJourney => findJourney.id === module.id,
        );

        this.modules[findIndex] = module;

        return module;
    }

    public async findByJourney(journey_id: string): Promise<Modules[]> {
        const modules = this.modules.filter(module => module.journey_id === journey_id);

        return modules;
    }

    

}

export default FakeModulesRepository;
