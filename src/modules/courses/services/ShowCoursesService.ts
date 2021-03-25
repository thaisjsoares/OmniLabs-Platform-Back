import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICoursesRepository from '../repositories/ICoursesRepository';

import Courses from '../infra/typeorm/entities/Courses';

@injectable()
class ShowCoursesService {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Courses[]> {
        const course = await this.coursesRepository.findAll();

        return course;
    }
}

export default ShowCoursesService;
