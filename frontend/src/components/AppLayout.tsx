import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PlusCircle, HelpCircle } from 'lucide-react';

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/quizzes', label: 'All Quizzes', icon: HelpCircle },
    { path: '/create', label: 'Create Quiz', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-sm shadow-indigo-100">
              Q
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800">
              QuizBuilder
            </span>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150
                    ${
                      active
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon size={18} className={active ? 'text-indigo-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl w-full mx-auto px-4 py-6 sm:py-8 md:px-8 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
