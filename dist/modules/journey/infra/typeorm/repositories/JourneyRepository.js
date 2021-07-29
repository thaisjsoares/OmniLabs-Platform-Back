"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Journey = _interopRequireDefault(require("../entities/Journey"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro
class JourneyRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Journey.default);
  }

  async findById(id) {
    const journey = await this.ormRepository.findOne(id);
    return journey;
  }

  async create(JourneyData) {
    const journey = this.ormRepository.create(JourneyData);
    await this.ormRepository.save(journey);
    return journey;
  }

  async save(journey) {
    return this.ormRepository.save(journey);
  }

  async findByName(journeyName) {
    const journey = await this.ormRepository.findOne({
      where: {
        name: journeyName
      }
    });
    return journey;
  }

  async findByCourseId(course_id) {
    const journey = await this.ormRepository.find({
      where: {
        course_id
      }
    });
    return journey;
  }

  async find() {
    const journeys = await this.ormRepository.find();
    return journeys;
  }

  async remove(journey) {
    await this.ormRepository.remove(journey);
  }

}

var _default = JourneyRepository;
exports.default = _default;