"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCoursesController = require("../../../../modules/courses/useCases/CreateCourses/CreateCoursesController");

var _FindSpecificCourseController = require("../../../../modules/courses/useCases/FindSpecifiCourse/FindSpecificCourseController");

var _RemoveCoursesController = require("../../../../modules/courses/useCases/RemoveCourse/RemoveCoursesController");

var _ShowCoursesController = require("../../../../modules/courses/useCases/ShowCourses/ShowCoursesController");

var _UpdateCourseController = require("../../../../modules/courses/useCases/UpdateCourse/UpdateCourseController");

var _UpdateCoursesImageController = require("../../../../modules/courses/useCases/UpdateCourseImage/UpdateCoursesImageController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const coursesRouter = (0, _express.Router)();
const createCoursesController = new _CreateCoursesController.CreateCoursesController();
const findSpecificCourseController = new _FindSpecificCourseController.FindSpecificCourseController();
const removeCourseController = new _RemoveCoursesController.RemoveCourseController();
const showCoursesController = new _ShowCoursesController.ShowCoursesController();
const updateCourseController = new _UpdateCourseController.UpdateCourseController();
const updateCourseImageController = new _UpdateCoursesImageController.UpdateCourseImageController();
const upload = (0, _multer.default)(_upload.default.multer);
coursesRouter.get('/', showCoursesController.handle);
coursesRouter.get('/:course_id', findSpecificCourseController.handle);
coursesRouter.post('/', createCoursesController.handle);
coursesRouter.patch('/image/:course_id', upload.single('image'), updateCourseImageController.handle);
coursesRouter.delete('/:course_id', removeCourseController.handle);
coursesRouter.put('/:course_id', updateCourseController.handle);
var _default = coursesRouter;
exports.default = _default;