import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/ManagerManagement',
  name: 'ManagerManagement',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.ManagerManagement.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      path: 'accountList',
      name: 'ManagerManagementaccountList',
      component: () => import('@/views/ManagerManagement/accountList/index.vue'),
      meta: {
        title: 'menu.ManagerManagement.accountList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default SYSTEM;
