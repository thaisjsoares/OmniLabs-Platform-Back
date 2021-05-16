import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Journey from '../../entities/Journey';
import IJourneyRepository from '../../repositories/models/IJourneyRepository';

interface IRequest {
    name: string;
    description: string;
    course_id: string;
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
        name,
        description,
        course_id,
    }: IRequest): Promise<Journey> {
        const journeyExists = await this.journeyRepository.findByName(name);

        if (journeyExists) {
            throw new AppError('Journey Already booked');
        }

        const findCourse = await this.coursesRepository.findById(course_id);

        if (!findCourse) {
            throw new AppError('Not Possible to find Course');
        }

        const journey = await this.journeyRepository.create({
            name,
            description,
            course_id,
        });

        return journey;
    }
}

export default CreateJourneyService;
