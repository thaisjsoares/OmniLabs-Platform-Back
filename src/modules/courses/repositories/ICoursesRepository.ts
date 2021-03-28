import Courses from '../infra/typeorm/entities/Courses';
import ICreateCoursesDTO from '../dtos/ICreateCoursesDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<Courses | undefined>;
    findOneByName(name: string): Promise<Courses | undefined>;
    findAll(page: number, limit: number): Promise<Courses[]>;
    create(courseData: ICreateCoursesDTO): Promise<Courses>;
    save(user: Courses): Promise<Courses>;
    remove(course: Courses): Promise<void>;
}
