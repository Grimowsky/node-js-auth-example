import * as JWT from 'jsonwebtoken';
import * as process from 'process';
import {
    type AppNext,
    type AppReq,
    type AppRes,
} from '../common/types/Request.type';
import { ExtendedError } from '../utils/error/error';
import { StatusCodes } from 'http-status-codes';

const SECRET = process.env.JWT_SECRET || 'secretKey';

const createToken = (): string => {
    return JWT.sign({ data: 'example' }, SECRET, { expiresIn: '1h' });
};

const verifyToken = async (
    req: AppReq,
    _res: AppRes,
    next: AppNext
): Promise<void> => {
    const token = req?.headers?.authorization?.split(' ')[1];

    console.log('@@@@ was here');

    if (!token) {
        throw ExtendedError.of('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    JWT.verify(token, SECRET, async (err) => {
        if (err) {
            throw new ExtendedError(err?.message, StatusCodes.UNAUTHORIZED);
        }
    });

    next();
};

export default { createToken, verifyToken };
