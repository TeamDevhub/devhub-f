import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import ErrorPage from '@/pages/ErrorPage';
import MainPage from '@/pages/web/MainPage';
import ProjectListPage from '@/pages/web/projects/ProjectListPage';
import AuthLayout from '@/layout/AuthLayout';
import ProjectDetailPage from '@/pages/web/projects/ProjectDetailPage';
import ProjectCreatePage from '@/pages/web/projects/ProjectCreatePage';
import ProjectApplyPage from '@/pages/web/projects/ProjectApplyPage';
import BoardListPage from '@/pages/web/boards/BoardListPage';
import BoardDetailPage from '@/pages/web/boards/BoardDetailPage';
import BoardCreatePage from '@/pages/web/boards/BoardCreatePage';
import BoardModifyPage from '@/pages/web/boards/BoardModifyPage';
import LoginPage from '@/pages/web/login/LoginPage';
import SignupPage from '@/pages/web/signup/SignupPage';
import SignInPage2 from '@/pages/web/signup/SignInPage2';
import ProjectList from '@/pages/web/projects/ProjectList';

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
            element: <ProjectList />
          },
        ]
      },
      {
        path: 'boards',
        children: [
          {
            index: true,
            element: <BoardListPage />
          },
          {
            path: 'detail',
            element: <BoardDetailPage />
          },
          {
            path: 'create',
            element: <BoardCreatePage />
          },
          {
            path: 'modify',
            element: <BoardModifyPage />
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
        path: 'login',
        children: [
          {
            index: true,
            element: <LoginPage />
          }
        ]
      },
      {
        path: 'signup',
        children: [
          {
            index: true,
            element: <SignupPage />
          }
        ]
      },
      {
        path: 'signin2',
        children: [
          {
            index: true,
            element: <SignInPage2 />
          }
        ]
      }
    ]
  },
  {
    path: '/design',
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
          {
            path: 'apply',
            element: <ProjectApplyPage />
          },
        ]
      },
      {
        path: 'boards',
        children: [
          {
            index: true,
            element: <BoardListPage />
          },
          {
            path: 'detail',
            element: <BoardDetailPage />
          },
          {
            path: 'create',
            element: <BoardCreatePage />
          },
          {
            path: 'modify',
            element: <BoardModifyPage />
          },
        ]
      },
    ],
  },
  {
    path: '/design/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        children: [
          {
            index: true,
            element: <LoginPage />
          }
        ]
      },
      {
        path: 'signup',
        children: [
          {
            index: true,
            element: <SignupPage />
          }
        ]
      },
      {
        path: 'signin2',
        children: [
          {
            index: true,
            element: <SignInPage2 />
          }
        ]
      }
    ]
  }
]);

export default router;