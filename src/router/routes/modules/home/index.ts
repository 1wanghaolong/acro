import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.home',
    locale: 'menu.dashboard',
    icon: 'icon-home',
    requiresAuth: true,
    hideInMenu: true,
    order: 0,
  },
  children: [
    {
      path: 'Workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        hideInMenu:false,
        title: 'menu.home',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
