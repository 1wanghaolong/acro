export const wealth = {
    path: '/wealth',
    name: 'wealth',
    meta: {
        login: true,
    },
    children: [
        {
            path: '/wealth/trade/inquiry',
            name: 'wealthTradeInquiry',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/inquiry/inquiry.vue'),
        },
        {
            path: '/wealth/trade/inquiry/detail/:id',
            name: 'wealthTradeInquiryDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/inquiry/detail.vue'),
        },
        {
            path: '/wealth/trade/inquiry/create',
            name: 'wealthTradeInquiryCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/inquiry/create/create.vue'),
        },
        {
            path: '/wealth/trade/order/create',
            name: 'wealthTradeOrderCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/order/create/create.vue'),
        },
        {
            path: '/wealth/trade/position/create',
            name: 'wealthTradePositionCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/position/create/create.vue'),
        },
        {
            path: '/wealth/trade/order',
            name: 'wealthTradeOrder',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/order/order.vue'),
        },
        {
            path: '/wealth/trade/order/detail/:id',
            name: 'wealthTradeOrderDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/order/detail.vue'),
        },
        {
            path: '/wealth/trade/counterparties',
            name: 'wealthTradeCounterparties',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/counterparties/counterparties.vue'),
        },
        {
            path: '/wealth/trade/position',
            name: 'wealthTradePosition',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/position/position.vue'),
        },
        {
            path: '/wealth/trade/position/detail/:id',
            name: 'wealthTradePositionDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/position/detail.vue'),
        },
        {
            path: '/wealth/settlement/contract',
            name: 'wealthSettlementContract',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/settlement/contract/contract.vue'),
        },
        {
            path: '/wealth/settlement/order',
            name: 'wealthSettlementOrder',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/settlement/order/order.vue'),
        },
        {
            path: '/wealth/settlement/orderDay',
            name: 'wealthSettlementOrderDay',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/settlement/orderDay/orderDay.vue'),
        },
        {
            path: '/trs/settlement/rate/platform',
            name: 'trsSettlementRatePlatform',
            meta: {
                login: true,
            },
            component: () => import('@/pages/trs/settlement/rate/platform/platform.vue'),
        },
        {
            path: '/config/inquiry',
            name: 'confgiInquiry',
            meta: {
                login: true,
            },
            component: () => import('@/pages/config/inquiry/inquiry.vue'),
        },
        {
            path: '/wealth/trade/exercise/record',
            name: 'wealthTradeExerciseRecord',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/exercise/record/record.vue'),
        },
        {
            path: '/wealth/trade/exercise/record/detail/:id',
            name: 'wealthTradeExerciseDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/trade/exercise/record/detail.vue'),
        },{
            path: 'account/account',
            name: 'wealthAccount',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/account/account/account.vue'),
        },
        {
            path: 'account/detail/:accountid',
            name: 'wealthAccountDetail',
            meta: {
                login: true,
            },
            redirect: {
                name: 'wealthAccountDetailIndex'
            },
            component: () => import('@/pages/wealth/account/detail/detail.vue'),
            children:[
                {
                    path: 'index',
                    name: 'wealthAccountDetailIndex',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/account/detail/index.vue'),
                },
                {
                    path: 'order',
                    name: 'wealthAccountDetailOrder',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/account/detail/order.vue'),
                },
                {
                    path: 'position',
                    name: 'wealthAccountDetailPosition',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/account/detail/position.vue'),
                },
            ]
        },
        {
            path: '/product/type',
            name: 'wealthProductType',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/product/type/type.vue'),
        },
        {
            path: 'product/typeCreate',
            name: 'wealthProductTypeCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/wealth/product/type/create/create.vue'),
        },
        {
            path: '/product/type/detail:productid',
            name: 'wealthproductTypeDetail',
            meta: {
                login: true,
            },
            redirect: {
                name: 'wealthproductTypeDetailIndex'
            },
            component: () => import('@/pages/wealth/product/type/detail/detail.vue'),
            children:[
                {
                    path: 'index',
                    name: 'wealthproductTypeDetailIndex',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/product/type/detail/index.vue'),
                },
                {
                    path: 'parameters',
                    name: 'wealthproductTypeDetailParameters',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/product/type/detail/parameters.vue'),
                },
                {
                    path: 'quotation',
                    name: 'wealthproductTypeDetailQuotation',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/product/type/detail/quotation.vue'),
                },
                {
                    path: 'product',
                    name: 'wealthproductTypeDetailProduct',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/product/type/detail/product.vue'),
                },
            ]
        },
        {
            path: '/product/offer',
            name: 'wealthProductOffer',
            meta: {
                login: true,
            },
            component: () => import('@/pages/wealth/product/offer/offer.vue'),
        },
        {
            path: 'product/offerCreate',
            name: 'wealthProductOfferCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/wealth/product/offer/create/create.vue'),
        },
        {
            path: '/product/offer/detail:productid',
            name: 'wealthproductOfferDetail',
            meta: {
                login: true,
            },
            redirect: {
                name: 'wealthproductofferDetailIndex'
            },
            component: () => import('@/pages/wealth/product/offer/detail/detail.vue'),
            children:[
                {
                    path: 'index',
                    name: 'wealthproductofferDetailIndex',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/product/offer/detail/index.vue'),
                },
                {
                    path: 'parameters',
                    name: 'wealthproductofferDetailParameters',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/wealth/product/offer/detail/parameters.vue'),
                }
            ]
        },
    ]
}