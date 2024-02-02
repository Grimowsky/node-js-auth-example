import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import apiV1 from './api/rest/v1/Routes/_routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/v1', apiV1);
app.use(errorHandler());

export { app };
