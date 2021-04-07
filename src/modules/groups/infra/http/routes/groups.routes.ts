import GroupsController from '@modules/groups/infra/http/controllers/GroupsController';
import { Router } from 'express';

const groupsRouter = Router();

const groupsController = new GroupsController();

groupsRouter.post('/', groupsController.create);
groupsRouter.get('/', groupsController.show);
groupsRouter.delete('/:group_id', groupsController.remove);
groupsRouter.put('/:group_id', groupsController.edit);

export default groupsRouter;
