import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { type CreateQuizInput } from '../../services/quizService';
import { FormQuestionCard } from './FormQuestionCard';

type FormQuestion = CreateQuizInput['questions'][number];

interface CreateQuizFormProps {
  onSubmit: (data: CreateQuizInput) => void;
  isSubmitting: boolean;
}

const CreateQuizForm = ({ onSubmit, isSubmitting }: CreateQuizFormProps) => {
  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<FormQuestion[]>([
    { type: 'boolean', questionText: '', correctAnswer: 'true' },
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { type: 'boolean', questionText: '', correctAnswer: 'true' }]);
  };

  const removeQuestion = (qIdx: number) => {
    setQuestions((prev) => prev.filter((_, idx) => idx !== qIdx));
  };

  const updateQuestionText = (qIdx: number, text: string) => {
    setQuestions((prev) => prev.map((q, idx) => (idx === qIdx ? { ...q, questionText: text } : q)));
  };

  const handleTypeChange = (qIdx: number, newType: 'boolean' | 'input' | 'checkbox') => {
    setQuestions((prev) =>
      prev.map((q, idx) => {
        if (idx !== qIdx) return q;

        if (newType === 'checkbox') {
          return {
            type: 'checkbox',
            questionText: q.questionText,
            options: [
              { optionText: '', isCorrect: false },
              { optionText: '', isCorrect: false },
            ],
          };
        }

        return {
          type: newType,
          questionText: q.questionText,
          correctAnswer: newType === 'boolean' ? 'true' : '',
        };
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a quiz title.');
    if (questions.length === 0) return alert('Please add at least one question.');

    onSubmit({ title, questions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2">
        <label className="block text-sm font-bold text-slate-700 tracking-tight">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. Development Quiz"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold"
        />
      </div>

      <div className="space-y-4">
        {questions.map((question, qIdx) => (
          <FormQuestionCard
            key={qIdx}
            question={question}
            index={qIdx}
            onRemove={() => removeQuestion(qIdx)}
            onUpdateText={(text) => updateQuestionText(qIdx, text)}
            onTypeChange={(newType) => handleTypeChange(qIdx, newType)}
            onUpdateField={(fields: Partial<FormQuestion>) => {
              setQuestions((prev) =>
                prev.map((q, idx) => (idx === qIdx ? { ...q, ...fields } : q)),
              );
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={addQuestion}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <Plus size={16} /> Add Question
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
        >
          Post Quiz
        </button>
      </div>
    </form>
  );
};

export default CreateQuizForm;
