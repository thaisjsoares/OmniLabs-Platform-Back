"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowAllJourneysUseCase = _interopRequireDefault(require("./ShowAllJourneysUseCase"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowAllJourneyController {
  async handle(request, response) {
    const showAllJourneys = _tsyringe.container.resolve(_ShowAllJourneysUseCase.default);

    const journeys = await showAllJourneys.execute();
    return response.json((0, _classTransformer.classToClass)(journeys));
  }

}

var _default = ShowAllJourneyController;
exports.default = _default;