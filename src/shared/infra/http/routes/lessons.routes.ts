import { CreateLessonController } from '@modules/lessons/useCases/CreateLesson/CreatelessonController';
import { ListLessonsOfJourneyController } from '@modules/lessons/useCases/ListLessonsOfJourney/ListLessonsOfJourneyController';
import { ListSpecificLessonController } from '@modules/lessons/useCases/ListSpecificLesson/ListSpecificLessonController';
import { Router } from 'express';

const lessonsRouter = Router();

const createLessonsController = new CreateLessonController();
const listLessonsOfJourneyController = new ListLessonsOfJourneyController();
const listSpecificLessonController = new ListSpecificLessonController();

lessonsRouter.post('/', createLessonsController.handle);
lessonsRouter.get('/:journey_name', listLessonsOfJourneyController.handle);
lessonsRouter.get('/lesson/:lesson_id', listSpecificLessonController.handle);

export default lessonsRouter;
