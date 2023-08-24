import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.system.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 13,
  },
  children: [
    {
      path: 'administrators',
      name: 'administrators',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.system.administrators',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.system.role',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'limitsofauthority',
      name: 'limitsofauthority',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.system.limitsofauthority',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'menu',
      name: 'menu',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.system.menu',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'extend',
      name: 'extend',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.system.extend',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'systemlog',
      name: 'systemlog',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.system.systemlog',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
