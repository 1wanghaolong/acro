export const system = {
    path: '/system',
    name: 'system',
    meta: {
        login: true,
    },
    children: [{
        path: 'user',
        name: 'systemUser',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/user/user.vue')
    },{
        path: 'user/info',
        name: 'systemUserInfo',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/user/info.vue')
    }, {
        path: 'role',
        name: 'systemRole',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/role/role.vue')
    }, {
        path: 'auth',
        name: 'systemAuth',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/auth/auth.vue')
    },{
        path: '/system/filter',
        name: 'systemFilter',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/filter/filter.vue')
    },
    {
        path: '/system/event',
        name: 'systemEvent',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/event/event.vue')
    },
    {
        path: '/system/log',
        name: 'systemLog',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/log/log.vue')
    },
    {
        path: '/system/version',
        name: 'systemVersion',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/version/version.vue')
    },
    {
        path: '/system/operationLog',
        name: 'systemOperationLog',
        meta: {
            login: true,
        },
        component: () => import('@/pages/system/operationLog/operationLog.vue')
    },

]
}