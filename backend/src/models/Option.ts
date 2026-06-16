import { Model, DataTypes } from 'sequelize';
import type { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../database.js';

class Option extends Model<InferAttributes<Option>, InferCreationAttributes<Option>> {
  declare id: CreationOptional<string>;
  declare questionId: string;
  declare optionText: string;
  declare isCorrect: boolean;
}

Option.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    optionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'options',
    timestamps: false,
  },
);

export type OptionType = InferAttributes<Option>;
export type NewOptionType = InferCreationAttributes<Option>;

export default Option;
