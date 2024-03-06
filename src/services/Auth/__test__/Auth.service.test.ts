import authService from '@services/Auth/Auth.service';
import { prismaMock } from '../../../utils/tests/prisma';
import logger from '../../../config/logger';
import type { ExtendedError } from '../../../utils/error/error';
import jwtMiddleware from '../../../middleware/jwtMiddleware';
import type { RefreshTokenReq } from '@services/Auth/Auth.type';

describe('AuthService.login tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should throw error when user does not exist in database', async () => {
        jest.spyOn(logger, 'error').mockImplementation(jest.fn());
        const loginReq = {
            username: 'test',
            password: 'test',
        };

        prismaMock.user.findUnique.mockResolvedValue(null);

        try {
            await authService.login(loginReq);
        } catch (e) {
            const err = e as ExtendedError;
            expect(err.message).toBe('Username or password is invalid');
            expect(err.statusCode).toBe(401);
        }

        expect(logger.error).toHaveBeenCalledWith(
            'AuthService.login: User not found'
        );
    });
    it('should throw error when password is invalid', async () => {
        jest.mock('bcrypt', () => ({
            compare: jest.fn().mockResolvedValue(false),
        }));

        const loginReq = {
            username: 'test',
            password: 'testPass',
        };

        prismaMock.user.findUnique.mockResolvedValue({
            username: 'testuser',
            password: 'testPass',
            id: 1,
            roleId: 1,
            email: 'email@example.com',
        });

        try {
            await authService.login(loginReq);
        } catch (e) {
            const err = e as ExtendedError;
            expect(err.message).toBe('Username or Password is invalid');
            expect(err.statusCode).toBe(401);
        }
    });
    it('should return token and refresh token', async () => {
        jest.mock('bcrypt', () => ({
            compare: jest.fn().mockResolvedValue(true),
        }));
        jest.spyOn(jwtMiddleware, 'createToken').mockReturnValue('token');
        jest.spyOn(jwtMiddleware, 'createRefreshToken').mockReturnValue(
            'refreshToken'
        );

        const loginReq = {
            username: 'test',
            password: 'testPass',
        };

        prismaMock.user.findUnique.mockResolvedValue({
            username: 'testuser',
            password: 'testPass',
            id: 1,
            roleId: 1,
            email: 'test@example.com',
        });

        const res = await authService.login(loginReq);

        expect(res).toEqual({
            token: 'token',
            refreshToken: 'refreshToken',
        });
    });
});

describe('AuthService.refreshToken tests', () => {
    it('should throw error when user does not exist in database', async () => {
        jest.spyOn(logger, 'error').mockImplementation(jest.fn());

        const refreshTokenReq: RefreshTokenReq = {
            refreshToken: 'refreshToken',
        };

        jest.spyOn(jwtMiddleware, 'decodeUserFromToken').mockReturnValue({
            data: {
                username: 'username',
                id: '1',
                role: 'user',
            },
            iat: 1,
            exp: 1,
        });

        prismaMock.user.findUnique.mockResolvedValue(null);

        try {
            await authService.refreshToken(refreshTokenReq);
        } catch (e) {
            const err = e as ExtendedError;
            expect(err.message).toBe('User not found');
            expect(err.statusCode).toBe(401);
        }
    });
    it('should renew token and refresh token', async () => {
        jest.spyOn(jwtMiddleware, 'decodeUserFromToken').mockReturnValue({
            data: {
                username: 'username',
                id: '1',
                role: 'user',
            },
            iat: 1,
            exp: 1,
        });

        jest.spyOn(jwtMiddleware, 'createToken').mockReturnValue('token');
        jest.spyOn(jwtMiddleware, 'createRefreshToken').mockReturnValue(
            'refreshToken'
        );

        const refreshTokenReq: RefreshTokenReq = {
            refreshToken: 'refreshToken',
        };

        // @ts-ignore we don't need to return entire user object
        prismaMock.user.findUnique.mockResolvedValue({
            username: 'username',
            id: 1,
            role: 'user',
        });

        const res = await authService.refreshToken(refreshTokenReq);

        expect(res).toEqual({ token: 'token', refreshToken: 'refreshToken' });
    });
});
