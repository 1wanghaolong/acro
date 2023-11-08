export const cms = {
    path: '/cms',
    name: 'cms',
    meta: {
        login: true,
    },
    children: [
        {
            path: '/cms/help/problem',
            name: 'cmsHelpProblem',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/help/problem/problem/problem.vue'),
        },
        {
            path: '/cms/help/problem/update/:id',
            name: 'cmsHelpProblemUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/help/problem/problem/update.vue')
        },
        {
            path: '/cms/help/problem/detail/:id',
            name: 'cmsHelpProblemDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/help/problem/problem/detail.vue')
        },
        {
            path: '/cms/help/problem/create',
            name: 'cmsHelpProblemCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/help/problem/problem/create.vue')
        },
        {
            path: '/cms/help/problem/type',
            name: 'cmsHelpProblemType',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/help/problem/type/type.vue'),
        },
        {
            path: '/cms/help/problem/type/detail/:id',
            name: 'cmsHelpProblemTypeDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/help/problem/type/detail.vue')
        },
        {
            path: '/cms/help/feedback',
            name: 'cmsHelpFeedback',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/help/feedback/feedback.vue'),
        },
        {
            path: '/cms/help/feedback/detail/:id',
            name: 'cmsHelpFeedbackDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/help/feedback/detail.vue')
        },
        {
            path: '/cms/adv',
            name: 'cmsAdv',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/adv/adv/adv.vue'),
        },
        {
            path: '/cms/adv/detail/:id',
            name: 'cmsAdvDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/adv/adv/detail.vue')
        },
        {
            path: '/cms/adv/open',
            name: 'cmsAdvOpen',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/adv/open/open.vue'),
        },
        {
            path: '/cms/adv/open/detail/:id',
            name: 'cmsAdvOpenDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/adv/open/detail.vue')
        },
        {
            path: '/cms/adv/info',
            name: 'cmsAdvInfo',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/adv/info/info.vue'),
        },
        {
            path: '/cms/adv/info/update/:id',
            name: 'cmsAdvInfoUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/adv/info/update.vue')
        },
        {
            path: '/cms/adv/info/create',
            name: 'cmsAdvInfoCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/adv/info/create.vue')
        },
        {
            path: '/cms/message/comment',
            name: 'cmsMessageComment',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/message/comment/comment.vue'),
        },
        {
            path: '/cms/message/comment/update/:id',
            name: 'cmsMessageCommentUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/message/comment/update.vue')
        },
        {
            path: '/cms/message/comment/detail/:id',
            name: 'cmsMessageCommentDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/message/comment/detail.vue')
        },
        {
            path: '/cms/message/feedback',
            name: 'cmsMessageFeedback',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/message/feedback/feedback.vue'),
        },
        {
            path: '/cms/message/feedback/detail/:id',
            name: 'cmsMessageFeedbackDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/message/feedback/detail.vue')
        },
        {
            path: '/cms/message/affair',
            name: 'cmsMessageAffair',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/message/affair/affair.vue'),
        },
        {
            path: '/cms/message',
            name: 'cmsMessage',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/message/message/message.vue'),
        },
        {
            path: '/cms/message/create',
            name: 'cmsMessageCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/message/message/create.vue')
        },
        {
            path: '/cms/simulate/account',
            name: 'cmsSimulateAccount',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/simulate/account/account.vue'),
        },
        {
            path: '/cms/simulate/trade',
            name: 'cmsSimulateTrade',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/simulate/trade/trade.vue'),
        },
        {
            path: '/cms/simulate/position',
            name: 'cmsSimulatePosition',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/simulate/position/position.vue'),
        },
        {
            path: '/cms/simulate/config',
            name: 'cmsSimulateConfig',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/simulate/config/config.vue'),
        },
        {
            path: '/cms/simulate/entrust',
            name: 'cmsSimulateEntrust',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/simulate/entrust/entrust.vue'),
        },
        {
            path: '/cms/asset/movement',
            name: 'cmsAssetMovement',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/movement/movement.vue'),
        },
        {
            path: '/cms/asset/movement/detail/:id',
            name: 'cmsAssetMovementDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/asset/movement/detail.vue')
        },
        {
            path: '/cms/client',
            name: 'cmsClient',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/client/client/client.vue'),
        },
        {
            path: '/cms/client/detail/:id',
            name: 'cmsClientDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/client/client/detail.vue')
        },
        {
            path: '/cms/client/info',
            name: 'cmsClientInfo',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/client/info/info.vue'),
        },
        {
            path: '/cms/client/device',
            name: 'cmsClientDevice',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/client/device/device.vue'),
        },
        {
            path: '/cms/client/destroy',
            name: 'cmsClientDestroy',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/client/destroy/destroy.vue'),
        },
        {
            path: '/cms/client/login/record',
            name: 'cmsClientLoginRecord',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/client/login/record.vue'),
        },
        {
            path: '/cms/client/login/counter/record',
            name: 'cmsClientLoginCounterRecord',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/client/login/counter.vue'),
        },
        {
            path: '/cms/operate/quote/market',
            name: 'cmsOperateQuoteMarket',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/quote/market/market.vue'),
        },
        {
            path: '/cms/operate/quote/market/detail/:id',
            name: 'cmsOperateQuoteMarketDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/quote/market/detail.vue')
        },
        {
            path: '/cms/operate/quote/member',
            name: 'cmsOperateQuoteMember',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/quote/member/member.vue'),
        },
        {
            path: '/cms/operate/quote/record',
            name: 'cmsOperateQuoteRecord',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/quote/record/record.vue'),
        },
        {
            path: '/cms/operate/quote/cdkey',
            name: 'cmsOperateQuoteCdkey',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/quote/cdkey/cdkey.vue'),
        },
        {
            path: '/cms/operate/quote/cdkey/create',
            name: 'cmsOperateQuoteCdkeyCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/quote/cdkey/create.vue')
        },
        {
            path: 'cms/operate/quote/cdkey/detail/:id',
            name: 'cmsOperateQuoteCdkeyDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/quote/cdkey/detail.vue')
        },
        {
            path: '/cms/operate/quote/cdkeyNo/:id',
            name: 'cmsOperateQuoteCdkeyNo',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/quote/cdkey/cdkeyNo.vue'),
        },
        {
            path: '/cms/operate/integral/market',
            name: 'cmsOperateIntegralMarket',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/integral/market/market.vue'),
        },
        {
            path: '/cms/operate/integral/market/detail/:id',
            name: 'cmsOperateIntegralMarketDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/integral/market/detail.vue')
        },
        {
            path: '/cms/operate/integral/task',
            name: 'cmsOperateIntegralTask',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/integral/task/task.vue'),
        },
        {
            path: '/cms/operate/integral/task/update/:id',
            name: 'cmsOperateIntegralTaskUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/integral/task/update.vue')
        },
        {
            path: '/cms/operate/integral/task/detail/:id',
            name: 'cmsOperateIntegralTaskDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/integral/task/detail.vue')
        },
        {
            path: '/cms/operate/integral/task/create',
            name: 'cmsOperateIntegralTaskCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/integral/task/create.vue')
        },
        {
            path: '/cms/operate/symbol/screener',
            name: 'cmsOperateSymbolScreener',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/symbol/screener/screener.vue')
        },
        {
            path: '/cms/operate/symbol/hot',
            name: 'cmsOperateSymbolHot',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/symbol/hot/hot.vue')
        },
        {
            path: '/cms/operate/symbol/hot/detail/:id',
            name: 'cmsOperateSymbolHotDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/symbol/hot/detail.vue')
        },
        {
            path: '/cms/operate/match',
            name: 'cmsOperateMatch',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/symbol/match/match.vue'),
        },
        {
            path: '/cms/operate/match/update/:id',
            name: 'cmsOperateMatchUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/symbol/match/update.vue')
        },
        {
            path: '/cms/operate/match/detail/:id',
            name: 'cmsOperateMatchDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/symbol/match/detail.vue')
        },
        {
            path: '/cms/operate/match/create',
            name: 'cmsOperateMatchCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/operate/symbol/match/create.vue')
        },
        {
            path: '/cms/operate/match/matchAccount/:id',
            name: 'cmsOperateQuoteMatchAccount',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/symbol/match/matchAccount.vue'),
        },
        {
            path: '/cms/operate/match/matchRanking/:id',
            name: 'cmsOperateQuoteMatchRanking',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/symbol/match/matchRanking.vue'),
        },
        {
            path: '/cms/agent/settlement/detail',
            name: 'cmsAgentSettlementDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/settlement/detail.vue'),
        },
        {
            path: '/cms/agent/home',
            name: 'cmsAgentHome',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/home/home.vue'),
        },
        {
            path: '/cms/operate/match/matchAccount/positionRecords',
            name: 'cmsOperateQuoteMatchPosition',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/symbol/match/positionRecords.vue'),
        },
        {
            path: '/cms/operate/match/matchAccount/transactionRecords',
            name: 'cmsOperateQuoteMatchTransaction',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/operate/symbol/match/transactionRecords.vue'),
        },
        {
            path: '/cms/agent/settlement/settlement',
            name: 'cmsAgentSettlement',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/settlement/settlement.vue'),
        },
        {
            path: '/cms/agent/withdraw',
            name: 'cmsAgentWithdraw',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/withdraw/withdraw.vue'),
        },
        {
            path: '/cms/agent/invite',
            name: 'cmsAgentInvite',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/invite/invite.vue'),
        },
        {
            path: '/cms/agent/invite/detail/:id',
            name: 'cmsCustomDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/agent/invite/detail.vue')
        },
        {
            path: '/cms/agent/channel',
            name: 'cmsAgentChannel',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/channel/channel.vue'),
        },
        {
            path: '/cms/agent/manage',
            name: 'cmsAgentManage',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/agent/manage/manage.vue'),
        },
        {
            path: '/cms/agent/manage/update/:id',
            name: 'cmsAgentManageUpdate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/agent/manage/update.vue')
        },
        {
            path: '/cms/agent/manage/create',
            name: 'cmsAgentManageCreate',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/agent/manage/create.vue')
        },
        {
            path: '/market/ipo/symbol',
            name: 'marketIPOSymbolList',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/ipo/symbol/symbol.vue')
        },
        {
            path: '/market/ipo/symbol/detail/:id',
            name: 'marketIPOSymbolDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/ipo/detail/detail.vue')
        },
        {
            path: 'bankCard/client',
            name: 'cmsBankCardClient',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/bankCard/client/client.vue'),
        },
        {
            path: 'bankCard/client/detail/:id',
            name: 'cmsBankCardClientDetail',
            meta: {
                login: true
            },
            component: () => import('@/pages/cms/bankCard/client/detail.vue')
        },
        {
            path: 'bankCard/system',
            name: 'cmsBankCardSystem',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/bankCard/system/system.vue'),
        }, {
            path: 'bankCard/system/create',
            name: 'cmsBankCardSystemCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/bankCard/system/create.vue'),
        }, {
            path: 'bankCard/system/detail/:id',
            name: 'cmsBankCardSystemDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/bankCard/system/detail.vue'),
        }, {
            path: 'bankCard/system/update/:id',
            name: 'cmsBankCardSystemUpdate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/bankCard/system/update.vue'),
        },
        {
            path: '/cms/asset/payment',
            name: 'cmsAssetPayment',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/payment/payment.vue'),
        },{
            path: '/cms/asset/payment/detail/:id',
            name: 'cmsAssetPaymentDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/payment/detail.vue'),
        },
        {
            path: '/cms/asset/withdraw',
            name: 'cmsAssetWithdraw',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/withdraw/withdraw.vue'),
        },{
            path: '/cms/asset/withdraw/detail/:id',
            name: 'cmsAssetWithdrawDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/withdraw/detail.vue'),
        },
        {
            path: '/cms/asset/exchange',
            name: 'cmsAssetExchange',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/exchange/exchange.vue'),
        },{
            path: '/cms/asset/exchange/detail/:id',
            name: 'cmsAssetExchangeDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/cms/asset/exchange/detail.vue'),
        },
        {
            path: '/market/ipo/symbol/detail/:id',
            name: 'marketIPOSymbolEdit',
            meta: {
                login: true
            },
            component: () => import('@/pages/market/ipo/detail/detail.vue')
        }
    ]
}