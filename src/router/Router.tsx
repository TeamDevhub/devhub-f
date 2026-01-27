import AuthLayout from '@/layout/AuthLayout';
import MainLayout from '@/layout/MainLayout';
import ErrorPage from '@/pages/ErrorPage';
import BoardCreatePage from '@/pages/web/boards/BoardCreatePage';
import BoardDetailPage from '@/pages/web/boards/BoardDetailPage';
import BoardListPage from '@/pages/web/boards/BoardListPage';
import BoardModifyPage from '@/pages/web/boards/BoardModifyPage';
import LoginPage from '@/pages/web/login/LoginPage';
import MainPage from '@/pages/web/MainPage';
import MyBoardPage from '@/pages/web/mypage/boards/MyBoardPage';
import MyHomeModifyPage from '@/pages/web/mypage/home/MyHomeModifyPage';
import MyHomePage from '@/pages/web/mypage/home/MyHomePage';
import MyProjectApplicantPage from '@/pages/web/mypage/projects/MyProjectApplicantPage';
import MyProjectListPage from '@/pages/web/mypage/projects/MyProjectListPage';
import ProjectApplyPage from '@/pages/web/projects/ProjectApplyPage';
import ProjectCreatePage from '@/pages/web/projects/ProjectCreatePage';
import ProjectDetail from '@/pages/web/projects/ProjectDetail';
import ProjectDetailPage from '@/pages/web/projects/ProjectDetailPage';
import ProjectList from '@/pages/web/projects/ProjectList';
import ProjectListPage from '@/pages/web/projects/ProjectListPage';
import SignInPage1 from '@/pages/web/signin/SignInPage1';
import SignInPage2 from '@/pages/web/signin/SignInPage2';
import SkillTrendsPage from '@/pages/web/skilltrends/SkillTrendsPage';
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
        path: 'signin1',
        children: [
          {
            index: true,
            element: <SignInPage1 />
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
        path: 'signin1',
        children: [
          {
            index: true,
            element: <SignInPage1 />
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