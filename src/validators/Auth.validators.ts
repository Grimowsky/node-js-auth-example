import { z } from 'zod';

const LoginSchema = z.object({
    body: z.object({
        username: z.string().min(1),
        password: z.string().min(1),
    }),
});

const RefreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, 'Provide refresh token'),
    }),
});

const LoginSchemas = { LoginSchema, RefreshTokenSchema };

export default LoginSchemas;
