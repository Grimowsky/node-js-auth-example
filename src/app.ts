import express from 'express';
import cors from 'cors';
import { errorHandler } from './utils/error/error';
import dotenv from 'dotenv-safe';
import { createRouter as apiV1Router } from './api/rest/v1/Routes/routes';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/v1', apiV1Router());
app.use(errorHandler());

export { app };
