import { Router } from 'express';
import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';

const router = Router();

router.use('/users', async (req: AppReq, res: AppRes) => {
    res.status(201).send({ hello: 'world' });
});

export default router;
