import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lessons';
import ILessonHistoryRepository from '@modules/lessons/repositories/models/ILessonHistoryRepository';
import ILessonsRepository from '@modules/lessons/repositories/models/ILessonsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    course_id: string;
}

@injectable()
class ShowLessonsOfCourseUseCase {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('LessonHistoryRepository')
        private lessonHistoryRepository: ILessonHistoryRepository,
    ) {}

    public async execute({ course_id }: IRequest): Promise<Lesson> {
        const lesson = await this.lessonsRepository.findById(course_id);

        if (!lesson) {
            throw new AppError('Not possible to find lesson');
        }

        return lesson;
    }
}

export { ShowLessonsOfCourseUseCase };
