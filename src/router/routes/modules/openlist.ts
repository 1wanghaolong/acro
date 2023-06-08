import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const OPENLIST: AppRouteRecordRaw = {
  path: '/openList',
  name: 'openList',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '开户列表',
    icon: 'icon-user',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'openCheck',
      name: 'openCheck',
      component: () => import('@/views/openlist/openCheck/index.vue'),
      meta: {
        title: '证券开户审核',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'cashCheck',
      path: 'cashCheck',
      component: () => import('@/views/openlist/cashCheck/index.vue'),
      meta: {
        title: '证券入金审核',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      name: 'meetSite',
      path: 'meetSite',
      component: () => import('@/views/openlist/meetSite/index.vue'),
      meta: {
        title: '证券现场见面',
        icon: 'tree-table',
        requiresAuth: true,
        roles: ['*']
      },
    }
  ],
};

export default OPENLIST;
