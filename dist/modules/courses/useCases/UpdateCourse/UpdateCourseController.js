"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCourseController = void 0;

var _UpdateCourseUseCase = require("./UpdateCourseUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class UpdateCourseController {
  async handle(request, response) {
    const {
      name,
      description
    } = request.body;
    const {
      course_id
    } = request.params;

    const updateCourse = _tsyringe.container.resolve(_UpdateCourseUseCase.UpdateCourseUseCase);

    const course = await updateCourse.execute({
      name,
      description,
      course_id
    });
    return response.json((0, _classTransformer.classToClass)(course));
  }

}

exports.UpdateCourseController = UpdateCourseController;