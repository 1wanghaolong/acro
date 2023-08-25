import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SMS: AppRouteRecordRaw = {
  path: '/StockManagement',
  name: 'StockManagement',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.StockManagement.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 12,
  },
  children: [
    {
      path: 'CustomeList',
      name: 'StockManagementCustomeList',
      component: () => import('@/views/StockManagement/CustomeList/index.vue'),
      meta: {
        title: 'menu.StockManagement.CustomeList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default SMS;
