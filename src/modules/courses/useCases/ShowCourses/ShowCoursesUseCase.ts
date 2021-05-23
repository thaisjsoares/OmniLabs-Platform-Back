import Courses from '@modules/courses/entities/Courses';
import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    page: number;
    limit: number;
}

@injectable()
class ShowCoursesUseCase {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ limit, page }: IRequest): Promise<Courses[]> {
        const course = await this.coursesRepository.findAll(page, limit);

        return course;
    }
}

export { ShowCoursesUseCase };
