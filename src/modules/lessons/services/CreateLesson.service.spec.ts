import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository';
import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository';
import AppError from '../../../shared/errors/AppError';
import CreateLessonService from './CreateLesson.service';
import FakeLessonHistoryRepository from '../repositories/fakes/FakeLessonHistoryRepository';

let createLesson: CreateLessonService;
let fakeLessonsRepository: FakeLessonsRepository;
let fakeGroupsRepository: FakeGroupsRepository;
let fakeLessonHistoryRepository: FakeLessonHistoryRepository;

describe('Create Lesson', () => {
    beforeEach(() => {
        fakeLessonsRepository = new FakeLessonsRepository();
        fakeGroupsRepository = new FakeGroupsRepository();
        fakeLessonHistoryRepository = new FakeLessonHistoryRepository();

        createLesson = new CreateLessonService(
            fakeLessonsRepository,
            fakeGroupsRepository,
            fakeLessonHistoryRepository,
        );
    });

    it('should be able to create lesson', async () => {
        const group = await fakeGroupsRepository.create({
            name: 'Iniciando no Nodejs',
            description: 'módulo iniciação em node',
            journey_id: 'journey_id',
        });

        const lesson = await createLesson.execute({
            type: 'video',
            title: 'Video VsCode',
            name: 'vide-vs-code',
            resource: '12314124',
            released_at: '2020/01/20',
            platform: 'vimeo',
            description: 'desc',
            duration: 12000,
            group_id: group.id,
        });

        expect(lesson).toHaveProperty('id');
    });

    it('should not be able to create lesson if group non exists', async () => {
        await expect(
            createLesson.execute({
                type: 'video',
                title: 'Video VsCode',
                name: 'vide-vs-code',
                resource: '12314124',
                released_at: '2020/01/20',
                platform: 'vimeo',
                description: 'desc',
                duration: 12000,
                group_id: '8345bb5c-6c67-4a6a-9f3d-40bcd45b4104',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create lesson if lesson name or title already exists', async () => {
        const group = await fakeGroupsRepository.create({
            name: 'Iniciando no Nodejs',
            description: 'módulo iniciação em node',
            journey_id: 'journey_id',
        });

        await createLesson.execute({
            type: 'video',
            title: 'Video VsCode',
            name: 'vide-vs-code',
            resource: '12314124',
            released_at: '2020/01/20',
            platform: 'vimeo',
            description: 'desc',
            duration: 12000,
            group_id: group.id,
        });

        await expect(
            createLesson.execute({
                type: 'video',
                title: 'Video VsCode',
                name: 'vide-vs-code',
                resource: '12314124',
                released_at: '2020/01/20',
                platform: 'vimeo',
                description: 'desc',
                duration: 12000,
                group_id: group.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
