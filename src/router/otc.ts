export const otc = {
    path: '/otc',
    name: 'otc',
    meta: {
        login: true,
    },
    children: [
        {
            path: 'account/account',
            name: 'otcAccount',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/account/account.vue'),
        }, {
            path: 'account/create',
            name: 'otcAccountCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/account/create.vue'),
        },
        {
            path: 'account/payment/record',
            name: 'otcAccountPaymentRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/otc/account/payment/record.vue'),
        },{
            path: 'account/withdraw/record',
            name: 'otcAccountWithdrawRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/otc/account/withdraw/record.vue'),
        },{
            path: 'account/transfer/record',
            name: 'otcAccountTransferRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/otc/account/transfer/record.vue'),
        },{
            path: 'account/exchange/record',
            name: 'otcAccountExchangeRecord',
            meta: {
                login: true
            },
            component: () => import('@/pages/otc/account/exchange/record.vue'),
        }, {
            path: 'account/detail/:id',
            name: 'otcAccountDetail',
            redirect: {
                name: 'otcAccountDetailIndex'
            },
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/detail/detail.vue'),
            children: [{
                path: 'index',
                name: 'otcAccountDetailIndex',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/detail/index.vue'),
            }, {
                path: 'charge',
                name: 'otcAccountDetailCharge',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/detail/charge.vue'),
            }, {
                path: 'payment',
                name: 'otcAccountDetailPayment',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/payment/payment.vue'),
            }, {
                path: 'withdraw',
                name: 'otcAccountDetailWithdraw',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/withdraw/withdraw.vue'),
            }, {
                path: 'transfer',
                name: 'otcAccountDetailTransfer',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/transfer/transfer.vue'),
            }, {
                path: 'exchange',
                name: 'otcAccountDetailExchange',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/exchange/exchange.vue'),
            }, {
                path: 'assure',
                name: 'otcAccountDetailAssure',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/assure/assure.vue'),
            }, {
                path: 'record',
                name: 'otcAccountDetailRecord',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/record/record.vue'),
            },
            {
                path: 'wealthRecord',
                name: 'wealthAccountDetailRecord',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/record/wealthrecord.vue'),
            },
            {
                path: 'wealthsettlement',
                name: 'wealthAccountSettlement',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/settlement/wealthsettlement.vue'),
            },{
                path: 'otcsettlement',
                name: 'OTCAccountSettlement',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/account/settlement/otcsettlement.vue'),
            }]
        }, {
            path: 'account/payment/detail/:id',
            name: 'otcAccountPaymentDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/payment/detail.vue'),
        }, {
            path: 'account/withdraw/detail/:id',
            name: 'otcAccountWithdrawDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/withdraw/detail.vue'),
        }, {
            path: 'account/transfer/detail/:id',
            name: 'otcAccountTransferDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/transfer/detail.vue'),
        }, {
            path: 'account/exchange/detail/:id',
            name: 'otcAccountExchangeDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/exchange/detail.vue'),
        },
        {
            path: 'account/payment/apply',
            name: 'otcAccountPaymentApply',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/payment/apply.vue'),
        },
        {
            path: 'account/payment/create',
            name: 'otcAccountPaymentCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/payment/create.vue')
        },
        {
            path: 'account/withdraw/apply',
            name: 'otcAccountWithdrawApply',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/withdraw/apply.vue')
        },
        {
            path: 'account/transfer/apply',
            name: 'otcAccountTransferApply',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/transfer/apply.vue')
        },
        {
            path: 'account/exchange/apply',
            name: 'otcAccountExchangeApply',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/account/exchange/apply.vue')
        },
        {
            path: 'pi',
            name: 'otcPi',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/pi/list.vue')
        }, {
            path: 'pi/create',
            name: 'otcPiCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/pi/create.vue'),
        }, {
            path: 'pi/detail/:id',
            name: 'otcPiDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/pi/detail.vue'),
        }, {
            path: 'risk',
            name: 'otcRisk',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/risk/list.vue')
        }, {
            path: 'risk/create',
            name: 'otcRiskCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/risk/create.vue'),
        }, {
            path: 'risk/detail/:id',
            name: 'otcRiskDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/risk/detail.vue'),
        },
        {
            path: '/customer/customerList',
            name: 'otcClientCustomer',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/client/customer/customerList/customer.vue'),
        },
        {
            path: 'customer/detail/:customid',
            name: 'otcCustomerDetail',
            redirect: {
                name: 'otcCustomerDetailIndex'
            },
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/client/customer/detail/detail.vue'),
            children: [{
                path: 'index',
                name: 'otcCustomerDetailIndex',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/client/customer/detail/index.vue'),
            }, {
                path: 'account',
                name: 'otcCustomerDetailAccount',
                meta: {
                    login: true,
                },
                component: () => import('@/pages/otc/client/customer/detail/account.vue'),
            }]
        },
        {
            path: 'managerList',
            name: 'otcClientManager',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/client/manager/manger.vue'),
        }, 
        {
            path: 'bankCard/client',
            name: 'otcBankCardClient',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/bankCard/client/client.vue'),
        }, {
            path: 'bankCard/system',
            name: 'otcBankCardSystem',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/bankCard/system/system.vue'),
        }, {
            path: 'bankCard/system/create',
            name: 'otcBankCardSystemCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/bankCard/system/create.vue'),
        }, {
            path: 'bankCard/system/detail/:id',
            name: 'otcBankCardSystemDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/bankCard/system/detail.vue'),
        }, {
            path: 'bankCard/system/update/:id',
            name: 'otcBankCardSystemUpdate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/bankCard/system/update.vue'),
        },
        {
            path: '/otc/package/charge',
            name: 'otcPackageCharge',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/package/charge/charge.vue'),
        },
        {
            path: '/otc/package/charge/create',
            name: 'otcPackageChargeCreate',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/package/charge/create/create.vue'),
        },
        {
            path: '/otc/package/charge/detail/:id',
            name: 'otcPackageChargeDetail',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/package/charge/detail.vue'),
        },
        {
            path: '/otc/settlement/orderDay',
            name: 'OTCthSettlementOrderDay',
            meta: {
                login: true,
            },
            component: () => import('@/pages/otc/settlement/orderDay/orderDay.vue'),
        },
    ]
}