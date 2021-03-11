import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IJourneyRepository from '../repositories/IJourneyRepository';

import Journey from '../infra/typeorm/entities/Journey';

@injectable()
class ShowJourneysService {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute(course_id: string): Promise<Journey[]> {
        const journeys = await this.journeyRepository.findByCourseId(course_id);

        if(!journeys) {
            throw new AppError('Impossible to find Journeys');
        }

        return journeys;
    }
}

export default ShowJourneysService;
