import { Router } from 'express';
import CreateAuthRouter from '../Routes/Auth.route';

const apiV1 = Router().use(CreateAuthRouter());

export default apiV1;
