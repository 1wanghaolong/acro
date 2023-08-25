import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/settlementmanagement',
  name: 'settlementmanagement',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.settlementmanagement.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 9,
  },
  children: [
    {
      path: 'settlementrecords',
      name: 'settlementmanagementSettlementrecords',
      component: () => import('@/views/settlementmanagement/settlementrecords/index.vue'),
      meta: {
        title: 'menu.settlementmanagement.settlementrecords',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'ratemanagement',
      name: 'settlementmanagementRatemanagement',
      component: () => import('@/views/settlementmanagement/ratemanagement/index.vue'),
      meta: {
        title: 'menu.settlementmanagement.ratemanagement',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'accountstatement',
      name: 'settlementmanagementAccountstatement',
      component: () => import('@/views/settlementmanagement/accountstatement/index.vue'),
      meta: {
        title: 'menu.settlementmanagement.accountstatement',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
