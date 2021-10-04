"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateJourneyImageUseCase = _interopRequireDefault(require("./UpdateJourneyImageUseCase"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateJourneyImageController {
  async handle(request, response) {
    const {
      journey_id
    } = request.params;
    const imageName = request.file.filename;

    const updateJourneyImage = _tsyringe.container.resolve(_UpdateJourneyImageUseCase.default);

    const journey = await updateJourneyImage.execute({
      journey_id,
      imageName
    });
    return response.json((0, _classTransformer.classToClass)(journey));
  }

}

var _default = UpdateJourneyImageController;
exports.default = _default;