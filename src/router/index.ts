import { createRouter, createWebHashHistory } from 'vue-router';
import { system } from './system'
import { otc } from './otc'
import { trs } from './trs'
import { wealth } from './wealth'
import { market } from './market'
import { config } from './config'
import { cms } from './cms'
import Layout from '@/components/layout/layout.vue'
const routes = [
    {
        path: '/',
        component: Layout,
        meta: {
            login: true
        },
        children: [{
            path: '/index',
            name: 'index',
            meta: {
                login: true
            },
            component: () => import('@/pages/index/index.vue'),
        }, {
            path: '/404',
            name: '404',
            meta: {
                login: true
            },
            component: () => import('@/pages/error/404.vue'),
        }, {
            path: '/403',
            name: '403',
            meta: {
                login: true
            },
            component: () => import('@/pages/error/403.vue'),
        },{
            path: '/410',
            name: '410',
            meta: {
                login: true
            },
            component: () => import('@/pages/error/410.vue'),
        },
        {
            ...otc
        },
        {
            ...system
        },
        {
            ...trs
        },
        {
            ...wealth
        },
        {
            ...market
        },
        {
            ...config
        },
        {
            ...cms
        }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            keepAlive: false,
            login: false
        },
        component: () => import('@/pages/login/login.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
router.beforeEach((to, _, next) => {
    const temp = useTemp()
    // 拦截无token页面
    if (to.meta.login && !temp?.token) return next({ name: 'login' })
    if(to.path == '/'){
        let name = useFirstMenu()
        if(router.hasRoute(name)) return next({name})
        return next({ name: '410' })
    }
    // 拦截无权限页面
    if (to.meta.login && !usePermission([String(to.name)]) && !['403','404','410','login'].includes(String(to.name))) return next({ name: '403' })
    next()
});

export default router;