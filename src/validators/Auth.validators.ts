import { z } from 'zod';

const LoginSchema = z.object({
    body: z.object({
        username: z.string().min(1),
        password: z.string().min(1),
    }),
});

const LoginSchemas = { LoginSchema };

export default LoginSchemas;
