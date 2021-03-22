import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository'
import ShowCoursesService from '../services/ShowCoursesService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeCoursesRepository: FakeCoursesRepository
let fakeCacheProvider: FakeCacheProvider
let showCourses: ShowCoursesService

describe('ShowCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository()
    fakeCacheProvider = new FakeCacheProvider()

    showCourses = new ShowCoursesService(
      fakeCoursesRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list courses', async () => {
    const course1 = await fakeCoursesRepository.create({
      name: 'starter',
      description: 'asdasd'
    })

    const course2 = await fakeCoursesRepository.create({
      name: 'explorer',
      description: '123123'
    })

    const courses = await showCourses.execute()

    expect(courses).toEqual([course1, course2])
  })
})
