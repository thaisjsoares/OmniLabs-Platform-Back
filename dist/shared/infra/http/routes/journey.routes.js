"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateJourneyController = _interopRequireDefault(require("../../../../modules/journey/useCases/CreateJourney/CreateJourneyController"));

var _RemoveJourneyController = _interopRequireDefault(require("../../../../modules/journey/useCases/RemoveJourney/RemoveJourneyController"));

var _ShowAllJourneyController = _interopRequireDefault(require("../../../../modules/journey/useCases/ShowAllJourney/ShowAllJourneyController"));

var _ShowJounreysOfCourseController = _interopRequireDefault(require("../../../../modules/journey/useCases/ShowJourneysOfCourse/ShowJounreysOfCourseController"));

var _ShowJourneysOfCourseNameController = _interopRequireDefault(require("../../../../modules/journey/useCases/ShowJourneysOfCourseName/ShowJourneysOfCourseNameController"));

var _UpdateJourneyController = _interopRequireDefault(require("../../../../modules/journey/useCases/UpdateJourney/UpdateJourneyController"));

var _UpdateJourneyImageController = _interopRequireDefault(require("../../../../modules/journey/useCases/UpdateJourneyImage/UpdateJourneyImageController"));

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const journeyRouter = (0, _express.Router)();
const createJourneyController = new _CreateJourneyController.default();
const removeJourneyController = new _RemoveJourneyController.default();
const showAllJourneysController = new _ShowAllJourneyController.default();
const showJourneysOfCourseController = new _ShowJounreysOfCourseController.default();
const updateJourneyController = new _UpdateJourneyController.default();
const updateJourneyImageController = new _UpdateJourneyImageController.default();
const showJourneysOfCourseNameController = new _ShowJourneysOfCourseNameController.default();
const upload = (0, _multer.default)(_upload.default.multer);
journeyRouter.post('/', createJourneyController.handle);
journeyRouter.get('/:course_id', showJourneysOfCourseController.handle);
journeyRouter.get('/', showAllJourneysController.handle);
journeyRouter.delete('/:journey_id', removeJourneyController.handle);
journeyRouter.put('/:journey_id', updateJourneyController.handle);
journeyRouter.get('/course/:course_name', showJourneysOfCourseNameController.handle);
journeyRouter.patch('/image/:journey_id', upload.single('image'), updateJourneyImageController.handle);
var _default = journeyRouter;
exports.default = _default;