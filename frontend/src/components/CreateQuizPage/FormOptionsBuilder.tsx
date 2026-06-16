import { Plus, Trash2, Check } from 'lucide-react';

interface FormOptionsBuilderProps {
  options: { optionText: string; isCorrect: boolean }[];
  onUpdateText: (optIdx: number, text: string) => void;
  onToggleCorrect: (optIdx: number) => void;
  onAdd: () => void;
  onRemove: (optIdx: number) => void;
}

export const FormOptionsBuilder = ({
  options,
  onUpdateText,
  onToggleCorrect,
  onAdd,
  onRemove,
}: FormOptionsBuilderProps) => {
  return (
    <div className="space-y-2 border-t border-slate-100 pt-3">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
        Options Layout Config
      </label>
      <div className="space-y-2">
        {options.map((option, optIdx) => (
          <div key={optIdx} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleCorrect(optIdx)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                option.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                  : 'bg-slate-50 border-slate-200 text-slate-300'
              }`}
            >
              <Check size={16} className={option.isCorrect ? 'stroke-[3]' : 'opacity-0'} />
            </button>

            <input
              type="text"
              value={option.optionText}
              onChange={(e) => onUpdateText(optIdx, e.target.value)}
              required
              placeholder={`Option ${optIdx + 1}`}
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />

            <button
              type="button"
              disabled={options.length <= 2}
              onClick={() => onRemove(optIdx)}
              className="text-slate-300 hover:text-red-500 p-1.5 disabled:opacity-30 cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
      >
        <Plus size={14} /> Add Option Choice
      </button>
    </div>
  );
};
