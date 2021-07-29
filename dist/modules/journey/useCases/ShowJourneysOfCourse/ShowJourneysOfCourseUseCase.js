"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IJourneyRepository = _interopRequireDefault(require("../../repositories/models/IJourneyRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowJourneysService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('JourneyRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IJourneyRepository.default === "undefined" ? Object : _IJourneyRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowJourneysService {
  constructor(journeyRepository) {
    this.journeyRepository = journeyRepository;
  }

  async execute(course_id) {
    const journeys = await this.journeyRepository.findByCourseId(course_id);
    return journeys;
  }

}) || _class) || _class) || _class) || _class);
var _default = ShowJourneysService;
exports.default = _default;