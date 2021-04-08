import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Journey from '../../entities/Journey';
import IJourneyRepository from '../../repositories/models/IJourneyRepository';

/* eslint-disable camelcase */
interface IRequest {
    journey_id: string;
    imageName: string;
}

@injectable()
class UpdateJourneyImageService {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        journey_id,
        imageName,
    }: IRequest): Promise<Journey> {
        const journey = await this.journeyRepository.findById(journey_id);

        if (!journey) {
            throw new AppError('Not possible to find Journey', 401);
        }

        if (journey.image) {
            await this.storageProvider.deleteFile(journey.image);
        }

        const filename = await this.storageProvider.saveFile(imageName);

        journey.image = filename;
        await this.journeyRepository.save(journey);

        return journey;
    }
}

export default UpdateJourneyImageService;
