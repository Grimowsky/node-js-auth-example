import type { AppRes } from '../../../../common/types/Request.type';

export interface User {
    email: string;
    username: string;
    password: string;
}
const register = async (userData: User, res: AppRes): Promise<void> => {
    res.status(200).send({ ok: true });
};

export { register };
