import { type LoginReq, type LoginResponse } from '@services/Auth/Auth.type';
import prisma from '../../prisma/prisma-client';
import { ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import JwtMiddleware from '../../middleware/jwtMiddleware';

const USER_REPO = prisma.user;
const login = async ({
    username,
    password,
}: LoginReq): Promise<LoginResponse> => {
    const userDetails = await USER_REPO.findUnique({
        where: { username },
        select: { password: true, username: true, id: true, email: true },
    });

    if (!userDetails) {
        throw ExtendedError.of('Invalid user details', StatusCodes.BAD_REQUEST);
    }

    const isValidPassword = await bcrypt.compare(
        password,
        userDetails.password
    );
    if (!isValidPassword) {
        throw ExtendedError.of('Invalid password', StatusCodes.BAD_REQUEST);
    }

    const token = JwtMiddleware.createToken({
        username: userDetails.username,
        email: userDetails.email,
    });
    return { token };
};

const AuthService = { login };

export default AuthService;
