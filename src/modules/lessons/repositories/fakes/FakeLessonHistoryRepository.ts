/* eslint-disable no-shadow */
import ICreateLessonHistoryDTO from '@modules/lessons/dtos/ICreateLessonHistoryDTO';
import Lesson_History from '@modules/lessons/entities/Lesson_History';
import { v4 } from 'uuid';

import ILessonHistoryRepository from '../models/ILessonHistoryRepository';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeLessonHistoryRepository implements ILessonHistoryRepository {
    private lessons: Lesson_History[] = [];

    public async findByGroup(group_id: string): Promise<Lesson_History[]> {
        const lesson = this.lessons.filter(
            lesson => lesson.group_id === group_id,
        );

        return lesson;
    }

    public async findByTitle(
        title: string,
    ): Promise<Lesson_History | undefined> {
        const lesson = this.lessons.find(lesson => lesson.title === title);

        return lesson;
    }

    public async findByName(name: string): Promise<Lesson_History | undefined> {
        const lesson = this.lessons.find(lesson => lesson.name === name);

        return lesson;
    }

    public async findById(id: string): Promise<Lesson_History | undefined> {
        const lesson = this.lessons.find(lesson => lesson.id === id);

        return lesson;
    }

    public async create(
        data: ICreateLessonHistoryDTO,
    ): Promise<Lesson_History> {
        const lesson = new Lesson_History();

        Object.assign(lesson, { id: v4() }, data);

        this.lessons.push(lesson);

        return lesson;
    }

    public async save(lesson: Lesson_History): Promise<Lesson_History> {
        const findIndex = this.lessons.findIndex(
            findJourney => findJourney.id === lesson.id,
        );

        this.lessons[findIndex] = lesson;

        return lesson;
    }

    public async remove(lesson: Lesson_History): Promise<void> {
        const findedIndex = this.lessons.findIndex(
            lessons => lessons.id === lesson.id,
        );
        this.lessons.splice(findedIndex, 1);
    }
}

export default FakeLessonHistoryRepository;
