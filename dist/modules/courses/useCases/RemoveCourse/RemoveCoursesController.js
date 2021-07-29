"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveCourseController = void 0;

var _RemoveCoursesUseCase = require("./RemoveCoursesUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class RemoveCourseController {
  async handle(request, response) {
    const {
      couse_id
    } = request.params;

    const removeCourse = _tsyringe.container.resolve(_RemoveCoursesUseCase.RemoveCoruseUseCase);

    const course = await removeCourse.execute(couse_id);
    return response.json((0, _classTransformer.classToClass)(course));
  }

}

exports.RemoveCourseController = RemoveCourseController;