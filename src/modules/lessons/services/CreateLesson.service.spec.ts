import AppError from '../../../shared/errors/AppError'

import FakeLessonsRepository from '@modules/lessons/repositories/fakes/FakeLessonsRepository'
import FakeGroupsRepository from '@modules/groups/repositories/fakes/FakeGroupsRepository'
import CreateLessonService from './CreateLesson.service'

let createLesson: CreateLessonService
let fakeLessonsRepository: FakeLessonsRepository
let fakeGroupsRepository: FakeGroupsRepository

describe('Create Lesson', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository()
    fakeGroupsRepository = new FakeGroupsRepository()

    createLesson = new CreateLessonService(
      fakeLessonsRepository,
      fakeGroupsRepository
    )
  })

  it('should be able to create lesson', async () => {
    const group = await fakeGroupsRepository.create({
      name: 'Iniciando no Nodejs',
      description: 'módulo iniciação em node',
      journey_id: 'journey_id'
    })

    const lesson = await createLesson.execute({
      name: 'métodos http',
      description: 'get, post, put e delete',
      duration: 12000,
      group_id: group.id,
      video_id: 'video_id'
    })

    expect(lesson).toHaveProperty('id')
  })

  it('should not be able to create lesson if group non exists', async () => {
    await expect(
      createLesson.execute({
        name: 'métodos http',
        description: 'get, post, put e delete',
        duration: 12000,
        group_id: 'non-existing-group',
        video_id: 'video_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
