import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AllQuizzes from './components/AllQuizzes';
import MainPage from './components/MainPage';
import QuizPage from './components/QuizPage';
import CreateQuizPage from './components/CreateQuizPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/quizzes',
        element: <AllQuizzes />,
      },
      {
        path: '/quizzes/:id',
        element: <QuizPage />,
      },
      {
        path: "/create",
        element: <CreateQuizPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
