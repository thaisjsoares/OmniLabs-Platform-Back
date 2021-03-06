import { CreateGroupController } from '@modules/groups/useCases/CreateGroup/CreateGroupController';
import { DeleteGroupController } from '@modules/groups/useCases/DeleteGroup/DeleteGroupController';
import { ShowGroupsController } from '@modules/groups/useCases/ShowGroups/ShowGroupsController';
import { ShowGroupsOfJourneyController } from '@modules/groups/useCases/ShowGroupsOfJourney/ShowGroupsOfJourneyController';
import { UpdateGroupController } from '@modules/groups/useCases/UpdateGroup/UpdateGroupController';
import { Router } from 'express';

const groupsRouter = Router();

const createGroupController = new CreateGroupController();
const deleteGroupController = new DeleteGroupController();
const showGroupsController = new ShowGroupsController();
const updateGroupController = new UpdateGroupController();
const showGroupsOfJourney = new ShowGroupsOfJourneyController();

groupsRouter.post('/', createGroupController.handle);
groupsRouter.get('/', showGroupsController.handle);
groupsRouter.get('/:journey_id', showGroupsOfJourney.handle);
groupsRouter.delete('/:group_id', deleteGroupController.handle);
groupsRouter.put('/:group_id', updateGroupController.handle);

export default groupsRouter;
