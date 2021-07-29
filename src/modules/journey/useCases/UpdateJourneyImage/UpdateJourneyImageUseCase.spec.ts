import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeSotrageProvider';
import AppError from '@shared/errors/AppError';

import UpdateJourneyImage from './UpdateJourneyImageUseCase';

let fakeJourneyRepository: FakeJourneyRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateJourneyImage: UpdateJourneyImage;

describe('Update Journey image', () => {
    beforeEach(() => {
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateJourneyImage = new UpdateJourneyImage(
            fakeJourneyRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to create a new Journey image', async () => {
        const journey = await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Back-end',
            course_id: 'asd',
        });

        await updateJourneyImage.execute({
            journey_id: journey.id,
            imageName: 'avatar.jpg',
        });

        expect(journey.image).toBe('avatar.jpg');
    });

    it('should not be able to update journey image from non existing journey', async () => {
        await expect(
            updateJourneyImage.execute({
                journey_id: 'non-existing-journey-id',
                imageName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old image when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const journey = await fakeJourneyRepository.create({
            name: 'NodeJs',
            description: 'Back-end',
            course_id: 'asd',
        });

        await updateJourneyImage.execute({
            journey_id: journey.id,
            imageName: 'avatar.jpg',
        });

        await updateJourneyImage.execute({
            journey_id: journey.id,
            imageName: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(journey.image).toBe('avatar2.jpg');
    });
});
