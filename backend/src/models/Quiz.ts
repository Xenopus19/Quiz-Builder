import { Model, DataTypes } from 'sequelize';
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../database.js';
import type { Question } from './index.js';

class Quiz extends Model<InferAttributes<Quiz>, InferCreationAttributes<Quiz>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare createdAt: CreationOptional<Date>;
  declare questions?: Question[];
}
Quiz.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'quizzes',
    timestamps: false,
  },
);

export type QuizType = InferAttributes<Quiz>;
export type NewQuizType = InferCreationAttributes<Quiz>;

export default Quiz;
