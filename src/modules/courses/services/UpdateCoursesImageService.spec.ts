import AppError from '../../../shared/errors/AppError'
import FakeCoursesRepository from '@modules/courses/repositories/fakes/FakeCoursesRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeSotrageProvider'
import UpdateCourseImage from '../services/UpdateCoursesImageService'

let fakeCoursesRepository: FakeCoursesRepository
let fakeStorageProvider: FakeStorageProvider
let updateCourseImage: UpdateCourseImage

describe('UpdateCourseImage', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateCourseImage = new UpdateCourseImage(
      fakeCoursesRepository,
      fakeStorageProvider
    )
  })

  it('should be able to create a new Course', async () => {
    const course = await fakeCoursesRepository.create({
      name: 'starter',
      description: 'iniciando na programacao'
    })

    await updateCourseImage.execute({
      course_id: course.id,
      imageFileName: 'image.png'
    })

    expect(course.image).toBe('image.png')
  })

  it('should not be able to update image from non existing course', async () => {
    await expect(
      updateCourseImage.execute({
        course_id: 'non-existing-course',
        imageFileName: 'image.png'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old image when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const course = await fakeCoursesRepository.create({
      name: 'starter',
      description: 'iniciando na programacao'
    })

    await updateCourseImage.execute({
      course_id: course.id,
      imageFileName: 'image.jpg'
    })

    await updateCourseImage.execute({
      course_id: course.id,
      imageFileName: 'image2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('image.jpg')
    expect(course.image).toBe('image2.jpg')
  })
})
