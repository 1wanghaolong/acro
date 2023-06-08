import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SMS: AppRouteRecordRaw = {
  path: '/SMS',
  name: 'SMS',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '短信通知',
    locale:"menu.sms",
    icon: 'icon-user',
    requiresAuth: true,
    order: 7,
  },
  children: [
    {
      path: 'sms',
      name: 'sms',
      component: () => import('@/views/sms/index.vue'),
      meta: {
        title: '短信通知',
        locale:"menu.sms",
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default SMS;
