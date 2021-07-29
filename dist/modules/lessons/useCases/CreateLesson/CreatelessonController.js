"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLessonController = void 0;

var _CreateLessonUseCase = require("./CreateLessonUseCase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class CreateLessonController {
  async handle(request, response) {
    const {
      type,
      group_id,
      title,
      duration,
      description,
      resource,
      released_at,
      platform,
      name,
      link
    } = request.body;

    const createLesson = _tsyringe.container.resolve(_CreateLessonUseCase.CreateLessonUseCase);

    const lesson = await createLesson.execute({
      type,
      group_id,
      title,
      duration,
      description,
      resource,
      released_at,
      platform,
      name,
      link
    });
    return response.json((0, _classTransformer.classToClass)(lesson));
  }

}

exports.CreateLessonController = CreateLessonController;