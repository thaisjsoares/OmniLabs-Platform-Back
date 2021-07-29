"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateJourneyUseCase = _interopRequireDefault(require("./UpdateJourneyUseCase"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateJourneyController {
  async handle(request, response) {
    const {
      journey_id
    } = request.params;
    const {
      description,
      name,
      course_id
    } = request.body;

    const updateJourney = _tsyringe.container.resolve(_UpdateJourneyUseCase.default);

    const journey = await updateJourney.execute({
      journey_id,
      description,
      name,
      course_id
    });
    return response.json(journey);
  }

}

var _default = UpdateJourneyController;
exports.default = _default;