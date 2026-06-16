import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { QuizFrontService, type FullQuizDetails } from '../../services/quizService';
import QuizDetails from './QuizDetails';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<FullQuizDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadQuizDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await QuizFrontService.getQuizById(id);
        setQuiz(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quiz.');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400 gap-3">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
        <p className="text-sm font-medium">Loading quiz...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto py-10">
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 text-red-700 shadow-sm">
          <AlertCircle className="shrink-0 text-red-500" size={22} />
          <div className="text-sm font-medium">{error || 'Quiz structure not found.'}</div>
        </div>
        <Link to="/quizzes" className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          <ArrowLeft size={16} /> Back to all quizzes
        </Link>
      </div>
    );
  }

  return <QuizDetails quiz={quiz} />;
};

export default QuizPage;