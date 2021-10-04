"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowJourneysOfCourseNameUseCase = _interopRequireDefault(require("./ShowJourneysOfCourseNameUseCase"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowJourneysOfCourseNameController {
  async handle(request, response) {
    const {
      course_name
    } = request.params;

    const findJourneysByCourseId = _tsyringe.container.resolve(_ShowJourneysOfCourseNameUseCase.default);

    const journeys = await findJourneysByCourseId.execute(course_name);
    return response.json((0, _classTransformer.classToClass)(journeys));
  }

}

var _default = ShowJourneysOfCourseNameController;
exports.default = _default;