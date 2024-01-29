import * as express from 'express';
import { exampleController } from '../Controllers/exampleController';

export const createRouter = (): express.Router => {
    const router = express.Router();

    router.get('/example', exampleController);

    return router;
};
