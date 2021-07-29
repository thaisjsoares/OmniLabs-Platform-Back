import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Journey from '../../infra/typeorm/entities/Journey';
import IJourneyRepository from '../../repositories/models/IJourneyRepository';

interface IRequest {
    journey_id: string;
    course_id?: string;
    name: string;
    description: string;
}

@injectable()
class CreateJourneyService {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute({
        journey_id,
        description,
        name,
        course_id,
    }: IRequest): Promise<Journey> {
        const journey = await this.journeyRepository.findById(journey_id);

        if (!journey) {
            throw new AppError('Not possible to find Journey');
        }

        if (course_id) {
            const course = await this.coursesRepository.findById(course_id);

            if (!course) {
                throw new AppError('Not possible to find Course');
            }

            journey.course_id = course_id;
        }

        journey.name = name;
        journey.description = description;

        await this.journeyRepository.save(journey);

        return journey;
    }
}

export default CreateJourneyService;
