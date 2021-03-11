import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';

interface IRequest {
    name: string;
    description: string;
    journey_id: string;
    duration: number;
    video_id: string;
    module_id?: string;
}
@injectable()
class CreateLessonService {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute({ name, description, journey_id, duration, video_id, module_id }: IRequest): Promise<Lesson> {
        const journey = await this.journeyRepository.findById(journey_id)

        if(!journey) {
            throw new AppError('Not possible to find Coruse')
        }

        const lesson = await this.lessonsRepository.create({
            name, 
            description, 
            journey_id: journey.id, 
            duration, 
            video_id,
            module_id
        });

        return lesson;
    }
}

export default CreateLessonService;
