"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateJourneyUseCase = _interopRequireDefault(require("./CreateJourneyUseCase"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateJourneyController {
  async handle(request, response) {
    const {
      name,
      description,
      course_id
    } = request.body;

    const createJourney = _tsyringe.container.resolve(_CreateJourneyUseCase.default);

    const journey = await createJourney.execute({
      name,
      description,
      course_id
    });
    return response.json(journey);
  }

}

var _default = CreateJourneyController;
exports.default = _default;