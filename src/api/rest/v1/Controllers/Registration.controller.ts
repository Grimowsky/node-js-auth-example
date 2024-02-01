import type { AppReq, AppRes } from '../../../../common/types/Request.type';

const register = async (req: AppReq, res: AppRes): Promise<void> => {
    res.status(200).send({ ok: true });
};

export { register };
