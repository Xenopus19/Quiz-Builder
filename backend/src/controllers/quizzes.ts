import { Router } from 'express';
import { addNewQuiz, deleteQuizById, getAllQuizzes, getQuizById } from '../services/quizzes.js';
import { createQuizSchema } from '../schemas/quiz.schema.js';

const quizzesRouter = Router();

quizzesRouter.get('/', async (req, res) => {
  const quizzes = await getAllQuizzes();
  res.json(quizzes);
});

quizzesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const quiz = await getQuizById(id);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
});

quizzesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCount = await deleteQuizById(id);
    if (deletedCount) {
      res.json({ message: 'Quiz deleted successfully' });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error: unknown) {
    throw error instanceof Error
      ? error
      : new Error('Unknown error occurred while deleting the quiz');
  }
});

quizzesRouter.post('/', async (req, res) => {
  try {
    const quizData = createQuizSchema.parse(req.body);
    const newQuiz = await addNewQuiz(quizData);
    res.status(201).json(newQuiz);
  } catch (error: unknown) {
    res.status(400).json({
      message: 'An error occurred while creating the quiz',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default quizzesRouter;
