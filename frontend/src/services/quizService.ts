import { apiClient } from './api.client.js';

export interface OptionItem {
  id?: string;
  optionText: string;
  isCorrect: boolean;
}

export interface QuestionItem {
  id?: string;
  type: 'boolean' | 'input' | 'checkbox';
  questionText: string;
  correctAnswer?: string | null;
  options?: OptionItem[];
}

export interface QuizItem {
  id: string;
  title: string;
  questionsCount: number;
  createdAt?: string;
}

export interface FullQuizDetails extends Omit<QuizItem, 'questionsCount'> {
  questions: QuestionItem[];
}

export interface CreateQuizInput {
  title: string;
  questions: Omit<QuestionItem, 'id'>[];
}

export const QuizFrontService = {
  getAllQuizzes: async (): Promise<QuizItem[]> => {
    return apiClient.get('/quizzes');
  },

  getQuizById: async (id: string): Promise<FullQuizDetails> => {
    return apiClient.get(`/quizzes/${id}`);
  },

  createQuiz: async (quizData: CreateQuizInput): Promise<QuizItem> => {
    return apiClient.post('/quizzes', quizData);
  },

  deleteQuiz: async (id: string): Promise<void> => {
    return apiClient.delete(`/quizzes/${id}`);
  },
};
