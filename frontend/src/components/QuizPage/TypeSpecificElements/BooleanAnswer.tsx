import { useState } from 'react';

const BooleanAnswer = () => {
  const [booleanAnswer, setBooleanAnswer] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      {['true', 'false'].map((value) => {
        const isSelected = booleanAnswer === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setBooleanAnswer(value)}
            className={`
              px-5 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all cursor-pointer border
              ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
              }
            `}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default BooleanAnswer;
