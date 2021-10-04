"use strict";

var _FakeJourneyRepository = _interopRequireDefault(require("../../repositories/fakes/FakeJourneyRepository"));

var _FakeSotrageProvider = _interopRequireDefault(require("../../../../shared/container/providers/StorageProvider/fakes/FakeSotrageProvider"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

var _UpdateJourneyImageUseCase = _interopRequireDefault(require("./UpdateJourneyImageUseCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeJourneyRepository;
let fakeStorageProvider;
let updateJourneyImage;
describe('Update Journey image', () => {
  beforeEach(() => {
    fakeJourneyRepository = new _FakeJourneyRepository.default();
    fakeStorageProvider = new _FakeSotrageProvider.default();
    updateJourneyImage = new _UpdateJourneyImageUseCase.default(fakeJourneyRepository, fakeStorageProvider);
  });
  it('should be able to create a new Journey image', async () => {
    const journey = await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Back-end',
      course_id: 'asd'
    });
    await updateJourneyImage.execute({
      journey_id: journey.id,
      imageName: 'avatar.jpg'
    });
    expect(journey.image).toBe('avatar.jpg');
  });
  it('should not be able to update journey image from non existing journey', async () => {
    await expect(updateJourneyImage.execute({
      journey_id: 'non-existing-journey-id',
      imageName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old image when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const journey = await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Back-end',
      course_id: 'asd'
    });
    await updateJourneyImage.execute({
      journey_id: journey.id,
      imageName: 'avatar.jpg'
    });
    await updateJourneyImage.execute({
      journey_id: journey.id,
      imageName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(journey.image).toBe('avatar2.jpg');
  });
});