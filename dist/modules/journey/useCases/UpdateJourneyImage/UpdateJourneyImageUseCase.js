"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IStorageProvider = _interopRequireDefault(require("../../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _IJourneyRepository = _interopRequireDefault(require("../../repositories/models/IJourneyRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateJourneyImageService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('JourneyRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IJourneyRepository.default === "undefined" ? Object : _IJourneyRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateJourneyImageService {
  constructor(journeyRepository, storageProvider) {
    this.journeyRepository = journeyRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    journey_id,
    imageName
  }) {
    const journey = await this.journeyRepository.findById(journey_id);

    if (!journey) {
      throw new _AppError.default('Not possible to find Journey', 401);
    }

    if (journey.image) {
      await this.storageProvider.deleteFile(journey.image);
    }

    const filename = await this.storageProvider.saveFile(imageName);
    journey.image = filename;
    await this.journeyRepository.save(journey);
    return journey;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateJourneyImageService;
exports.default = _default;