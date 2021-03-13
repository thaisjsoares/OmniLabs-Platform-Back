import { Router } from 'express'

import JourneyController from '@modules/journey/infra/http/controllers/JourneyController';
import JourneyImageController from '@modules/journey/infra/http/controllers/JourneyImageController'
import uploadConfig from '@config/upload';
import multer from 'multer';

const journeyRouter = Router()

const journeyController = new JourneyController()
const journeyImageController = new JourneyImageController();
const upload = multer(uploadConfig.multer);

journeyRouter.post('/', journeyController.create)
journeyRouter.get('/:course_id', journeyController.find)
journeyRouter.get('/', journeyController.show)
journeyRouter.delete('/:journey_id', journeyController.remove)

journeyRouter.patch('/image/:journey_id', upload.single('image'), journeyImageController.update)

export default journeyRouter;
