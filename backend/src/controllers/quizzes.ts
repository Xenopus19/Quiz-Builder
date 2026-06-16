import { Router } from 'express';
import { addNewQuiz, getAllQuizzes } from '../services/quizzes.js';
import { createQuizSchema } from '../schemas/quiz.schema.js';

const quizzesRouter = Router();

quizzesRouter.get('/', async (req, res) => {
  const quizzes = await getAllQuizzes();
  res.json(quizzes);
});

quizzesRouter.post('/', async (req, res) => {
  try {
    const quizData = createQuizSchema.parse(req.body);
    const newQuiz = await addNewQuiz(quizData);
    res.status(201).json(newQuiz);
  } catch (error: unknown) {
    res
      .status(400)
      .json({
        message: 'An error occurred while creating the quiz',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
  }
});

export default quizzesRouter;
