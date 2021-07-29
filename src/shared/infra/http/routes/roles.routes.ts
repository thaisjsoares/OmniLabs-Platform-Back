import CreateRolesController from '@modules/roles/useCases/createRole/CreateRoleController';
import DeleteRoleController from '@modules/roles/useCases/deleteRole/DeleteRoleController';
import ShowRolesController from '@modules/roles/useCases/showRoles/ShowRolesController';
import { Router } from 'express';

import ensureAdmin from '../middlewares/ensureAdmin';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rolesRouter = Router();

rolesRouter.use(ensureAuthenticated);

const createRolesController = new CreateRolesController();
const showRolesController = new ShowRolesController();
const deleteRoleController = new DeleteRoleController();

rolesRouter.post('/', ensureAdmin, createRolesController.handle);
rolesRouter.get('/', showRolesController.handle);
rolesRouter.delete('/:role_id', ensureAdmin, deleteRoleController.handle);

export default rolesRouter;
