import ICreateLessonHistoryDTO from '@modules/lessons/dtos/ICreateLessonHistoryDTO';
import Lesson_History from '@modules/lessons/entities/Lesson_History';

export default interface ILessonHistoryRepository {
    findById(id: string): Promise<Lesson_History | undefined>;
    create(data: ICreateLessonHistoryDTO): Promise<Lesson_History>;
    save(lesson: Lesson_History): Promise<Lesson_History>;
    findByGroup(group_id: string): Promise<Lesson_History[]>;
    findByTitle(title: string): Promise<Lesson_History | undefined>;
    findByName(name: string): Promise<Lesson_History | undefined>;
}
