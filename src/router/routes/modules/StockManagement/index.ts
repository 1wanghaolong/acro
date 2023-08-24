import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SMS: AppRouteRecordRaw = {
  path: '/SMS',
  name: 'SMS',
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
      name: 'CustomeList',
      component: () => import('@/views/sms/index.vue'),
      meta: {
        title: 'menu.StockManagement.CustomeList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default SMS;
