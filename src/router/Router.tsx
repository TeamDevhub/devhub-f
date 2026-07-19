import AuthLayout from '@/layout/AuthLayout';
import MainLayout from '@/layout/MainLayout';
import BoardCreatePage from '@/pages/_design/web/boards/BoardCreatePage';
import BoardDetailPage from '@/pages/_design/web/boards/BoardDetailPage';
import BoardListPage from '@/pages/_design/web/boards/BoardListPage';
import BoardModifyPage from '@/pages/_design/web/boards/BoardModifyPage';
import LoginPage from '@/pages/_design/web/login/LoginPage';
import MyBoardPage from '@/pages/_design/web/mypage/boards/MyBoardPage';
import MyHomeModifyPage from '@/pages/_design/web/mypage/home/MyHomeModifyPage';
import MyHomePage from '@/pages/_design/web/mypage/home/MyHomePage';
import MyProjectApplicantPage from '@/pages/_design/web/mypage/projects/MyProjectApplicantPage';
import MyProjectListPage from '@/pages/_design/web/mypage/projects/MyProjectListPage';
import ProjectApplyPage from '@/pages/_design/web/projects/ProjectApplyPage';
import ProjectCreatePage from '@/pages/_design/web/projects/ProjectCreatePage';
import ProjectDetailPage from '@/pages/_design/web/projects/ProjectDetailPage';
// import ProjectListPage from '@/pages/_design/web/projects/ProjectListPage';
import SignupPage from '@/pages/_design/web/signup/SignInPage1';
import SignInPage2 from '@/pages/_design/web/signup/SignInPage2';
import SkillTrendsPage from '@/pages/_design/web/skilltrends/SkillTrendsPage';
import RouteErrorBoundary from '@/pages/error/RouteErrorBoundary';
import NotFoundPage from '@/pages/error/NotFoundPage';
import ComingSoonPage from '@/pages/error/ComingSoonPage';
import RequireAuthRoute from '@/components/_common/auth/RequireAuthRoute';
import BoardList from '@/pages/web/boards/BoardList';
import BoardCreate from '@/pages/web/boards/BoardCreate';
import BoardDetail from '@/pages/web/boards/BoardDetail';
import BoardUpdate from '@/pages/web/boards/BoardUpdate';
import Login from '@/pages/web/login/Login';
import ProfileLayout from '@/layout/ProfileLayout';
import MyProfileHome from '@/pages/web/profile/home';
import MyProfileUpdateWrapper from '@/pages/web/profile/update';
import MyProfileProjectListPage from '@/pages/web/profile/projects';
import MyProfileBoardList from '@/pages/web/profile/boards';
import HomePage from '@/pages/web/Home';
import SkillTrendPage from '@/pages/web/SkillTrend';
import ProjectCreate from '@/pages/web/projects/ProjectCreate';
import ProjectDetail from '@/pages/web/projects/ProjectDetail';
import ProjectList from '@/pages/web/projects/ProjectList';
import ProjectUpdate from '@/pages/web/projects/ProjectUpdate';
import Signup from '@/pages/web/signup/Signup';
import { createBrowserRouter } from 'react-router-dom';
import UserListPage from '@/pages/_design/admin/users/UserListPage';
import UserReportPage from '@/pages/_design/admin/users/UserReportPage';
import UserDetailPage from '@/pages/_design/admin/users/UserDetailPage';
import ProjectListPage2 from '@/pages/_design/admin/projects/ProjectListPage';
import ProjectDetailPage2 from '@/pages/_design/admin/projects/ProjectDetailPage';
import CodeManagementPage from '@/pages/_design/admin/codes/CodeManagementPage';
import FormManagementPage from '@/pages/_design/admin/forms/FormManagementPage';
import BoardManagementPage from '@/pages/_design/admin/boards/BoardManagementPage';
import BannerManagementPage from '@/pages/_design/admin/banner/BannerManagementPage';
import TermsManagementPage from '@/pages/_design/admin/terms/TermsManagementPage';
import Banner from '@/pages/admin/Banner';
import BoardAdmin from '@/pages/admin/Boards';
import AdminUserList from '@/pages/admin/Users/UserList';
import AdminUserDetail from '@/pages/admin/Users/UserDetail';
import AdminProjectList from '@/pages/admin/Projects/List';
import AdminProjectDetail from '@/pages/admin/Projects/Detail';
import AdminReportList from '@/pages/admin/Reports/ReportList';
import DesignMainPage from '@/pages/_design/web/main/DesignMainPage';
import AdminLayout from '@/layout/AdminLayout';
import Codes from '@/pages/admin/Codes';
import FormsPage from '@/pages/admin/Form';

