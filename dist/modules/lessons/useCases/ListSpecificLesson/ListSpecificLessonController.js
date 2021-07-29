"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificLessonController = void 0;

var _ListSpecificLessonUsecase = require("./ListSpecificLessonUsecase");

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

class ListSpecificLessonController {
  async handle(request, response) {
    const {
      lesson_id
    } = request.params;

    const listSpecificLesson = _tsyringe.container.resolve(_ListSpecificLessonUsecase.ListSpecificLessonUseCase);

    const lesson = await listSpecificLesson.execute({
      lesson_id
    });
    return response.json((0, _classTransformer.classToClass)(lesson));
  }

}

exports.ListSpecificLessonController = ListSpecificLessonController;