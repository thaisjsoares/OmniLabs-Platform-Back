import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import Lessons from '@modules/lessons/entities/Lessons';

export default interface ILessonsRepository {
    findById(id: string): Promise<Lessons | undefined>;
    create(data: ICreateLessonDTO): Promise<Lessons>;
    save(lesson: Lessons): Promise<Lessons>;
    remove(lesson: Lessons): Promise<void>;
}
