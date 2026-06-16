import { Sequelize } from 'sequelize';
import { Question, Quiz, Option } from '../models/index.js';
import type { CreateQuizInput } from '../schemas/quiz.schema.js';
import { sequelize } from '../database.js';

const getAllQuizzes = async () => {
  const quizzes = await Quiz.findAll({
    attributes: [
      'id',
      'title',
      'createdAt',
      [
        Sequelize.literal(`(
            SELECT COUNT(*)
            FROM questions AS qn
            WHERE qn.quiz_id = Quiz.id
          )`),
        'questionsCount',
      ],
    ],
  });

  return quizzes;
};

const addNewQuiz = async (quizData: CreateQuizInput) => {
  const { title, questions } = quizData;

  return await sequelize.transaction(async (t) => {
    const newQuiz = await Quiz.create({ title }, { transaction: t });

    for (const q of questions) {
      const createdQuestion = await Question.create(
        {
          quizId: newQuiz.id,
          type: q.type,
          questionText: q.questionText,
          correctAnswer: q.type !== 'checkbox' ? q.correctAnswer : null,
        },
        { transaction: t },
      );

      if (q.type === 'checkbox' && 'options' in q) {
        for (const opt of q.options) {
          await Option.create(
            {
              questionId: createdQuestion.id,
              optionText: opt.optionText,
              isCorrect: opt.isCorrect,
            },
            { transaction: t },
          );
        }
      }
    }

    return newQuiz;
  });
};

const getQuizById = async (id: string) => {
  const quiz = await Quiz.findByPk(id, {
    include: [
      {
        model: Question,
        as: 'questions',
        include: [
          {
            model: Option,
            as: 'options',
          },
        ],
      },
    ],
  });

  return quiz;
};

const deleteQuizById = async (id: string) => {
  const deletedCount = await Quiz.destroy({ where: { id } });
  return deletedCount;
};

export { getAllQuizzes, addNewQuiz, getQuizById, deleteQuizById };
