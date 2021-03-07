import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns'
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';

import AppError from '@shared/errors/AppError';

interface IRequest {
    course_name: string;
}

@injectable()
class ListLessonOfCourse {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,
    ) {}

    public async execute({ course_name }: IRequest){
        const lessons = await this.lessonsRepository.findLessonCourse(course_name);

        const formatedLessons = lessons.map((lesson) => {
            const minutes = Math.floor(lesson.duration/60)
            const seconds = lesson.duration - minutes * 60

            return {...lesson, duration: format(new Date(0, 0, 0, 0, minutes, seconds), `mm 'min', ss 's'`)}
        })

        return formatedLessons;
    }
}

export default ListLessonOfCourse;
