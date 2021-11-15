import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Journey from '../../infra/typeorm/entities/Journey';
import IJourneyRepository from '../../repositories/models/IJourneyRepository';

@injectable()
class ShowJourneysOfCourseName {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute(course_name: string): Promise<Journey[]> {
        const course = await this.coursesRepository.findOneByName(course_name);

        if (!course) {
            throw new AppError('Not possible to find this course');
        }

        const journeys = await this.journeyRepository.findByCourseId(course.id);

        return journeys;
    }
}

export default ShowJourneysOfCourseName;
