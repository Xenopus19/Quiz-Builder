import { Trash2, ToggleLeft, Type, ListChecks } from 'lucide-react';
import { FormOptionsBuilder } from './FormOptionsBuilder';
import { type CreateQuizInput } from '../../services/quizService';

type FormQuestion = CreateQuizInput['questions'][number];

interface FormQuestionCardProps {
  question: FormQuestion;
  index: number;
  onRemove: () => void;
  onUpdateText: (text: string) => void;
  onTypeChange: (newType: 'boolean' | 'input' | 'checkbox') => void;
  onUpdateField: (field: Partial<FormQuestion>) => void;
}

export const FormQuestionCard = ({
  question,
  index,
  onRemove,
  onUpdateText,
  onTypeChange,
  onUpdateField,
}: FormQuestionCardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <span className="w-7 h-7 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg flex items-center justify-center">
          #{index + 1}
        </span>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'boolean', label: 'True/False', icon: ToggleLeft },
            { id: 'input', label: 'Text Input', icon: Type },
            { id: 'checkbox', label: 'Checkbox', icon: ListChecks },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTypeChange(t.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                question.type === t.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-slate-400 hover:text-red-600 p-1.5 cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Question Text
        </label>
        <input
          type="text"
          value={question.questionText}
          onChange={(e) => onUpdateText(e.target.value)}
          required
          placeholder="Type your question statement..."
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
        />
      </div>

      {question.type === 'boolean' && (
        <div className="space-y-1.5">
          <div className="flex gap-2">
            {['true', 'false'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onUpdateField({ correctAnswer: val })}
                className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  question.correctAnswer === val
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 text-slate-600'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      )}

      {question.type === 'input' && (
        <div className="space-y-1.5 max-w-md">
          <input
            type="text"
            value={question.correctAnswer || ''}
            onChange={(e) => onUpdateField({ correctAnswer: e.target.value })}
            required
            placeholder="Correct answer"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-emerald-700 font-medium"
          />
        </div>
      )}

      {question.type === 'checkbox' && question.options && (
        <FormOptionsBuilder
          options={question.options}
          onUpdateText={(optIdx, text) => {
            const nextOpt = question.options!.map((o, i) =>
              i === optIdx ? { ...o, optionText: text } : o,
            );
            onUpdateField({ options: nextOpt });
          }}
          onToggleCorrect={(optIdx) => {
            const nextOpt = question.options!.map((o, i) =>
              i === optIdx ? { ...o, isCorrect: !o.isCorrect } : o,
            );
            onUpdateField({ options: nextOpt });
          }}
          onAdd={() =>
            onUpdateField({ options: [...question.options!, { optionText: '', isCorrect: false }] })
          }
          onRemove={(optIdx) =>
            onUpdateField({ options: question.options!.filter((_, i) => i !== optIdx) })
          }
        />
      )}
    </div>
  );
};
