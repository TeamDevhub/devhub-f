import AuthLayout from '@/layout/AuthLayout';
import MainLayout from '@/layout/MainLayout';
import BoardCreatePage from '@/pages/design/boards/BoardCreatePage';
import BoardDetailPage from '@/pages/design/boards/BoardDetailPage';
import BoardListPage from '@/pages/design/boards/BoardListPage';
import BoardModifyPage from '@/pages/design/boards/BoardModifyPage';
import LoginPage from '@/pages/design/login/LoginPage';
import MyBoardPage from '@/pages/design/mypage/boards/MyBoardPage';
import MyHomeModifyPage from '@/pages/design/mypage/home/MyHomeModifyPage';
import MyHomePage from '@/pages/design/mypage/home/MyHomePage';
import MyProjectApplicantPage from '@/pages/design/mypage/projects/MyProjectApplicantPage';
import MyProjectListPage from '@/pages/design/mypage/projects/MyProjectListPage';
import ProjectApplyPage from '@/pages/design/projects/ProjectApplyPage';
import ProjectCreatePage from '@/pages/design/projects/ProjectCreatePage';
import ProjectDetailPage from '@/pages/design/projects/ProjectDetailPage';
import ProjectListPage from '@/pages/design/projects/ProjectListPage';
import SignupPage from '@/pages/design/signup/SignInPage1';
import SignInPage2 from '@/pages/design/signup/SignInPage2';
import SkillTrendsPage from '@/pages/design/skilltrends/SkillTrendsPage';
import ErrorPage from '@/pages/ErrorPage';
import BoardList from '@/pages/web/boards/BoardList';
import BoardCreate from '@/pages/web/boards/BoardCreate';
import Login from '@/pages/web/login/Login';
import MainPage from '@/pages/web/MainPage';
import ProjectCreate from '@/pages/web/projects/ProjectCreate';
import ProjectDetail from '@/pages/web/projects/ProjectDetail';
import ProjectList from '@/pages/web/projects/ProjectList';
import Signup from '@/pages/web/signup/Signup';
import { createBrowserRouter } from 'react-router-dom';

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
          {
            path: 'detail',
            element: <ProjectDetail />
          },
          {
            path: 'create',
            element: <ProjectCreate />
          },
        ]
      },
      {
        path: 'boards',
        children: [
          {
            index: true,
            element: <BoardList />
          },
          {
            path: 'create',
            element: <BoardCreate />
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
            element: <Login />
          }
        ]
      },
      {
        path: 'signup',
        children: [
          {
            index: true,
            element: <Signup />
          }
        ]
      },
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
      {
        path: 'mypage',
        children: [
          {
            path: 'home',
            element: <MyHomePage />
          },
          {
            path: 'home/modify',
            element: <MyHomeModifyPage />
          },
          {
            path: 'projects/list',
            element: <MyProjectListPage />
          },
          {
            path: 'projects/list/applicants',
            element: <MyProjectApplicantPage />
          },
          {
            path: 'boards',
            element: <MyBoardPage />
          }
        ]
      },
      {
        path: 'skilltrends',
        children: [
          {
            index: true,
            element: <SkillTrendsPage />
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