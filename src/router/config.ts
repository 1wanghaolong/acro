export const config = {
    path: '/config',
    name: 'config',
    meta: {
        login: true,
    },
    children: [
        {
            path: 'appPage',
            name: 'configAppPage',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/appPage/appPage.vue')
        },
        {
            path: 'appPage/update/:id',
            name: 'configAppPageUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/appPage/update.vue')
        },
        {
            path: 'template/orderSort',
            name: 'configTemplateOrderSort',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/template/orderSort/orderSort.vue')
        },
        {
            path: 'template/orderSortCreate',
            name: 'configTemplateOrderSortCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/template/orderSort/create/create.vue')
            
        },
        {
            path: 'template/OrderSort/detail/:sortid',
            name: 'configTemplateOrderSortDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/template/orderSort/detail/detail.vue')
        },
        {
            path: 'template/riskControl',
            name: 'configTemplateRiskControl',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/template/riskControl/riskControl.vue')
        },
        {
            path: 'template/investmentScope',
            name: 'configTemplateInvestmentScope',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/template/investmentScope/investmentScope.vue')
        },
        {
            path: 'template/investmentScope/detail/:id',
            name: 'configTemplateInvestmentScopeDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/config/template/investmentScope/detail.vue'),
        },
        {
            path: 'template/investmentScope/create',
            name: 'configTemplateInvestmentScopeCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/config/template/investmentScope/create/create.vue'),
        },
        {
            path: 'financeMultiple',
            name: 'configFinanceMultiple',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/financeMultiple/financeMultiple.vue')
        },
        {
            path: 'financeTimeLimit',
            name: 'configFinanceTimeLimit',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/financeTimeLimit/financeTimeLimit.vue')
        },
        {
            path: 'margin',
            name: 'configMargin',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/margin/margin.vue')
        },
        {
            path: 'withdraw',
            name: 'configWithdraw',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/withdraw/withdraw.vue')
        },
        {
            path: 'tip',
            name: 'configTip',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/tip/tip.vue')
        },
        {
            path: 'movementTip',
            name: 'configMovementTip',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/movementTip/movementTip.vue')
        },
        {
            path: 'pi',
            name: 'configPi',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/pi/pi.vue')
        },
        {
            path: '/config/system',
            name: 'configSystem',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/system/system.vue')
        },
        {
            path: '/config/notice',
            name: 'configNotice',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/notice/notice.vue')
        },
        {
            path: '/config/trade',
            name: 'configTrade',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/trade/trade.vue')
        },
        {
            path: '/config/exchange',
            name: 'configExchange',
            meta: {
                login: true
            },
            component: () => import('@/pages/config/exchange/exchange.vue')
        },
    ]
}