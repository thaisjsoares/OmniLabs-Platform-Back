import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Journey from '../../infra/typeorm/entities/Journey';
import IJourneyRepository from '../../repositories/models/IJourneyRepository';

@injectable()
class ShowJourneysService {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute(course_id: string): Promise<Journey[]> {
        const journeys = await this.journeyRepository.findByCourseId(course_id);

        return journeys;
    }
}

export default ShowJourneysService;
