import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config.js';
import { Quiz } from './models/index.js';
import path from 'path';
import fs from 'fs';
import { addNewQuiz } from './services/quizzes.js';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_URL || './database.sqlite',
  logging: false,
});

const addTestData = async () => {
  const quizCount = await Quiz.count();
  if (quizCount > 0) {
    return;
  }
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'quizSeed.json');

  const rawData = fs.readFileSync(jsonPath, 'utf-8');
  const quizData = JSON.parse(rawData);
  await addNewQuiz(quizData);
};

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await addTestData();
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
