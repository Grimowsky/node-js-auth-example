import * as express from 'express';

const createRouter = (): express.Router => {
    const router = express.Router();

    router.post('/register');

    return router;
};

export default createRouter;
