import Quiz from './Quiz.js';
import Question from './Question.js';
import Option from './Option.js';

Quiz.hasMany(Question, { foreignKey: 'quizId', as: 'questions' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

Question.hasMany(Option, { foreignKey: 'questionId', as: 'options' });
Option.belongsTo(Question, { foreignKey: 'questionId' });

export { Quiz, Question, Option };