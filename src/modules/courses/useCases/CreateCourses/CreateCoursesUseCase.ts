import Courses from '@modules/courses/infra/typeorm/entities/Courses';
import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCoursesUseCase {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, description }: IRequest): Promise<Courses> {
        const courseExists = await this.coursesRepository.findOneByName(name);

        if (courseExists) {
            throw new AppError('this course already exists');
        }

        const course = await this.coursesRepository.create({
            name,
            description,
        });

        await this.cacheProvider.invalidate('courses-list');

        return course;
    }
}

export { CreateCoursesUseCase };
