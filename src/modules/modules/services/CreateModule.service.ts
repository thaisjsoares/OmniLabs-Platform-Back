import { injectable, inject } from 'tsyringe';

import Module from '../infra/typeorm/entities/Module';
import IModulesRepository from '../repositories/IModulesRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateModuleService {
    constructor(
        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,
    ) {}

    public async execute({ name, description }: IRequest): Promise<Module> {
        const module = await this.modulesRepository.create({name, description});

        return module;
    }
}

export default CreateModuleService;
