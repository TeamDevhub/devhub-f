import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import ErrorPage from '@/pages/ErrorPage';
import MainPage from '@/pages/web/MainPage';
import ProjectListPage from '@/pages/web/projects/ProjectListPage';
import AuthLayout from '@/layout/AuthLayout';
import ProjectDetailPage from '@/pages/web/projects/ProjectDetailPage';
import ProjectCreatePage from '@/pages/web/projects/ProjectCreatePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <ProjectListPage />
          },
          {
            path: 'detail',
            element: <ProjectDetailPage />
          },
          {
            path: 'create',
            element: <ProjectCreatePage />
          },
        ]
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login'
      },
      {
        path: 'signIn'
      }
    ]
  }
]);

export default router;