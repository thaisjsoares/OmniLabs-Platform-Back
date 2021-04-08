import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import { format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILessonHistoryRepository from '../repositories/ILessonHistoryRepository';

interface IRequest {
    journey_name: string;
}

interface IResponse {
    group: {
        id: string;
        name: string;
        description: string;
        journey_id: string;
    };
    lessons: {
        id: string;
        lesson_id: string;
        link?: string;
        title: string;
        name: string;
        resource?: string;
        released_at: Date;
        platform: string;
        description: string;
        duration: string;
        group_id: string;
    }[];
}

@injectable()
class ListLessonOfCourse {
    constructor(
        @inject('LessonHistoryRepository')
        private lessonHistoryRepository: ILessonHistoryRepository,

        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository,
    ) {}

    public async execute({ journey_name }: IRequest): Promise<IResponse[]> {
        const journey = await this.journeyRepository.findByName(journey_name);

        if (!journey) {
            throw new AppError('Not possible to find Journey');
        }

        const groups = await this.groupsRepository.findByJourney(journey.id);

        const groupsLessons = await Promise.all(
            groups.map(async group => {
                const lessons = await this.lessonHistoryRepository.findByGroup(
                    group.id,
                );

                const formatedLessons = lessons.map(lesson => {
                    const minutes = Math.floor(lesson.duration / 60);
                    const seconds = lesson.duration - minutes * 60;

                    return {
                        ...lesson,
                        duration: format(
                            new Date(0, 0, 0, 0, minutes, seconds),
                            "mm 'min', ss 's'",
                        ),
                    };
                });

                return {
                    group,
                    lessons: formatedLessons,
                };
            }),
        );

        return groupsLessons;
    }
}

export default ListLessonOfCourse;
