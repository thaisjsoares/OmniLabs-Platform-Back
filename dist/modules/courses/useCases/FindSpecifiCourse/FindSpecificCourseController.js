"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSpecificCourseController = void 0;

var _FindSpecificCourseUseCase = require("./FindSpecificCourseUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class FindSpecificCourseController {
  async handle(request, response) {
    const {
      course_id
    } = request.params;

    const findCourse = _tsyringe.container.resolve(_FindSpecificCourseUseCase.FindSpecificCourseUseCase);

    const course = await findCourse.execute({
      course_id
    });
    return response.json((0, _classTransformer.classToClass)(course));
  }

}

exports.FindSpecificCourseController = FindSpecificCourseController;