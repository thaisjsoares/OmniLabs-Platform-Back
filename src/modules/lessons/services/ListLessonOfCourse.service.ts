import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns'
import ILessonsRepository from '../repositories/ILessonsRepository';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';

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

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository 
    ) {}

    public async execute({ course_name }: IRequest){
        const course = await this.coursesRepository.findOneByName(course_name)


        if(!course) {
            throw new AppError('Not possible to find course')
        }

        const lessons = await this.lessonsRepository.findLessonCourse(course.id);


        const formatedLessons = lessons.map((lesson) => {
            const minutes = Math.floor(lesson.duration/60)
            const seconds = lesson.duration - minutes * 60

            return {...lesson, duration: format(new Date(0, 0, 0, 0, minutes, seconds), `mm 'min', ss 's'`)}
        })

        return formatedLessons;
    }
}

export default ListLessonOfCourse;
