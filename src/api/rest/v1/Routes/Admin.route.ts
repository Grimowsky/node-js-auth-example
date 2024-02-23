import * as express from 'express';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import * as AdminController from '../Controllers/Admin.controller';
const createRouter = (): express.Router => {
    const router = express.Router();

    router.get('/users/list', asyncWrapper(AdminController.usersList));

    return router;
};

export default createRouter;
