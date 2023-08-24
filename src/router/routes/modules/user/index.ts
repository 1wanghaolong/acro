import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const KAIHU: AppRouteRecordRaw = {
  path: '/kaihu',
  name: 'kaihu',
  component: DEFAULT_LAYOUT,
  meta: {
    title:'menu.user.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: 'customList',
      name: 'customList',
      component: () => import('@/views/Hopen/index.vue'),
      meta: {
        title:"menu.user.customList",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'equipment',
      name: 'equipment',
      component: () => import('@/views/Hopen/index.vue'),
      meta: {
        title:"menu.user.equipment",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'logOutList',
      name: 'logOutList',
      component: () => import('@/views/Hopen/index.vue'),
      meta: {
        title:"menu.user.logOutList",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'ApplicationlogOutList',
      name: 'ApplicationlogOutList',
      component: () => import('@/views/Hopen/index.vue'),
      meta: {
        title:"menu.user.ApplicationlogOutList",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'accountList',
      name: 'accountList',
      component: () => import('@/views/Hopen/index.vue'),
      meta: {
        title:"menu.user.accountList",
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default KAIHU;
