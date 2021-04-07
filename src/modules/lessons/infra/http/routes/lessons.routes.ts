import LessonsController from '@modules/lessons/infra/http/controllers/LessonsController';
import { Router } from 'express';

const lessonsRouter = Router();

const lessonsController = new LessonsController();

lessonsRouter.post('/', lessonsController.create);
lessonsRouter.get('/:journey_name', lessonsController.index);
lessonsRouter.get('/lesson/:lesson_id', lessonsController.show);

export default lessonsRouter;
