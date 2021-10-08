import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeSotrageProvider';
import AppError from '@shared/errors/AppError';

import { UpdateCoursesImageUseCase } from './UpdateCoursesImageUseCase';

let fakeCoursesRepository: FakeCoursesRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;
let updateCourseImage: UpdateCoursesImageUseCase;

describe('UpdateCourseImage', () => {
    beforeEach(() => {
        fakeCoursesRepository = new FakeCoursesRepository();
        fakeStorageProvider = new FakeStorageProvider();
        fakeCacheProvider = new FakeCacheProvider();

        updateCourseImage = new UpdateCoursesImageUseCase(
            fakeCoursesRepository,
            fakeStorageProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new Course', async () => {
        const course = await fakeCoursesRepository.create({
            name: 'starter',
            description: 'iniciando na programacao',
        });

        await updateCourseImage.execute({
            course_id: course.id,
            imageFileName: 'image.png',
        });

        expect(course.image).toBe('image.png');
    });

    it('should not be able to update image from non existing course', async () => {
        await expect(
            updateCourseImage.execute({
                course_id: 'non-existing-course',
                imageFileName: 'image.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old image when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const course = await fakeCoursesRepository.create({
            name: 'starter',
            description: 'iniciando na programacao',
        });

        await updateCourseImage.execute({
            course_id: course.id,
            imageFileName: 'image.jpg',
        });

        await updateCourseImage.execute({
            course_id: course.id,
            imageFileName: 'image2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('image.jpg', 'courses_logo');
        expect(course.image).toBe('image2.jpg');
    });
});
