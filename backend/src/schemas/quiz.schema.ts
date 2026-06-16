import { z } from 'zod';

const optionSchema = z.object({
  optionText: z.string().min(1, 'Option text cannot be empty'),
  isCorrect: z.boolean(),
});

const baseQuestion = z.object({
  questionText: z.string().min(3, 'Question must contain at least 3 characters'),
});

const booleanQuestionSchema = baseQuestion.extend({
  type: z.literal('boolean'),
  correctAnswer: z.enum(['true', 'false']),
});

const inputQuestionSchema = baseQuestion.extend({
  type: z.literal('input'),
  correctAnswer: z.string().min(1, 'For text questions, a correct answer is required'),
});

const checkboxQuestionSchema = baseQuestion.extend({
  type: z.literal('checkbox'),
  options: z.array(optionSchema).min(1, 'Need at least one option for checkbox question'),
});

const questionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  questions: z.array(questionSchema).min(1, 'Quiz must contain at least one question'),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
