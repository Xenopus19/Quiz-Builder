import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { type FullQuizDetails } from '../../../services/quizService';

type OptionsType = NonNullable<FullQuizDetails['questions'][number]['options']>;

interface CheckboxAnswerProps {
  options: OptionsType;
}

const CheckboxAnswer = ({ options }: CheckboxAnswerProps) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleCheckboxToggle = (optIdx: number) => {
    setSelectedOptions((prev) =>
      prev.includes(optIdx) ? prev.filter((idx) => idx !== optIdx) : [...prev, optIdx],
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
      {options.map((option, optIdx) => {
        const isSelected = selectedOptions.includes(optIdx);
        return (
          <button
            key={option.id || optIdx}
            type="button"
            onClick={() => handleCheckboxToggle(optIdx)}
            className={`
              flex items-center justify-between gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer w-full
              ${
                isSelected
                  ? 'bg-indigo-50/60 border-indigo-300 text-indigo-900 font-medium'
                  : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100/70'
              }
            `}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSelected ? (
                <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
              ) : (
                <Circle size={16} className="text-slate-300 shrink-0" />
              )}
              <span className="text-sm truncate">{option.optionText}</span>
            </div>

            {isSelected && (
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-md shrink-0">
                Selected
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CheckboxAnswer;
