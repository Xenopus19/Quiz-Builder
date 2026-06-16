import { Link } from 'react-router-dom';
import { HelpCircle, Trash2 } from 'lucide-react';

interface QuizCardProps {
  id: string;
  title: string;
  questionsCount: number;
  onDelete: (id: string) => void;
}

const QuizCard = ({ id, title, questionsCount, onDelete }: QuizCardProps) => {
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex items-start justify-between gap-4">
      
      <Link
        to={`/quizzes/${id}`}
        className="absolute inset-0 z-0 rounded-2xl cursor-pointer"
        aria-label={`View ${title}`}
      />

      <div className="space-y-3 min-w-0 relative z-0 pointer-events-none">
        <h3 className="font-bold text-lg text-slate-800 tracking-tight truncate group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl w-fit border border-slate-100">
          <HelpCircle size={16} className="text-slate-400" />
          <span>
            {questionsCount} {questionsCount === 1 ? 'question' : 'questions'}
          </span>
        </div>
      </div>

      <button
        onClick={handleDeleteClick}
        className="relative z-10 p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-150 shrink-0 cursor-pointer border border-transparent hover:border-red-100"
        title="Delete Quiz"
      >
        <Trash2 size={20} />
      </button>

    </div>
  );
};

export default QuizCard;