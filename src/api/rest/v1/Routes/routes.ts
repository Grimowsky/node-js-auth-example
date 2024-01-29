import { Router } from 'express';
import authController from '../Controllers/authController';

const apiV1 = Router().use(authController);

export default apiV1;
