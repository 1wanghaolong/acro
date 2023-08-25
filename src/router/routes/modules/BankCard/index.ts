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
      name: 'openlistCustomeList',
      component: () => import('@/views/openlist/CustomeList/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        title: 'menu.BankCard.CustomeList',
      },
    },
    {
      name: 'DepositList',
      path: 'openlistDepositList',
      component: () => import('@/views/openlist/DepositList/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
        title: 'menu.BankCard.DepositList',
      }
    }
  ],
};

export default OPENLIST;
