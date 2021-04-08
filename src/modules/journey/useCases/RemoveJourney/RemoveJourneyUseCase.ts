import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Journey from '../../entities/Journey';
import IJourneyRepository from '../../repositories/models/IJourneyRepository';

@injectable()
class RemoveJourneyService {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute(journey_id: string): Promise<Journey> {
        const journey = await this.journeyRepository.findById(journey_id);

        if (!journey) {
            throw new AppError('Not possible to find Journey');
        }

        await this.journeyRepository.remove(journey);

        return journey;
    }
}

export default RemoveJourneyService;
