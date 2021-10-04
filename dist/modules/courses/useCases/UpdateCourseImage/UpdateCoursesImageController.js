"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCourseImageController = void 0;

var _UpdateCoursesImageUseCase = require("./UpdateCoursesImageUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class UpdateCourseImageController {
  async handle(request, response) {
    const updateImageCourse = _tsyringe.container.resolve(_UpdateCoursesImageUseCase.UpdateCoursesImageUseCase);

    const {
      course_id
    } = request.params;
    const course = await updateImageCourse.execute({
      course_id,
      imageFileName: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(course));
  }

}

exports.UpdateCourseImageController = UpdateCourseImageController;