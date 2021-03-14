import { injectable, inject } from 'tsyringe';

import Module from '../infra/typeorm/entities/Module';
import IModulesRepository from '../repositories/IModulesRepository';
import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';
import AppError from '@shared/errors/AppError';

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

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository
    ) {}

    public async execute({ name, description, journey_id }: IRequest): Promise<Module> {
        const journey = await this.journeyRepository.findById(journey_id);

        if(!journey) {
            throw new AppError('Not possible to find journey')
        }

        const module = await this.modulesRepository.create({name, description, journey_id: journey.id});

        return module;
    }
}

export default CreateModuleService;
