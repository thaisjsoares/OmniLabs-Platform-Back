import AppError from '../../../shared/errors/AppError'
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository'
import CreateCoursesService from '../services/CreateCoursesService'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeCoursesRepository: FakeCoursesRepository
let fakeCacheProvider: FakeCacheProvider
let createCourse: CreateCoursesService

describe('CreateCourse', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createCourse = new CreateCoursesService(
      fakeCoursesRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a course', async () => {
    const course = await createCourse.execute({
      name: 'starter',
      description: 'curso iniciando na programação'
    })

    expect(course).toHaveProperty('id')
  })

  it('should not be able to create already existent course', async () => {
    await createCourse.execute({
      name: 'starter',
      description: 'curso iniciando na programação'
    })

    await expect(createCourse.execute({
      name: 'starter',
      description: 'curso iniciando na programação'
    })).rejects.toBeInstanceOf(AppError)
  })
})
