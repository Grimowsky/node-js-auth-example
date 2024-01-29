import { StatusCodes } from 'http-status-codes';
import {
    type AppErr,
    type AppNext,
    type AppReq,
    type AppRes,
} from '../../common/types/Request.type';

export const errorHandler =
    () => (error: AppErr, _req: AppReq, res: AppRes, _next: AppNext) => {
        const statusErrorCode = error?.statusCode ?? error?.status;

        if (statusErrorCode != null) {
            res.status(statusErrorCode).json({
                error: {
                    message: error.message ?? 'Unknown error',
                },
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: {
                    message: 'Internal Server Error',
                },
            });
        }
    };

export class ExtendedError extends Error {
    statusCode: number;

    constructor(message: string | undefined, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    static of(
        message: string,
        statusCode: number
    ): { message: string; statusCode: number } {
        return new this(message, statusCode).toObj();
    }

    toObj(): { message: string; statusCode: number } {
        return { ...this, message: this.message };
    }
}
