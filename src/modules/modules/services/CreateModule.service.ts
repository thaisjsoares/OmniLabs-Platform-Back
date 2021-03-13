import { injectable, inject } from 'tsyringe';

import Module from '../infra/typeorm/entities/Module';
import IModulesRepository from '../repositories/IModulesRepository';

interface IRequest {
    name: string;
    description: string;
    journey_id: string;
}

@injectable()
class CreateModuleService {
    constructor(
        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,
    ) {}

    public async execute({ name, description, journey_id }: IRequest): Promise<Module> {
        const module = await this.modulesRepository.create({name, description, journey_id});

        return module;
    }
}

export default CreateModuleService;
