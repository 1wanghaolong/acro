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
      name: 'fundapplicationAccountDepositList',
      component: () => import('@/views/fundapplication/accountDepositList/index.vue'),
      meta: {
        title: 'menu.fundapplication.accountDepositList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'accounttCashOutList',
      name: 'fundapplicationAccounttCashOutList',
      component: () => import('@/views/fundapplication/accounttCashOutList/index.vue'),
      meta: {
        title: 'menu.fundapplication.accounttCashOutList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'Currencyapplication',
      name: 'fundapplicationCurrencyapplication',
      component: () => import('@/views/fundapplication/Currencyapplication/index.vue'),
      meta: {
        title: 'menu.fundapplication.Currencyapplication',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default USER;
