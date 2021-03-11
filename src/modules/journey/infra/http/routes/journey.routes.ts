import { Router } from 'express'

import JourneyController from '@modules/journey/infra/http/controllers/JourneyController';

const journeyRouter = Router()

const journeyController = new JourneyController()

journeyRouter.post('/', journeyController.create)

export default journeyRouter;
