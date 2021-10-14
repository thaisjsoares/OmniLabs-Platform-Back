import { CreateLessonController } from '@modules/lessons/useCases/CreateLesson/CreatelessonController';
import { ListSpecificLessonController } from '@modules/lessons/useCases/ListSpecificLesson/ListSpecificLessonController';
import { Router } from 'express';

const lessonsRouter = Router();

const createLessonsController = new CreateLessonController();
const listSpecificLessonController = new ListSpecificLessonController();

lessonsRouter.post('/', createLessonsController.handle);
lessonsRouter.get('/lesson/:lesson_id', listSpecificLessonController.handle);

export default lessonsRouter;
