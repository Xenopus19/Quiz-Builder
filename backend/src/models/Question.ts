import { Model, DataTypes } from 'sequelize';
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../database.js';

class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  declare id: CreationOptional<string>;
  declare quizId: string;
  declare type: 'boolean' | 'input' | 'checkbox';
  declare questionText: string;
  declare correctAnswer: string | null;
  declare createdAt: CreationOptional<Date>;
}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quizId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'quizzes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    correctAnswer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'questions',
    timestamps: false,
  },
);

export type QuestionType = InferAttributes<Question>;
export type NewQuestionType = InferCreationAttributes<Question>;

export default Question;
