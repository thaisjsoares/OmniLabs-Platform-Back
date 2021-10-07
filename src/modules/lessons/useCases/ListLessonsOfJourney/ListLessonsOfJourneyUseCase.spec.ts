import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository';
import FakeLessonHistoryRepository from '@modules/lessons/repositories/fakes/FakeLessonHistoryRepository';
import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository';

import AppError from '@shared/errors/AppError';

import { CreateLessonUseCase } from '../CreateLesson/CreateLessonUseCase';
import { ListLessonOfCourseUseCase } from './ListLessonsOfJourneyUseCase';

let fakeLessonHistoryRepository: FakeLessonHistoryRepository;
let fakeLessonsRepository: FakeLessonsRepository;
let fakeJourneyRepository: FakeJourneyRepository;
let fakeGroupsRepository: FakeGroupsRepository;

let listLessonsOfJourney: ListLessonOfCourseUseCase;
let createLesson: CreateLessonUseCase;

describe('List Lessons of Journey', () => {
    beforeEach(() => {
        fakeLessonHistoryRepository = new FakeLessonHistoryRepository();
        fakeJourneyRepository = new FakeJourneyRepository();
        fakeGroupsRepository = new FakeGroupsRepository();
        fakeLessonsRepository = new FakeLessonsRepository();

        listLessonsOfJourney = new ListLessonOfCourseUseCase(
            fakeLessonHistoryRepository,
            fakeGroupsRepository,
            fakeJourneyRepository,
        );

        createLesson = new CreateLessonUseCase(
            fakeLessonsRepository,
            fakeGroupsRepository,
            fakeLessonHistoryRepository,
        );
    });

    it('should be able to list lessons of journey', async () => {
        const journey = await fakeJourneyRepository.create({
            name: 'Nodejs',
            description: 'Back-End',
            course_id: 'course_id',
        });

        const group1 = await fakeGroupsRepository.create({
            name: 'nodeJs module 1',
            description: 'múdulo sobre node',
            journey_id: journey.id,
        });

        const lesson = await createLesson.execute({
            type: 'video',
            title: 'Video VsCode',
            name: 'vide-vs-code',
            resource: '12314124',
            released_at: '3000/01/20',
            platform: 'vimeo',
            description: 'desc',
            duration: 12000,
            group_id: group1.id,
        });

        const lesson2 = await createLesson.execute({
            type: 'video',
            title: 'Video reactjs',
            name: 'vide-react-js',
            resource: '12314124',
            released_at: '3000/01/20',
            platform: 'vimeo',
            description: 'desc',
            duration: 12000,
            group_id: group1.id,
        });

        const listLessons = await listLessonsOfJourney.execute({
            journey_name: 'Nodejs',
        });

        expect(listLessons).toEqual([
            {
                group: group1,
                lessons: [
                    {
                        id: lesson.id,
                        lesson_id: lesson.lesson_id,
                        link: lesson.link,
                        title: 'Video VsCode',
                        name: 'vide-vs-code',
                        resource: '12314124',
                        released_at: new Date('3000/01/20'),
                        platform: 'vimeo',
                        description: 'desc',
                        duration: '20 min, 00 s',
                        group_id: group1.id,
                    },
                    {
                        id: lesson2.id,
                        lesson_id: lesson2.lesson_id,
                        link: lesson2.link,
                        title: 'Video reactjs',
                        name: 'vide-react-js',
                        resource: '12314124',
                        released_at: new Date('3000/01/20'),
                        platform: 'vimeo',
                        description: 'desc',
                        duration: '20 min, 00 s',
                        group_id: group1.id,
                    },
                ],
            },
        ]);
    });

    it('should not be able to find journey if jouney_name non exists', async () => {
        await expect(
            listLessonsOfJourney.execute({
                journey_name: 'Nodejs',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
