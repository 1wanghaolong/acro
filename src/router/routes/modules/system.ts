import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '权限管理',
    icon: 'icon-user',
    requiresAuth: true,
    order: 6,
  },
  children: [
    {
      path: 'User',
      name: 'User',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '组织架构',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'Role',
      path: 'role',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '菜单管理',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      name: 'Menu',
      path: 'menu',
      component: () => import('@/views/system/meun/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'tree-table',
        requiresAuth: true,
        roles: ['*']
      },
    },
    {
      name: 'Dept',
      path: 'dept',
      component: () => import('@/views/system/dept/index.vue'),
      meta: {
        title: '账户管理',
        icon: 'tree',
        requiresAuth: true,
        roles: ['*']
      },
    },
    {
      name: 'Post',
      path: 'post',
      component: () => import('@/views/system/post/index.vue'),
      meta: {
        title: '操作日志',
        icon: 'post',
        requiresAuth: true,
        roles: ['*']
      },
    },
  ],
};

export default SYSTEM;
