import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const USER: AppRouteRecordRaw = {
  path: '/accountManagement',
  name: 'accountManagement',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.accountManagement.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'accountList',
      name: 'accountList',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.accountManagement.accountList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'WealthaccountList',
      name: 'WealthaccountList',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.accountManagement.WealthaccountList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'PIList',
      name: 'PIList',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.accountManagement.PIList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'riskList',
      name: 'riskList',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.accountManagement.riskList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default USER;
