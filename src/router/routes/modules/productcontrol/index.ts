import { DEFAULT_LAYOUT } from '../../base';
import { AppRouteRecordRaw } from '../../types';

const VIP: AppRouteRecordRaw = {
  path: '/productcontrol',
  name: 'productcontrol',
  component: DEFAULT_LAYOUT,
  meta: {
    title: 'menu.productcontrol.name',
    icon: 'icon-user',
    requiresAuth: true,
    order: 5,
  },
  children: [
    {
      path: 'OptionProductType',
      name: 'productcontrolOptionProductType',
      component: () => import('@/views/productcontrol/OptionProductType/index.vue'),
      meta: {
        title: 'menu.productcontrol.OptionProductType',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'OptionquotationList',
      name: 'productcontrolOptionquotationList',
      component: () => import('@/views/productcontrol/OptionquotationList/index.vue'),
      meta: {
        title: 'menu.productcontrol.OptionquotationList',
        requiresAuth: true,
        roles: ['*'],
      },
    }
  ],
};

export default VIP;
