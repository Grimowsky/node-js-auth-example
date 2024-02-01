import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';

const register = async (req: AppReq, res: AppRes): Promise<void> => {
    res.status(201).send({ created: 'ok' });
};

export { register };
