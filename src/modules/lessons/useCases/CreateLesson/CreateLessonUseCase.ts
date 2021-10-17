import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lessons';
import ILessonsRepository from '@modules/lessons/repositories/models/ILessonsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    type: 'link' | 'video' | 'material';
    group_id: string;
    title: string;
    duration: number;
    description: string;
    resource?: string;
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
    ) {}

    public async execute({
        type,
        group_id,
        title,
        duration,
        description,
        resource,
        platform,
        name,
        link,
    }: IRequest): Promise<Lesson> {
        const group = await this.groupsRepository.findById(group_id);

        if (!group) {
            throw new AppError('Not possible to find a Module');
        }

        const findLessonTitle = await this.lessonsRepository.findByTitle(title);

        const findLessonName = await this.lessonsRepository.findByName(name);

        if (findLessonName || findLessonTitle) {
            throw new AppError('This lesson already exists');
        }

        const lesson = await this.lessonsRepository.create({
            type,
            group_id,
            title,
            duration,
            description,
            resource,
            platform,
            name,
            link,
        });

        return lesson;
    }
}

export { CreateLessonUseCase };
