import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import Lesson_History from '@modules/lessons/entities/Lesson_History';
import ILessonHistoryRepository from '@modules/lessons/repositories/models/ILessonHistoryRepository';
import ILessonsRepository from '@modules/lessons/repositories/models/ILessonsRepository';
import { isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    type: 'link' | 'video' | 'material';
    group_id: string;
    title: string;
    duration: number;
    description: string;
    resource?: string;
    released_at: string;
    platform: string;
    name: string;
    link?: string;
}
@injectable()
class CreateLessonUseCase {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('LessonHistoryRepository')
        private lessonHistoryRepository: ILessonHistoryRepository,
    ) {}

    public async execute({
        type,
        group_id,
        title,
        duration,
        description,
        resource,
        released_at,
        platform,
        name,
        link,
    }: IRequest): Promise<Lesson_History> {
        const formatedDate = startOfHour(new Date(released_at));

        if (isBefore(formatedDate, Date.now())) {
            throw new AppError("You can't create an lesson on a past date.");
        }

        const group = await this.groupsRepository.findById(group_id);

        if (!group) {
            throw new AppError('Not possible to find a Module');
        }

        const findLessonTitle = await this.lessonHistoryRepository.findByTitle(
            title,
        );

        const findLessonName = await this.lessonHistoryRepository.findByName(
            name,
        );

        if (findLessonName || findLessonTitle) {
            throw new AppError('This lesson already exists');
        }

        const lesson = await this.lessonsRepository.create({
            type,
        });

        const lessonHistory = await this.lessonHistoryRepository.create({
            lesson_id: lesson.id,
            group_id,
            title,
            duration,
            description,
            resource,
            released_at: formatedDate,
            platform,
            name,
            link,
        });

        return lessonHistory;
    }
}

export { CreateLessonUseCase };
