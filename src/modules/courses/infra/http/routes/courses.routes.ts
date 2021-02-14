import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CoursesController from '../controllers/CoursesController';

const coursesRouter = Router();
const coursesController = new CoursesController();
const upload = multer(uploadConfig.multer);

coursesRouter.get('/', coursesController.show);
coursesRouter.post('/create', coursesController.create);
coursesRouter.patch(
    '/image/:course_id',
    upload.single('image'),
    coursesController.updateImageCourse,
);

export default coursesRouter;
