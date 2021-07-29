"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowCoursesController = void 0;

var _ShowCoursesUseCase = require("./ShowCoursesUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class ShowCoursesController {
  async handle(request, response) {
    const {
      page,
      limit
    } = request.query;

    const showCourses = _tsyringe.container.resolve(_ShowCoursesUseCase.ShowCoursesUseCase);

    const course = await showCourses.execute({
      page: Number(page),
      limit: Number(limit)
    });
    return response.json((0, _classTransformer.classToClass)(course));
  }

}

exports.ShowCoursesController = ShowCoursesController;