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
      name: 'InquiryRecordList',
      component: () => import('@/views/systems/openPreparation/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.InquiryRecordList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'TransactionList',
      path: 'TransactionList',
      component: () => import('@/views/systems/videoVerification/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.TransactionList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'CounterpartyList',
      path: 'CounterpartyList',
      component: () => import('@/views/systems/videoVerification/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.CounterpartyList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'OptionPositionList',
      path: 'OptionPositionList',
      component: () => import('@/views/systems/videoVerification/index.vue'),
      meta: {
        title: 'menu.TransactionManagement.OptionPositionList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEMS;