import ProjectApplyList from '@/pages/web/projects/ProjectApplyList';
import ProjectApply from '@/pages/web/projects/ProjectApply';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'skilltrend',
        element: <SkillTrendPage />,
      },
      {
        path: 'profile',
        element: <RequireAuthRoute />,
        children: [
          {
            element: <ProfileLayout />,
            children: [
              {
                index: true,
                element: <MyProfileHome />,
              },
              {
                path: 'update',
                element: <MyProfileUpdateWrapper />,
              },
              {
                path: 'projects/:paramTabValue?',
                element: <MyProfileProjectListPage />,
              },
              {
                path: 'boards',
                element: <MyProfileBoardList />,
              },
            ],
          },
        ],
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <ProjectList />,
          },
          {
            path: 'detail/:projectGuid',
            element: <ProjectDetail />,
          },
          {
            path: 'apply',
            element: <ComingSoonPage />,
          },
          {
            path: 'create',
            element: <ProjectCreate />,
          },
          {
            path: 'update/:projectGuid',
            element: <ProjectUpdate />,
          },
          {
            path: 'applyList/:projectGuid',
            element: <ProjectApplyList />,
          },
          {
            path: 'apply',
            element: <ProjectApply />,
          },
        ]
      },
      {
        path: 'boards',
        children: [
          {
            index: true,
            element: <BoardList />,
          },
          {
            path: 'create',
            element: <BoardCreate />,
          },
          {
            path: 'detail/:boardGuid',
            element: <BoardDetail />,
          },
          {
            path: 'update/:boardGuid',
            element: <BoardUpdate />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'banner',
        children: [
          {
            index: true,
            element: <Banner />,
          },
        ],
      },
      {
        path: 'boards',
        children: [
          {
            index: true,
            element: <BoardAdmin />,
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <AdminUserList />,
          },
          {
            path: ':userGuid',
            element: <AdminUserDetail />,
          },
        ],
      },
      {
        path: 'reports',
        children: [
          {
            index: true,
            element: <AdminReportList />,
          },
        ],
      },
      {
        path: 'codes',
        children: [
          {
            index: true,
            element: <Codes />,
          },
        ],
      },
      {
        path: 'forms',
        children: [
          {
            index: true,
            element: <FormsPage />,
          },
        ],
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: <AdminProjectList />,
          },
          {
            path: ':projectGuid',
            element: <AdminProjectDetail />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'login',
        children: [
          {
            index: true,
            element: <Login />,
          },
        ],
      },
      {
        path: 'signup',
        children: [
          {
            index: true,
            element: <Signup />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '/design',
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'signup',
            element: <SignupPage />,
          },
          {
            path: 'signin2',
            element: <SignInPage2 />,
          },
        ],
      },
      {
        path: 'web',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DesignMainPage />,
          },
          {
            path: 'projects',
            children: [
              {
                path: 'detail',
                element: <ProjectDetailPage />,
              },
              {
                path: 'create',
                element: <ProjectCreatePage />,
              },
              {
                path: 'apply',
                element: <ProjectApplyPage />,
              },
            ],
          },
          {
            path: 'boards',
            children: [
              {
                index: true,
                element: <BoardListPage />,
              },
              {
                path: 'detail',
                element: <BoardDetailPage />,
              },
              {
                path: 'create',
                element: <BoardCreatePage />,
              },
              {
                path: 'modify',
                element: <BoardModifyPage />,
              },
            ],
          },
          {
            path: 'mypage',
            children: [
              {
                path: 'home',
                element: <MyHomePage />,
              },
              {
                path: 'home/modify',
                element: <MyHomeModifyPage />,
              },
              {
                path: 'projects/list',
                element: <MyProjectListPage />,
              },
              {
                path: 'projects/list/applicants',
                element: <MyProjectApplicantPage />,
              },
              {
                path: 'boards',
                element: <MyBoardPage />,
              },
            ],
          },
          {
            path: 'skilltrend',
            children: [
              {
                index: true,
                element: <SkillTrendsPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'users',
            children: [
              {
                path: 'list',
                element: <UserListPage />,
              },
              {
                path: 'detail',
                element: <UserDetailPage />,
              },
              {
                path: 'reports',
                element: <UserReportPage />,
              },
            ],
          },
          {
            path: 'projects',
            children: [
              {
                path: 'list',
                element: <ProjectListPage2 />,
              },
              {
                path: 'detail',
                element: <ProjectDetailPage2 />,
              },
            ],
          },
          {
            path: 'codes',
            children: [
              {
                index: true,
                element: <CodeManagementPage />,
              },
            ],
          },
          {
            path: 'forms',
            children: [
              {
                index: true,
                element: <FormManagementPage />,
              },
            ],
          },
          {
            path: 'boards',
            children: [
              {
                index: true,
                element: <BoardManagementPage />,
              },
            ],
          },
          {
            path: 'banner',
            children: [
              {
                index: true,
                element: <BannerManagementPage />,
              },
            ],
          },
          {
            path: 'terms',
            children: [
              {
                index: true,
                element: <TermsManagementPage />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
