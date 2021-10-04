"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RemoveJourneyUseCase = _interopRequireDefault(require("./RemoveJourneyUseCase"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RemoveJourneyController {
  async handle(request, response) {
    const {
      journey_id
    } = request.params;

    const removeJourney = _tsyringe.container.resolve(_RemoveJourneyUseCase.default);

    const journey = await removeJourney.execute(journey_id);
    return response.json(journey);
  }

}

var _default = RemoveJourneyController;
exports.default = _default;