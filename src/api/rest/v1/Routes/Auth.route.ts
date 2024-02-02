import * as express from 'express';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import * as AuthController from '../Controllers/Auth.controller';
const createRouter = (): express.Router => {
    const router = express.Router();

    router.post('/login', asyncWrapper(AuthController.login));

    return router;
};

export default createRouter;
