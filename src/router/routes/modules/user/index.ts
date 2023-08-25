import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const KAIHU: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
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
      name: 'usercustomList',
      component: () => import('@/views/user/customList/index.vue'),
      meta: {
        title:"menu.user.customList",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'equipment',
      name: 'userequipment',
      component: () => import('@/views/user/equipment/index.vue'),
      meta: {
        title:"menu.user.equipment",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'logOutList',
      name: 'userlogOutList',
      component: () => import('@/views/user/logOutList/index.vue'),
      meta: {
        title:"menu.user.logOutList",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'ApplicationlogOutList',
      name: 'userApplicationlogOutList',
      component: () => import('@/views/user/ApplicationlogOutList/index.vue'),
      meta: {
        title:"menu.user.ApplicationlogOutList",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'accountList',
      name: 'useraccountList',
      component: () => import('@/views/user/accountList/index.vue'),
      meta: {
        title:"menu.user.accountList",
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default KAIHU;
