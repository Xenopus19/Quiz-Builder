import express from 'express';
import cors from 'cors';
import quizzesRouter from './controllers/quizzes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/quizzes', quizzesRouter);

export default app;
