import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEMS: AppRouteRecordRaw = {
  path: '/systems',
  name: 'systems',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '系统配置',
    locale:"menu.systems",
    icon: 'icon-user',
    requiresAuth: true,
    order: 5,
  },
  children: [
    {
      path: 'openPreparation',
      name: 'openPreparation',
      component: () => import('@/views/systems/openPreparation/index.vue'),
      meta: {
        title: '开户准备',
        locale:"menu.openPreparation",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'videoVerification',
      path: 'videoVerification',
      component: () => import('@/views/systems/videoVerification/index.vue'),
      meta: {
        title: '视频验证',
        locale:"menu.videoVerification",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'depositManagement',
      path: 'depositManagement',
      component: () => import('@/views/systems/depositManagement/index.vue'),
      meta: {
        title: '入金管理',
        locale:"menu.depositManagement",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'siteManagement',
      path: 'siteManagement',
      component: () => import('@/views/systems/siteManagement/index.vue'),
      meta: {
        title: '现场管理',
        locale:"menu.siteManagement",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'protocolManagement',
      path: 'protocolManagement',
      component: () => import('@/views/systems/protocolManagement/index.vue'),
      meta: {
        title: '协议管理',
        locale:"menu.protocolManagement",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'platform',
      path: 'platform',
      component: () => import('@/views/systems/platform/index.vue'),
      meta: {
        title: '平台配置',
        locale:"menu.platform",
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      name: 'Assessment',
      path: 'Assessment',
      component: () => import('@/views/systems/Assessment/index.vue'),
      meta: {
        title: '开户评估',
        locale:"menu.Assessment",
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEMS;
