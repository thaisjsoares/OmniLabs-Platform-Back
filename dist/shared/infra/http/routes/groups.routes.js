"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateGroupController = require("../../../../modules/groups/useCases/CreateGroup/CreateGroupController");

var _DeleteGroupController = require("../../../../modules/groups/useCases/DeleteGroup/DeleteGroupController");

var _ShowGroupsController = require("../../../../modules/groups/useCases/ShowGroups/ShowGroupsController");

var _ShowGroupsOfJourneyController = require("../../../../modules/groups/useCases/ShowGroupsOfJourney/ShowGroupsOfJourneyController");

var _UpdateGroupController = require("../../../../modules/groups/useCases/UpdateGroup/UpdateGroupController");

var _express = require("express");

const groupsRouter = (0, _express.Router)();
const createGroupController = new _CreateGroupController.CreateGroupController();
const deleteGroupController = new _DeleteGroupController.DeleteGroupController();
const showGroupsController = new _ShowGroupsController.ShowGroupsController();
const updateGroupController = new _UpdateGroupController.UpdateGroupController();
const showGroupsOfJourney = new _ShowGroupsOfJourneyController.ShowGroupsOfJourneyController();
groupsRouter.post('/', createGroupController.handle);
groupsRouter.get('/', showGroupsController.handle);
groupsRouter.get('/:journey_id', showGroupsOfJourney.handle);
groupsRouter.delete('/:group_id', deleteGroupController.handle);
groupsRouter.put('/:group_id', updateGroupController.handle);
var _default = groupsRouter;
exports.default = _default;