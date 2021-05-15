import uploadConfig from '@config/upload';
import { CreateCoursesController } from '@modules/courses/useCases/CreateCourses/CreateCoursesController';
import { FindSpecificCourseController } from '@modules/courses/useCases/FindSpecifiCourse/FindSpecificCourseController';
import { RemoveCourseController } from '@modules/courses/useCases/RemoveCourse/RemoveCoursesController';
import { ShowCoursesController } from '@modules/courses/useCases/ShowCourses/ShowCoursesController';
import { UpdateCourseController } from '@modules/courses/useCases/UpdateCourse/UpdateCourseController';
import { UpdateCourseImageController } from '@modules/courses/useCases/UpdateCourseImage/UpdateCoursesImageController';
import { Router } from 'express';
import multer from 'multer';

const coursesRouter = Router();
const createCoursesController = new CreateCoursesController();
const findSpecificCourseController = new FindSpecificCourseController();
const removeCourseController = new RemoveCourseController();
const showCoursesController = new ShowCoursesController();
const updateCourseController = new UpdateCourseController();
const updateCourseImageController = new UpdateCourseImageController();
const upload = multer(uploadConfig.multer);

coursesRouter.get('/', showCoursesController.handle);
coursesRouter.get('/:course_id', findSpecificCourseController.handle);
coursesRouter.post('/', createCoursesController.handle);
coursesRouter.patch(
    '/image/:course_id',
    upload.single('image'),
    updateCourseImageController.handle,
);
coursesRouter.delete('/:course_id', removeCourseController.handle);
coursesRouter.put('/:course_id', updateCourseController.handle);

export default coursesRouter;
