import { Router } from 'express';

import CreateRolesController from '@modules/roles/useCases/createRole/CreateRoleController';
import ShowRolesController from '@modules/roles/useCases/showRoles/ShowRolesController';
import DeleteRoleController from '@modules/roles/useCases/deleteRole/DeleteRoleController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';

const rolesRouter = Router();

rolesRouter.use(ensureAuthenticated);

const createRolesController = new CreateRolesController();
const showRolesController = new ShowRolesController();
const deleteRoleController = new DeleteRoleController();

rolesRouter.post('/', ensureAdmin, createRolesController.handle);
rolesRouter.get('/', showRolesController.handle);
rolesRouter.delete('/:role_id', ensureAdmin, deleteRoleController.handle);

export default rolesRouter;
