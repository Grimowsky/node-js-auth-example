import * as JWT from 'jsonwebtoken';
import * as process from 'process';
import {
    type AppNext,
    type AppReq,
    type AppRes,
} from '../common/types/Request.type';
import { StatusCodes } from 'http-status-codes';

const SECRET = process.env.JWT_SECRET || 'secretKey';

const createToken = (): string => {
    return JWT.sign({ data: 'example' }, SECRET, { expiresIn: '1h' });
};

const verifyAccessToken = (token: string) => {
    return JWT.verify(token, SECRET);
};

const authenticateToken = async (
    req: AppReq,
    res: AppRes,
    next: AppNext
): Promise<AppRes | undefined> => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || '';
    if (!token) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .send({ message: 'Unauthorized' });
    }
    try {
        verifyAccessToken(token);
        next();
    } catch (error) {
        const jwtError = error as JWT.VerifyErrors;
        return res
            .status(StatusCodes.FORBIDDEN)
            .send({ message: jwtError?.message || 'Forbidden' });
    }
};

export default { createToken, authenticateToken };
