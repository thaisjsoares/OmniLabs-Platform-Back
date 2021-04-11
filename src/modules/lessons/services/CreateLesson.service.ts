import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import { format, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Lesson_History from '../infra/typeorm/entities/Lesson_History';
import ILessonHistoryRepository from '../repositories/ILessonHistoryRepository';
import ILessonsRepository from '../repositories/ILessonsRepository';

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
class CreateLessonService {
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
        const date = released_at;

        console.log(date);

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
            released_at: new Date(date),
            platform,
            name,
            link,
        });

        return lessonHistory;
    }
}

export default CreateLessonService;
