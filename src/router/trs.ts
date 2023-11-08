export const trs = {
    path: '/trs',
    name: 'trs',
    meta: {
        login: true,
    },
    children: [
        {
            path: 'account',
            name: 'trsAccount',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/account/account.vue'),
        },{
            path: 'account/detail/:id',
            name: 'trsAccountDetail',
            meta: {
                login: true
            },
            redirect: {
                name: 'trsAccountDetailIndex'
            },
            component: () => import('@/pages/trs/account/account/detail/detail.vue'),
            children:[
                {
                    path: 'index',
                    name: 'trsAccountDetailIndex',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/index/index.vue'),
                },
                {
                    path: 'position',
                    name: 'trsAccountDetailPosition',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/position/position.vue'),
                },
                {
                    path: 'riskControl',
                    name: 'trsAccountDetailRiskControl',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/riskControl/riskControl.vue'),
                },
                {
                    path: 'riskControlLine',
                    name: 'trsAccountDetailRiskControlLine',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/riskControlLine/riskControlLine.vue'),
                },
                {
                    path: 'interest',
                    name: 'trsAccountDetailInterest',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/interest/interest.vue'),
                },
                {
                    path: 'charge',
                    name: 'trsAccountDetailCharge',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/charge/charge.vue'),
                },
                {
                    path: 'finance',
                    name: 'trsAccountDetailFinance',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/finance/finance.vue'),
                },
                {
                    path: 'withdraw',
                    name: 'trsAccountDetailWithdraw',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/withdraw/withdraw.vue'),
                },
                {
                    path: 'transfer',
                    name: 'trsAccountDetailTransfer',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/transfer/transfer.vue'),
                },
                {
                    path: 'assure',
                    name: 'trsAccountDetailAssure',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/assure/assure.vue'),
                },
                {
                    path: 'agreement',
                    name: 'trsAccountDetailAgreement',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/agreement/agreement.vue'),
                },
                {
                    path: 'riskControl/record',
                    name: 'trsAccountDetailRiskControlRecord',
                    meta: {
                        login: true
                    },
                    component: () => import('@/pages/trs/account/account/detail/riskControl/record.vue'),
                },
                {
                    path: 'trssettlement',
                    name: 'TRSAccountSettlement',
                    meta: {
                        login: true,
                    },
                    component: () => import('@/pages/trs/account/account/detail/settlement/trssettlement.vue'),
                }
            ]
        },{
            path: 'account/create',
            name: 'trsAccountCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/account/create/create.vue'),
        },{
            path: 'account/withdraw',
            name: 'trsAccountWithdraw',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/withdraw/apply/apply.vue'),
        },{
            path: 'account/withdraw/detail/:id',
            name: 'trsAccountWithdrawDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/withdraw/apply/detail.vue'),
        },{
            path: 'account/withdraw/record',
            name: 'trsAccountWithdrawRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/withdraw/record/record.vue'),
        },{
            path: 'account/assure/record',
            name: 'trsAccountAssureRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/assure/record/record.vue'),
        },{
            path: 'account/assure/status',
            name: 'trsAccountAssureStatus',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/assure/status/status.vue'),
        },{
            path: 'account/withdraw/record',
            name: 'trsAccountWithdrawRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/withdraw/record/record.vue'),
        },{
            path: 'trade/order',
            name: 'trsTradeOrder',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/order/order.vue'),
        },{
            path: 'trade/order/create',
            name: 'trsTradeOrderCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/order/create/create.vue'),
        },{
            path: 'trade/order/detail/:id',
            name: 'trsTradeOrderDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/order/detail.vue'),
        },{
            path: 'trade/position',
            name: 'trsTradePositon',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/position/position.vue'),
        },{
            path: 'trade/channelOrder',
            name: 'trsTradeChannelOrder',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/channelOrder/channelOrder.vue'),
        },
        {
            path: 'trade/brokenStock',
            name: 'trsTradeBrokenStock',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/brokenStock/brokenStock.vue'),
        },{
            path: 'trade/channelOrder/detail/:id',
            name: 'trsTradeChannelOrderDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/channelOrder/detail.vue'),
        },{
            path: 'trade/bonus',
            name: 'trsTradeBonus',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/bonus/bonus.vue'),
        },{
            path: 'trade/stock',
            name: 'trsTradeStock',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/trade/stock/stock.vue'),
        },{
            path: 'riskControl/status',
            name: 'trsRiskControlStatus',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/riskControl/status/status.vue'),
        },{
            path: 'riskControl/record',
            name: 'trsRiskControlRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/riskControl/record/record.vue'),
        },{
            path: 'settlement/rate/channel',
            name: 'trsSettlementRateChannel',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/rate/channel/channel.vue'),
        },{
            path: 'settlement/rate/channel/create',
            name: 'trsSettlementRateChannelCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/rate/channel/create.vue'),
        },{
            path: 'settlement/rate/channel/update/:id/:date',
            name: 'trsSettlementRateChannelUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/rate/channel/update.vue'),
        },{
            path: 'settlement/rate/platform',
            name: 'trsSettlementRatePlatform',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/rate/platform/platform.vue'),
        },{
            path: 'settlement/rate/platform/create',
            name: 'trsSettlementRatePlatformCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/rate/platform/create.vue'),
        },{
            path: 'settlement/rate/platform/update/:date',
            name: 'trsSettlementRatePlatformUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/rate/platform/update.vue'),
        },{
            path: 'settlement/Contract',
            name: 'trsSettlementContract',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/contract/contract.vue'),
        },{
            path: 'settlement/Contract/detail/:id',
            name: 'trsSettlementContractDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/contract/detail.vue'),
        },{
            path: 'settlement/bonus',
            name: 'trsSettlementBonus',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/bonus/bonus/bonus.vue'),
        },{
            path: 'settlement/bonus/task',
            name: 'trsSettlementBonusTask',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/bonus/task/task.vue'),
        },{
            path: 'settlement/stock',
            name: 'trsSettlementStock',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/stock/stock/stock.vue'),
        },{
            path: 'settlement/stock/task',
            name: 'trsSettlementStockTask',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/settlement/stock/task/task.vue'),
        },{
            path: 'channel/upstream/channel',
            name: 'trsChannelUpstreamChannel',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/channel/upstream/channel/channel.vue'),
        },{
            path: 'channel/upstream/channel/create',
            name: 'trsChannelUpstreamChannelCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/channel/upstream/channel/create.vue'),
        },{
            path: 'channel/upstream/channel/update/:id',
            name: 'trsChannelUpstreamChannelUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/channel/upstream/channel/update.vue'),
        },{
            path: 'channel/upstream/account',
            name: 'trsChannelUpstreamAccount',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/channel/upstream/account/account.vue'),
        },{
            path: 'channel/upstream/account/create',
            name: 'trsChannelUpstreamAccountCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/channel/upstream/account/create.vue'),
        },{
            path: 'channel/upstream/account/update/:id',
            name: 'trsChannelUpstreamAccountUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/channel/upstream/account/update.vue'),
        },{
            path: 'notice/email/subscribe',
            name: 'trsNoticeEmailSubscribe',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/notice/email/subscribe/subscribe.vue'),
        },{
            path: 'notice/email/subscribe/update/:id',
            name: 'trsNoticeEmailSubscribeUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/notice/email/subscribe/update.vue'),
        },{
            path: 'notice/email/subscribe/create',
            name: 'trsNoticeEmailSubscribeCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/notice/email/subscribe/create.vue'),
        },{
            path: 'notice/messages',
            name: 'trsNoticeMessages',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/notice/messages/messages.vue'),
        },{
            path: 'package/trade',
            name: 'trsPackageTrade',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/package/trade/trade.vue'),
        },{
            path: 'package/trade/create',
            name: 'trsPackageTradeCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/trs/package/trade/create/create.vue'),
        },
        {
            path: 'package/trade/detail/:id',
            name: 'trsPackageTradeDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/trs/package/trade/detail.vue'),
        }
        ,{
            path: 'package/person',
            name: 'trsPackagePerson',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/package/person/person.vue'),
        },{
            path: 'package/finance',
            name: 'trsPackageFinance',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/package/finance/finance.vue'),
        },{
            path: 'account/apply',
            name: 'trsAccountApply',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/apply/apply.vue'),
        },{
            path: 'account/apply/detail/:id',
            name: 'trsAccountApplyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/apply/detail.vue'),
        },{
            path: 'account/finance/apply',
            name: 'trsAccountFinanceApply',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/finance/apply/apply.vue'),
        },{
            path: 'account/finance/apply/detail/:id',
            name: 'trsAccountFinanceApplyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/finance/apply/detail.vue'),
        },{
            path: 'account/symbol/apply',
            name: 'trsAccountSymbolApply',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/symbol/apply/apply.vue'),
        },{
            path: 'account/symbol/apply/detail/:id',
            name: 'trsAccountSymbolApplyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/symbol/apply/detail.vue'),
        },{
            path: 'account/terminate/apply',
            name: 'trsAccountTerminateApply',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/terminate/apply/apply.vue'),
        },{
            path: 'account/terminate/apply/detail/:id',
            name: 'trsAccountTerminateApplyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/terminate/apply/detail.vue'),
        },{
            path: 'account/continue/apply',
            name: 'trsAccountContinueApply',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/continue/apply/apply.vue'),
        },{
            path: 'account/continue/apply/detail/:id',
            name: 'trsAccountContinueApplyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/continue/apply/detail.vue'),
        },{
            path: 'account/withdraw/apply',
            name: 'trsAccountWithdrawApply',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/withdraw/apply/apply.vue'),
        },{
            path: 'account/withdraw/apply/detail/:id',
            name: 'trsAccountWithdrawApplyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/trs/account/withdraw/apply/detail.vue'),
        },
        {
            path: 'stock/symbol/pool',
            name: 'StockSymbolPool',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/stock/pool/pool.vue'),
        },
        {
            path: '/trs/settlement/orderDay',
            name: 'TRSthSettlementOrderDay',
            meta: {
                login: true,
            },
            component: () => import('@/pages/trs/settlement/orderDay/orderDay.vue'),
        },
    ]
}