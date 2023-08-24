import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const OPENLIST: AppRouteRecordRaw = {
  path: '/openList',
  name: 'openList',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.BankCard.name',
    icon: 'icon-list',
    requiresAuth: true,
    order: 6,
  },
  children: [
    {
      path: 'CustomeList',
      name: 'CustomeList',
      component: () => import('@/views/openlist/openCheck/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        title: 'menu.BankCard.CustomeList',
      },
    },
    {
      name: 'DepositList',
      path: 'DepositList',
      component: () => import('@/views/openlist/cashCheck/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        title: 'menu.BankCard.DepositList',
      }
    }
  ],
};

export default OPENLIST;
