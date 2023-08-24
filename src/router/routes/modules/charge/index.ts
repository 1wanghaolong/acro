import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/charge',
  name: 'charge',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.charge.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 10,
  },
  children: [
    {
      path: 'accountListFeepackage',
      name: 'accountListFeepackage',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.charge.accountListFeepackage',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default SYSTEM;
