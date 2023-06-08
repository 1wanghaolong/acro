import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const KAIHU: AppRouteRecordRaw = {
  path: '/kaihu',
  name: 'kaihu',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '开户流程',
    icon: 'icon-user',
    requiresAuth: true,
    order: 4,
  },
  children: [
    {
      path: 'Hopen',
      name: 'Hopen',
      component: () => import('@/views/Hopen/index.vue'),
      meta: {
        title: '证券流程',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default KAIHU;
