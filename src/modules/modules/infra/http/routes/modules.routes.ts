import { Router } from 'express'

import ModulesController from '@modules/modules/infra/http/controllers/ModulesController';

const modulesRouter = Router()

const modulesController = new ModulesController()

modulesRouter.post('/', modulesController.create)

export default modulesRouter;
