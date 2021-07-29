"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCoursesController = void 0;

var _CreateCoursesUseCase = require("./CreateCoursesUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class CreateCoursesController {
  async handle(request, response) {
    const createCourse = _tsyringe.container.resolve(_CreateCoursesUseCase.CreateCoursesUseCase);

    const {
      name,
      description
    } = request.body;
    const course = await createCourse.execute({
      name,
      description
    });
    return response.json((0, _classTransformer.classToClass)(course));
  }

}

exports.CreateCoursesController = CreateCoursesController;