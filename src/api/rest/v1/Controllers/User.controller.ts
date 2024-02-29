import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';
import logger from '../../../../config/logger';
const register = async (req: AppReq, res: AppRes): Promise<void> => {
    logger.info('UserController: register called');
    res.status(201).send({ created: 'ok' });
};

export { register };
