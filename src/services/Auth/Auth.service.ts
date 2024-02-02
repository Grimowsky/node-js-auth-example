import {
    type LoginReq,
    type LoginResponse,
    type RefreshTokenReq,
    type RefreshTokenResponse,
} from '@services/Auth/Auth.type';
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
        throw ExtendedError.of(
            'Username or password is invalid',
            StatusCodes.UNAUTHORIZED
        );
    }

    const isValidPassword = await bcrypt.compare(
        password,
        userDetails.password
    );
    if (!isValidPassword) {
        throw ExtendedError.of(
            'Username or Password is invalid',
            StatusCodes.UNAUTHORIZED
        );
    }

    const token = JwtMiddleware.createToken({
        username: userDetails.username,
        id: userDetails.id.toString(),
    });

    const refreshToken = JwtMiddleware.createRefreshToken({
        username: userDetails.username,
        id: userDetails.id.toString(),
    });

    return { token, refreshToken };
};

const refreshToken = async (
    payload: RefreshTokenReq
): Promise<RefreshTokenResponse> => {
    const decodedToken = JwtMiddleware.decodeUserFromToken(
        payload.refreshToken
    );

    const userDetails = await USER_REPO.findUnique({
        where: {
            id: Number(decodedToken.data.id),
        },
        select: {
            username: true,
            id: true,
        },
    });

    if (!userDetails) {
        throw ExtendedError.of('User not found', StatusCodes.UNAUTHORIZED);
    }

    const authToken = JwtMiddleware.createToken({
        username: userDetails.username,
        id: userDetails.id.toString(),
    });

    const refreshToken = JwtMiddleware.createRefreshToken({
        username: userDetails.username,
        id: userDetails.id.toString(),
    });
    return { token: authToken, refreshToken };
};

const AuthService = { login, refreshToken };

export default AuthService;
