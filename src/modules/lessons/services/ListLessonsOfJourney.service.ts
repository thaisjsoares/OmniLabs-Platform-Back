import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns'
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';

import AppError from '@shared/errors/AppError';
import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';

interface IRequest {
    journey_name: string;
}

@injectable()
class ListLessonOfCourse {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute({ journey_name }: IRequest){
        const journey = await this.journeyRepository.findByName(journey_name)

        if(!journey) {
            throw new AppError('Not possible to find Journey')
        }

        const modules = await this.modulesRepository.findByJourney(journey.id);

        const modulesLessons = await Promise.all(
            modules.map(async (module) => {
                const lessons = await this.lessonsRepository.findByModule(module.id);
    
                const formatedLessons = lessons.map((lesson) => {
                    const minutes = Math.floor(lesson.duration/60)
                    const seconds = lesson.duration - minutes * 60
        
                    return {...lesson, duration: format(new Date(0, 0, 0, 0, minutes, seconds), `mm 'min', ss 's'`)}
                })
                
                return {
                    module: module,
                    lessons: formatedLessons
                };
            })
        )


        return modulesLessons;
    }
}

export default ListLessonOfCourse;
