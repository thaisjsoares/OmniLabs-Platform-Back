"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowJourneysOfCourseUseCase = _interopRequireDefault(require("./ShowJourneysOfCourseUseCase"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowJounreysOfCourseController {
  async handle(request, response) {
    const {
      course_id
    } = request.params;

    const findJourneysByCourseId = _tsyringe.container.resolve(_ShowJourneysOfCourseUseCase.default);

    const journeys = await findJourneysByCourseId.execute(course_id);
    return response.json((0, _classTransformer.classToClass)(journeys));
  }

}

var _default = ShowJounreysOfCourseController;
exports.default = _default;