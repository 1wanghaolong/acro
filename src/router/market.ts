export const market = {
    path: '/market',
    name: 'market',
    meta: {
        login: true,
    },
    children: [
        {
            path: 'stock/list',
            name: 'marketStockList',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/stock/stock/stock.vue')
        },
        {
            path: '/market/stock/preferred',
            name: 'marketStockPreferred',
            meta: {
                login: true,
            },
            component: () => import('@/pages/market/stock/preferred/preferred.vue'),
        },
        {
            path: '/market/stock/preferred/update/:id',
            name: 'marketStockPreferredUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/stock/preferred/update.vue')
        },
        {
            path: '/market/stock/preferred/detail/:id',
            name: 'marketStockPreferredDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/stock/preferred/detail.vue')
        },
        {
            path: '/market/stock/preferred/create',
            name: 'marketStockPreferredCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/stock/preferred/create.vue')
        },
        {
            path: '/market/stock/options',
            name: 'marketStockOptions',
            meta: {
                login: true,
            },
            component: () => import('@/pages/market/stock/options/options.vue'),
        },
        {
            path: '/market/stock/options/detail/:id',
            name: 'marketStockOptionsDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/stock/options/detail.vue')
        },
    ]
}