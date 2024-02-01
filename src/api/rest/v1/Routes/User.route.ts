import * as express from 'express';
import * as UserController from '../Controllers/User.controller';

const createRouter = (): express.Router => {
    const router = express.Router();

    router.use('/register', UserController.register);

    return router;
};

export default createRouter;
