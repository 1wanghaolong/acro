import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const USER: AppRouteRecordRaw = {
  path: '/fundapplication',
  name: 'fundapplication',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.fundapplication.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 4,
  },
  children: [
    {
      path: 'accountDepositList',
      name: 'accountDepositList',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.fundapplication.accountDepositList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'accounttCashOutList',
      name: 'accounttCashOutList',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.fundapplication.accounttCashOutList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'Currencyapplication',
      name: 'Currencyapplication',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        title: 'menu.fundapplication.Currencyapplication',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default USER;
