import { getRepository, Repository } from 'typeorm';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCoursesDTO from '@modules/courses/dtos/ICreateCoursesDTO';

import Courses from '../entities/Courses';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class UsersRepository implements ICoursesRepository {
    private ormRepository: Repository<Courses>;

    constructor() {
        this.ormRepository = getRepository(Courses);
    }

    public async findById(id: string): Promise<Courses | undefined> {
        const courses = await this.ormRepository.findOne(id);

        return courses;
    }

    public async findAll(): Promise<Courses[]> {
        const courses = await this.ormRepository.find();

        return courses;
    }

    public async create(courseData: ICreateCoursesDTO): Promise<Courses> {
        const course = await this.ormRepository.create(courseData);

        await this.ormRepository.save(course);

        return course;
    }

    public async save(courses: Courses): Promise<Courses> {
        return this.ormRepository.save(courses);
    }

    public async findOneByName(name: string): Promise<Courses | undefined> {
        return this.ormRepository.findOne({
            where: { name },
        });
    }

    public async remove(course: Courses): Promise<void> {
        await this.ormRepository.remove(course);
    }
}

export default UsersRepository;
