import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/configurationmanagement',
  name: 'configurationmanagement',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.configurationmanagement.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 11,
  },
  children: [
    {
      path: 'APPpagemanagement',
      name: 'APPpagemanagement',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.configurationmanagement.APPpagemanagement',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'PIauthentication',
      name: 'PIauthentication',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.configurationmanagement.PIauthentication',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'OptionInquiry',
      name: 'OptionInquiry',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: 'menu.configurationmanagement.OptionInquiry',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
