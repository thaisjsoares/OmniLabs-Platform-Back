"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListLessonsOfJourneyController = void 0;

var _ListLessonsOfJourneyUseCase = require("./ListLessonsOfJourneyUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class ListLessonsOfJourneyController {
  async handle(request, response) {
    const {
      journey_name
    } = request.params;

    const listLessonsOfJourney = _tsyringe.container.resolve(_ListLessonsOfJourneyUseCase.ListLessonOfCourseUseCase);

    const lesson = await listLessonsOfJourney.execute({
      journey_name
    });
    return response.json((0, _classTransformer.classToClass)(lesson));
  }

}

exports.ListLessonsOfJourneyController = ListLessonsOfJourneyController;