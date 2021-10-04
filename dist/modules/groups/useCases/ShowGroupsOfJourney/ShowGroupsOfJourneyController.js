"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowGroupsOfJourneyController = void 0;

var _ShowGroupsOfJourneyUseCase = require("./ShowGroupsOfJourneyUseCase");

var _tsyringe = require("tsyringe");

class ShowGroupsOfJourneyController {
  async handle(request, response) {
    const {
      journey_id
    } = request.params;

    const showGroupsOfJourney = _tsyringe.container.resolve(_ShowGroupsOfJourneyUseCase.ShowGroupsOfJourneyUseCase);

    const groups = await showGroupsOfJourney.execute({
      journey_id
    });
    return response.json(groups);
  }

}

exports.ShowGroupsOfJourneyController = ShowGroupsOfJourneyController;