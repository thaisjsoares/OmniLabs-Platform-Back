import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Groups from '../infra/typeorm/entities/Groups';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequest {
    name: string;
    description: string;
    journey_id: string;
}

@injectable()
class CreateGroupService {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute({
        name,
        description,
        journey_id,
    }: IRequest): Promise<Groups> {
        const journey = await this.journeyRepository.findById(journey_id);

        if (!journey) {
            throw new AppError('Not possible to find journey');
        }

        const group = await this.groupsRepository.create({
            name,
            description,
            journey_id: journey.id,
        });

        return group;
    }
}

export default CreateGroupService;
