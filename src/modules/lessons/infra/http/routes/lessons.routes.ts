import { Router } from 'express'

import LessonsController from '@modules/lessons/infra/http/controllers/LessonsController';

const lessonsRouter = Router()

const lessonsController = new LessonsController()

lessonsRouter.post('/', lessonsController.create)
lessonsRouter.get('/:course_name', lessonsController.index);
lessonsRouter.get('/lesson/:lesson_id', lessonsController.show)

export default lessonsRouter;
