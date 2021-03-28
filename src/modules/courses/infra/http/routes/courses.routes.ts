import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CoursesController from '../controllers/CoursesController';

const coursesRouter = Router();
const coursesController = new CoursesController();
const upload = multer(uploadConfig.multer);

coursesRouter.get('/', coursesController.show);
coursesRouter.post('/', coursesController.create);
coursesRouter.patch(
    '/image/:course_id',
    upload.single('image'),
    coursesController.updateImageCourse,
);
coursesRouter.delete('/:course_id', coursesController.delete);
coursesRouter.put('/:course_id', coursesController.edit);

export default coursesRouter;
