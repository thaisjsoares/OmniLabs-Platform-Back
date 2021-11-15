import uploadConfig from '@config/upload';
import CreateJourneyController from '@modules/journey/useCases/CreateJourney/CreateJourneyController';
import RemoveJourneyController from '@modules/journey/useCases/RemoveJourney/RemoveJourneyController';
import ShowAllJourneyController from '@modules/journey/useCases/ShowAllJourney/ShowAllJourneyController';
import ShowJounreysOfCourseController from '@modules/journey/useCases/ShowJourneysOfCourse/ShowJounreysOfCourseController';
import ShowJourneysOfCourseNameController from '@modules/journey/useCases/ShowJourneysOfCourseName/ShowJourneysOfCourseNameController';
import UpdateJourneyController from '@modules/journey/useCases/UpdateJourney/UpdateJourneyController';
import UpdateJourneyImageController from '@modules/journey/useCases/UpdateJourneyImage/UpdateJourneyImageController';
import { Router } from 'express';
import multer from 'multer';

const journeyRouter = Router();

const createJourneyController = new CreateJourneyController();
const removeJourneyController = new RemoveJourneyController();
const showAllJourneysController = new ShowAllJourneyController();
const showJourneysOfCourseController = new ShowJounreysOfCourseController();
const updateJourneyController = new UpdateJourneyController();
const updateJourneyImageController = new UpdateJourneyImageController();
const showJourneysOfCourseNameController = new ShowJourneysOfCourseNameController();
const upload = multer(uploadConfig.multer);

journeyRouter.post('/', createJourneyController.handle);
journeyRouter.get('/:course_id', showJourneysOfCourseController.handle);
journeyRouter.get('/', showAllJourneysController.handle);
journeyRouter.delete('/:journey_id', removeJourneyController.handle);
journeyRouter.put('/:journey_id', updateJourneyController.handle);

journeyRouter.get(
    '/course/:course_name',
    showJourneysOfCourseNameController.handle,
);

journeyRouter.patch(
    '/image/:journey_id',
    upload.single('image'),
    updateJourneyImageController.handle,
);

export default journeyRouter;
