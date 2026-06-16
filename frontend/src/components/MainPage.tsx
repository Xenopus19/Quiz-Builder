import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800">Welcome to QuizBuilder</h1>
      <div className="mt-6">
        <button
          onClick={() => navigate('/quizzes')}
          className="cursor-pointer p-4 border border-slate-200 rounded-xl bg-white shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-700">To All Quizzes</h2>

          <p className="text-sm text-slate-500 mt-1"></p>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
