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
      name: 'accountManagementAccountList',
      component: () => import('@/views/accountManagement/accountList/index.vue'),
      meta: {
        title: 'menu.accountManagement.accountList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'WealthaccountList',
      name: 'accountManagementWealthaccountList',
      component: () => import('@/views/accountManagement/WealthaccountList/index.vue'),
      meta: {
        title: 'menu.accountManagement.WealthaccountList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'PIList',
      name: 'accountManagementPIList',
      component: () => import('@/views/accountManagement/PIList/index.vue'),
      meta: {
        title: 'menu.accountManagement.PIList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'riskList',
      name: 'accountManagementRiskList',
      component: () => import('@/views/accountManagement/riskList/index.vue'),
      meta: {
        title: 'menu.accountManagement.riskList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default USER;
