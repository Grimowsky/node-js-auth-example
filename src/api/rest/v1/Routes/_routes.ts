import { Router } from 'express';
import CreateUserRouter from '../Routes/User.route';
import CreateAuthRouter from '../Routes/Auth.route';
import CreateRegisterRouter from '../Routes/Register.route';

const apiV1 = Router()
    .use('/user', CreateUserRouter())
    .use('/auth', CreateAuthRouter())
    .use('/registration', CreateRegisterRouter());

export default apiV1;
