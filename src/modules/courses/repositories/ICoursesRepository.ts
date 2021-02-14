import Courses from '../infra/typeorm/entities/Courses';
import ICreateCoursesDTO from '../dtos/ICreateCoursesDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<Courses | undefined>;
    findOneByName(name: string): Promise<Courses | undefined>;
    findAll(): Promise<Courses[]>
    create(name: string, description: string): Promise<Courses>;
    save(user: Courses): Promise<Courses>;
}
