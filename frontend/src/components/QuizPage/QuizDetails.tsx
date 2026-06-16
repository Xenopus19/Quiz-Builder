import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { type FullQuizDetails } from '../../services/quizService';
import QuestionItem from './QuestionItem';

interface QuizDetailsProps {
  quiz: FullQuizDetails;
}

const QuizDetails = ({ quiz }: QuizDetailsProps) => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="space-y-3">
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 tracking-wider uppercase transition-colors"
        >
          <ArrowLeft size={14} /> Back to all quizzes
        </Link>
        <div className="border-b border-slate-100 pb-5">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {quiz.title}
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((question, index) => (
          <QuestionItem key={question.id || index} question={question} index={index} />
        ))}
      </div>
    </div>
  );
};

export default QuizDetails;
