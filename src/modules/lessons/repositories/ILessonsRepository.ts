import ICreateLessonDTO from '../dtos/ICreateLessonDTO'
import Lesson from '../infra/typeorm/entities/Lesson'

export default interface IUsersRepository {
    findById(id: string): Promise<Lesson | undefined>;
    create(data: ICreateLessonDTO): Promise<Lesson>;
    save(lesson: Lesson): Promise<Lesson>;
    findByModule(group_id: string): Promise<Lesson[]>;
}
