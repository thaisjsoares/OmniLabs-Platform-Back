import { Router } from 'express'

import JourneyController from '@modules/journey/infra/http/controllers/JourneyController';

const journeyRouter = Router()

const journeyController = new JourneyController()

journeyRouter.post('/', journeyController.create)
journeyRouter.get('/:course_id', journeyController.find)
journeyRouter.get('/', journeyController.show)

export default journeyRouter;
