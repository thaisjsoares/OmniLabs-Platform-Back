"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreatelessonController = require("../../../../modules/lessons/useCases/CreateLesson/CreatelessonController");

var _ListLessonsOfJourneyController = require("../../../../modules/lessons/useCases/ListLessonsOfJourney/ListLessonsOfJourneyController");

var _ListSpecificLessonController = require("../../../../modules/lessons/useCases/ListSpecificLesson/ListSpecificLessonController");

var _express = require("express");

const lessonsRouter = (0, _express.Router)();
const createLessonsController = new _CreatelessonController.CreateLessonController();
const listLessonsOfJourneyController = new _ListLessonsOfJourneyController.ListLessonsOfJourneyController();
const listSpecificLessonController = new _ListSpecificLessonController.ListSpecificLessonController();
lessonsRouter.post('/', createLessonsController.handle);
lessonsRouter.get('/:journey_name', listLessonsOfJourneyController.handle);
lessonsRouter.get('/lesson/:lesson_id', listSpecificLessonController.handle);
var _default = lessonsRouter;
exports.default = _default;