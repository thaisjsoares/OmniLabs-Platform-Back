import Groups from '@modules/groups/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
    journey_id: string;
}

@injectable()
class CreateGroupUseCase {
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

export { CreateGroupUseCase };
