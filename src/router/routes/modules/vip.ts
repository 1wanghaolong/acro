import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const VIP: AppRouteRecordRaw = {
  path: '/vip',
  name: 'vip',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '会员管理',
    icon: 'icon-user',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: 'vipList',
      name: 'vipList',
      component: () => import('@/views/vip/index.vue'),
      meta: {
        title: '会员管理',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default VIP;
