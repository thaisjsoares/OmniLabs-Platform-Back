import { injectable, inject } from 'tsyringe';

import Journey from '../infra/typeorm/entities/Journey';
import IJourneyRepository from '../repositories/IJourneyRepository';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
    course_id: string;
    technology: string;
}

@injectable()
class CreateJourneyService {
    constructor(
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository
    ) {}

    public async execute({ name, description, course_id, technology }: IRequest): Promise<Journey> {
        const journey = await this.journeyRepository.findByName(name);

        if(journey) {
            throw new AppError('Journey Already booked')
        }

        const findCourse = await this.coursesRepository.findById(course_id);

        if(!findCourse) {
            throw new AppError('Not Possible to find Course')
        }

        const module = await this.journeyRepository.create({name, description, course_id, technology});

        return module;
    }
}

export default CreateJourneyService;
