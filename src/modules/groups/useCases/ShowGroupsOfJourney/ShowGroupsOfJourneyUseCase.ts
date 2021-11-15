import Groups from '@modules/groups/infra/typeorm/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    journey_id: string;
}

@injectable()
class ShowGroupsOfJourneyUseCase {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute({ journey_id }: IRequest): Promise<Groups[]> {
        const journey = await this.journeyRepository.findById(journey_id);

        if (!journey) {
            throw new AppError('Not possible to find journey');
        }

        const groups = await this.groupsRepository.findByJourney(journey.id);

        return groups;
    }
}

export { ShowGroupsOfJourneyUseCase };
