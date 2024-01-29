import { exampleService } from '../../../../services/exampleService';
import {
    type AppNext,
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';

export const exampleController = async (
    req: AppReq,
    res: AppRes,
    next: AppNext
): Promise<void> => {
    try {
        const data = await exampleService();
        res.send(data);
    } catch (e) {
        next(e);
    }
};
