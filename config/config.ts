// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/User/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './User/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './User/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/',
              component: '../layouts/BasicLayout',
              Routes: ['src/pages/Authorized'],
              authority: ['admin', 'user'],
              routes: [
                {
                  path: '/',
                  redirect: '/home',
                },
                {
                  name: 'home',
                  icon: 'home',
                  path: '/home',
                  component: './home',
                  //  authority: ['admin'],
                },
                {
                  path: '/time',
                  name: 'time',
                  icon: 'ClockCircleOutlined',
                  routes: [
                    {
                      path: '/',
                      redirect: '/time/time-sheet/day',
                    },
                    {
                      name: 'time-sheet',
                      icon: 'ClockCircleOutlined',
                      path: '/time/time-sheet/day',
                      component: './Time/TimeSheet',
                    },
                    {
                      name: 'time-sheet',
                      icon: 'ClockCircleOutlined',
                      path: '/time/time-sheet/week',
                      component: './Time/WeekTimeSheet',
                      hideInMenu: true,
                    },
                    {
                      name: 'pending-approvals',
                      path: '/time/time-sheet/approve',
                      component: './Time/PendingApproval',
                      authority: ['admin'],
                    },
                    {
                      path: '/time/time-sheet/approve/:id',
                      name: 'pending-approvals',
                      component: './Time/PendingApproval/Details',
                      hideInMenu: true,
                      authority: ['admin'],
                    },
                  ],
                },
                {
                  name: 'projects',
                  icon: 'FolderOutlined',
                  path: '/projects',
                  component: './projects/ProjectList',
                },
                {
                  path: '/project/:detail',
                  name: 'projects',
                  component: './projects/ProjectList/ProjectDetails',
                  hideInMenu: true,
                },
                {
                  name: 'projects',
                  icon: 'FolderOutlined',
                  path: '/projects/new',
                  component: './projects/CreateNewProject',
                  hideInMenu: true,
                },

                {
                  name: 'teams',
                  icon: 'TeamOutlined',
                  path: '/teams/home',
                  component: './teams/TeamHome',
                },
                {
                  name: 'teams',
                  icon: 'TeamOutlined',
                  path: '/people/new',
                  component: './teams/AddNewMember',
                  hideInMenu: true,
                },
                {
                  path: '/reports',
                  name: 'reports',
                  icon: 'FileExcelOutlined',
                  routes: [
                    {
                      path: '/',
                      redirect: '/reports/clients',
                    },
                    {
                      name: 'client',
                      path: '/reports/clients',
                      component: './reports/Clients',
                    },
                    {
                      name: 'task',
                      path: '/reports/tasks',
                      component: './reports/Tasks',
                    },
                    {
                      name: 'projects',
                      path: '/reports/projects',
                      component: './reports/Projects',
                    },
                    {
                      name: 'teams',
                      path: '/reports/teams',
                      component: './reports/Teams',
                    },
                  ],
                },
                {
                  path: '/manage',
                  name: 'manage',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/',
                      redirect: '/manage/clients',
                    },
                    {
                      name: 'client',
                      path: '/manage/clients',
                      component: './manage/Client',
                    },
                    {
                      path: '/manage/clients/:id',
                      name: 'client',
                      component: './manage/Client/EditClient',
                      hideInMenu: true,
                    },
                    {
                      name: 'task',
                      path: '/manage/tasks',
                      component: './manage/Tasks',
                    },
                    {
                      name: 'roles',
                      path: '/manage/roles',
                      component: './manage/Roles',
                    },
                  ],
                },

                {
                  path: '/profile',
                  name: 'profile',
                  icon: 'profile',
                  hideInMenu: true,
                  routes: [
                    {
                      path: '/',
                      redirect: '/profile/my_profile',
                    },
                    // {
                    //   name: 'basic',
                    //   icon: 'smile',
                    //   path: '/profile/basic',
                    //   component: './profile/basic',
                    // },
                    // {
                    //   name: 'advanced',
                    //   icon: 'smile',
                    //   path: '/profile/advanced',
                    //   component: './profile/advanced',
                    // },
                    {
                      name: 'my_profile',
                      icon: 'smile',
                      path: '/profile/my_profile',
                      component: './profile/my_profile',
                    },
                    {
                      name: 'my_reports',
                      icon: 'smile',
                      path: '/profile/my_reports',
                      component: './profile/my_reports',
                    },
                  ],
                },

                {
                  component: '404',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: 'Time Tracking',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
