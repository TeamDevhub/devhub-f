import AuthLayout from '@/layout/AuthLayout';
import MainLayout from '@/layout/MainLayout';
import BoardCreatePage from '@/pages/design/web/boards/BoardCreatePage';
import BoardDetailPage from '@/pages/design/web/boards/BoardDetailPage';
import BoardListPage from '@/pages/design/web/boards/BoardListPage';
import BoardModifyPage from '@/pages/design/web/boards/BoardModifyPage';
import LoginPage from '@/pages/design/web/login/LoginPage';
import MyBoardPage from '@/pages/design/web/mypage/boards/MyBoardPage';
import MyHomeModifyPage from '@/pages/design/web/mypage/home/MyHomeModifyPage';
import MyHomePage from '@/pages/design/web/mypage/home/MyHomePage';
import MyProjectApplicantPage from '@/pages/design/web/mypage/projects/MyProjectApplicantPage';
import MyProjectListPage from '@/pages/design/web/mypage/projects/MyProjectListPage';
import ProjectApplyPage from '@/pages/design/web/projects/ProjectApplyPage';
import ProjectCreatePage from '@/pages/design/web/projects/ProjectCreatePage';
import ProjectDetailPage from '@/pages/design/web/projects/ProjectDetailPage';
// import ProjectListPage from '@/pages/design/web/projects/ProjectListPage';
import SignupPage from '@/pages/design/web/signup/SignInPage1';
import SignInPage2 from '@/pages/design/web/signup/SignInPage2';
import SkillTrendsPage from '@/pages/design/web/skilltrends/SkillTrendsPage';
import ErrorPage from '@/pages/ErrorPage';
import BoardList from '@/pages/web/boards/BoardList';
import BoardCreate from '@/pages/web/boards/BoardCreate';
import BoardDetail from '@/pages/web/boards/BoardDetail';
import BoardUpdate from '@/pages/web/boards/BoardUpdate';
import Login from '@/pages/web/login/Login';
import ProfileLayout from '@/layout/ProfileLayout';
import MyProfileHome from '@/pages/web/profile/home';
import MyProfileUpdateWrapper from '@/pages/web/profile/update';
import MyProfileBoardList from '@/pages/web/profile/boards';
import MainPage from '@/pages/web/MainPage';
import ProjectCreate from '@/pages/web/projects/ProjectCreate';
import ProjectDetail from '@/pages/web/projects/ProjectDetail';
import ProjectList from '@/pages/web/projects/ProjectList';
import ProjectUpdate from '@/pages/web/projects/ProjectUpdate';
import Signup from '@/pages/web/signup/Signup';
import { createBrowserRouter } from 'react-router-dom';
import UserListPage from '@/pages/design/admin/users/UserListPage';
import UserReportPage from '@/pages/design/admin/users/UserReportPage';
import UserDetailPage from '@/pages/design/admin/users/UserDetailPage';
import ProjectListPage2 from '@/pages/design/admin/projects/ProjectListPage';
import ProjectDetailPage2 from '@/pages/design/admin/projects/ProjectDetailPage';
import AdminLayout from '@/layout/AdminLayout';
import CodeManagementPage from '@/pages/design/admin/codes/CodeManagementPage';
import FormManagementPage from '@/pages/design/admin/forms/FormManagementPage';
import BoardManagementPage from '@/pages/design/admin/boards/BoardManagementPage';
import BannerManagementPage from '@/pages/design/admin/banner/BannerManagementPage';
import TermsManagementPage from '@/pages/design/admin/terms/TermsManagementPage';
import Banner from '@/pages/admin/Banner';
import DesignMainPage from '@/pages/design/web/main/DesignMainPage';
import OauthCallback from '@/pages/web/login/Login';

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
        path: 'profile',
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
          // {
          //   path: 'projects',
          //   element: <MyProfileProjectList />,
          // },
          {
            path: 'boards',
            element: <MyProfileBoardList />,
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
            path: 'create',
            element: <ProjectCreate />,
          },
          {
            path: 'update/:projectGuid',
            element: <ProjectUpdate />,
          },
        ],
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
            path: 'detail',
            element: <BoardDetail />,
          },
          {
            path: 'update',
            element: <BoardUpdate />,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
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
    ],
  },
  {
    path: '/oauth/callback',
    element: <OauthCallback />,
  },
  {
    path: '/design',
    errorElement: <ErrorPage />,
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
            path: 'skilltrends',
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
    ],
  },
]);

export default router;
