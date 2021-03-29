import { Router } from 'express';

import RolesController from '@modules/roles/infra/http/controllers/RolesController';

const rolesRouter = Router();

const rolesController = new RolesController();

rolesRouter.post('/', rolesController.create);
rolesRouter.get('/', rolesController.show);
rolesRouter.delete('/:role_id', rolesController.delete);

export default rolesRouter;
