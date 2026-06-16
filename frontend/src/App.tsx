import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AllQuizzes from './components/AllQuizzes';
import MainPage from './components/MainPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
       {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/quizzes",
        element: <AllQuizzes />,
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
