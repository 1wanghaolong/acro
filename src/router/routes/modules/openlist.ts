import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const OPENLIST: AppRouteRecordRaw = {
  path: '/openList',
  name: 'openList',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '开户列表',
    icon: 'icon-list',
    locale:"menu.openList",
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'openCheck',
      name: 'openCheck',
      component: () => import('@/views/openlist/openCheck/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        locale: 'menu.openCheck',
      },
    },
    {
      name: 'cashCheck',
      path: 'cashCheck',
      component: () => import('@/views/openlist/cashCheck/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        locale: 'menu.cashCheck',
      }
    },
    {
      name: 'meetSite',
      path: 'meetSite',
      component: () => import('@/views/openlist/meetSite/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        locale: 'menu.meetSite',
      },
    }
  ],
};

export default OPENLIST;
