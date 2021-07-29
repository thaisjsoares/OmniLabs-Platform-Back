"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Journey = _interopRequireDefault(require("../../infra/typeorm/entities/Journey"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-shadow */
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class FakeJourneyRepository {
  constructor() {
    this.journeys = [];
  }

  async findById(id) {
    const journey = this.journeys.find(journey => journey.id === id);
    return journey;
  }

  async save(journey) {
    const findIndex = this.journeys.findIndex(findJourney => findJourney.id === journey.id);
    this.journeys[findIndex] = journey;
    return journey;
  }

  async findByName(journeyName) {
    const journey = this.journeys.find(journey => journey.name === journeyName);
    return journey;
  }

  async findByCourseId(course_id) {
    const journey = this.journeys.filter(journey => journey.course_id === course_id);
    return [...journey];
  }

  async find() {
    return this.journeys;
  }

  async remove(journey) {
    const findedIndex = this.journeys.findIndex(journeys => journeys.id === journey.id);
    this.journeys.splice(findedIndex, 1);
  }

  async create(journeyData) {
    const journey = new _Journey.default();
    Object.assign(journey, {
      id: (0, _uuid.v4)()
    }, journeyData);
    this.journeys.push(journey);
    return journey;
  }

}

var _default = FakeJourneyRepository;
exports.default = _default;