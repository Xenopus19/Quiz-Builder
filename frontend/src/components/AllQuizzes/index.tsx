import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuizFrontService as quizService } from '../../services/quizService';
import QuizCard from './QuizCard';

interface QuizItem {
  id: string;
  title: string;
  questionsCount: number;
}

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await quizService.getAllQuizzes();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quizzes from the server.');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleDeleteQuiz = async (id: string) => {
    try {
      await quizService.deleteQuiz(id);
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error executing deletion task.');
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl text-centerfont-extrabold tracking-tight text-slate-900 sm:text-3xl">
            All quizzes
          </h1>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <p className="text-sm font-medium">Loading...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl p-4 text-red-700 max-w-2xl mx-auto shadow-sm">
          <AlertCircle className="shrink-0 text-red-500" size={22} />
          <div className="text-sm font-medium">{error}</div>
        </div>
      )}

      {!isLoading && !error && quizzes.length === 0 && (
        <div className="text-center py-16 px-4 border-2 border-slate-200 rounded-3xl max-w-md mx-auto mt-6 bg-white/50">
          <p className="text-slate-600 font-medium">No quizzes available yet.</p>
        </div>
      )}

      {!isLoading && !error && quizzes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionsCount={quiz.questionsCount || 0}
              onDelete={handleDeleteQuiz}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default AllQuizzes;