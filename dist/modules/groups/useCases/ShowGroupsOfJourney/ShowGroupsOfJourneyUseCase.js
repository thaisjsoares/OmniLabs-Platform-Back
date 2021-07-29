"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowGroupsOfJourneyUseCase = void 0;

var _IGroupsRepository = _interopRequireDefault(require("../../repositories/models/IGroupsRepository"));

var _IJourneyRepository = _interopRequireDefault(require("../../../journey/repositories/models/IJourneyRepository"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowGroupsOfJourneyUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GroupsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('JourneyRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IGroupsRepository.default === "undefined" ? Object : _IGroupsRepository.default, typeof _IJourneyRepository.default === "undefined" ? Object : _IJourneyRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ShowGroupsOfJourneyUseCase {
  constructor(groupsRepository, journeyRepository) {
    this.groupsRepository = groupsRepository;
    this.journeyRepository = journeyRepository;
  }

  async execute({
    journey_id
  }) {
    const journey = await this.journeyRepository.findById(journey_id);

    if (!journey) {
      throw new _AppError.default('Not possible to find journey');
    }

    const groups = await this.groupsRepository.findByJourney(journey.id);
    return groups;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ShowGroupsOfJourneyUseCase = ShowGroupsOfJourneyUseCase;