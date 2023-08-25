import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const SYSTEMS: AppRouteRecordRaw = {
  path: '/TransactionManagement',
  name: 'TransactionManagement',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.TransactionManagement.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 8,
  },
  children: [
    {
      path: 'InquiryRecordList',
      name: 'TransactionManagementInquiryRecordList',
      component: () => import('@/views/TransactionManagement/InquiryRecordList/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.InquiryRecordList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'TransactionList',
      path: 'TransactionManagementTransactionList',
      component: () => import('@/views/TransactionManagement/TransactionList/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.TransactionList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'CounterpartyList',
      path: 'TransactionManagementCounterpartyList',
      component: () => import('@/views/TransactionManagement/CounterpartyList/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.CounterpartyList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'OptionPositionList',
      path: 'TransactionManagementOptionPositionList',
      component: () => import('@/views/TransactionManagement/OptionPositionList/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.OptionPositionList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEMS;
