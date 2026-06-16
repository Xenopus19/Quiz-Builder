import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { QuizFrontService, type CreateQuizInput } from '../../services/quizService';
import CreateQuizForm from './CreateQuizForm';

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (formData: CreateQuizInput) => {
    try {
      setIsSubmitting(true);
      setError(null);

      await QuizFrontService.createQuiz(formData);

      navigate('/quizzes');
    } catch (err: unknown) {
      setError((err as Error).message || 'Failed to create quiz schema templates.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="space-y-2">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 tracking-wider uppercase transition-colors"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Create New Quiz
        </h1>
        <p className="text-sm text-slate-500">
          Design a dynamic quiz schema structural mapping to populate relational databases.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 text-red-700 shadow-sm animate-in fade-in zoom-in-95 duration-150">
          <AlertCircle className="shrink-0 text-red-500" size={22} />
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}

      <div className={isSubmitting ? 'pointer-events-none opacity-60 transition-opacity' : ''}>
        <CreateQuizForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[1px] flex flex-col items-center justify-center gap-3 z-50">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
            <Loader2 className="animate-spin text-indigo-600" size={24} />
            <span className="text-sm font-semibold text-slate-700">
              Writing database records...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;
