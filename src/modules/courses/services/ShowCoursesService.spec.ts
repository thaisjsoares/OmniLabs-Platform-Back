import AppError from '../../../shared/errors/AppError';
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository'
import ShowCoursesService from '../services/ShowCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;
let showCourses: ShowCoursesService;

describe('ShowCourses', () => {
    beforeEach(() => {
        fakeCoursesRepository = new FakeCoursesRepository();

        showCourses = new ShowCoursesService(
            fakeCoursesRepository
        );
    })

    it('should be able to list courses', async () => {
        const course1 = await fakeCoursesRepository.create({
            name: "starter",
            description: "asdasd"
        })

        const course2 = await fakeCoursesRepository.create({
            name: "explorer",
            description: "123123"
        })

        const courses = await showCourses.execute();

        expect(courses).toEqual([course1, course2])
    })

    
})
