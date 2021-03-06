import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IJourneyRepository from '../../repositories/models/IJourneyRepository';

interface IResponse {
    id: string;
    name: string;
    description: string;
    image: string;
    course_id: string;
    course_name: string;
    updated_at: Date;
    created_at: Date;
}

@injectable()
class ShowAllJourneys {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute(): Promise<IResponse[]> {
        const journeys = await this.journeyRepository.find();

        const filteredJourney = Promise.all(
            journeys.map(async j => {
                const course = await this.coursesRepository.findById(
                    j.course_id,
                );

                if (!course) {
                    throw new AppError('Not possible to find Course');
                }

                return {
                    ...j,
                    image_url: j.getAvatarUrl(),
                    course_name: course.name,
                };
            }),
        );

        return filteredJourney;
    }
}

export default ShowAllJourneys;
