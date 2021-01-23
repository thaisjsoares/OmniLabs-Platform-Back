import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Courses from '../infra/typeorm/entities/Courses';
import ICoursesRepository from '../repositories/ICoursesRepository';

/* eslint-disable camelcase */
interface IRequest {
    course_id: string;
    imageFileName: string;
}

@injectable()
class UpdateCoursesImageService {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({ course_id, imageFileName }: IRequest): Promise<Courses | undefined> {
        const course = await this.coursesRepository.findById(course_id);

        if(!course) {
            throw new AppError('This courses does not exist');
        }

        if (course.image) {
            await this.storageProvider.deleteFile(course.image);
        }

        const filename = await this.storageProvider.saveFile(imageFileName);

        course.image = filename;
        await this.coursesRepository.save(course);

        return course;
    }
}

export default UpdateCoursesImageService;
