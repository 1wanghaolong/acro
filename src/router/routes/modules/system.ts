import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '权限管理',
    locale:"menu.system",
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
        locale:"menu.system.user",
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
        locale:"menu.system.Role",
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
        locale:"menu.system.Menu",
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
        locale:"menu.system.Dept",
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
        locale:"menu.system.Post",
        icon: 'post',
        requiresAuth: true,
        roles: ['*']
      },
    },
  ],
};

export default SYSTEM;
