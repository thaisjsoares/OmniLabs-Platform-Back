import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICoursesRepository from '../repositories/ICoursesRepository';

import Courses from '../infra/typeorm/entities/Courses';

interface IRequest {
    page: number;
    limit: number;
}

@injectable()
class ShowCoursesService {
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

export default ShowCoursesService;
