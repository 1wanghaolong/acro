import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import i18n from './locales';
import pinia from './store';
import directive from './directive';
import {useNumberFormat,dataFormat} from '@/hooks/permission'
import '@arco-design/web-vue/es/message/style/css.js'
import '@arco-design/web-vue/es/notification/style/css.js'
import './assets/css/style.less'
import 'https://lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_28391_19.6ad7c1fc8fc34d5d5b907c40dcf6c655.js'
const app = createApp(App)
// 定义 $permission 方法
app.config.globalProperties.$permission = usePermission
app.config.globalProperties.$numberFormat = useNumberFormat
app.config.globalProperties.$dataFormat = dataFormat

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(directive);
app.mount('#app')
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $permission: any;
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $numberFormat: any
    }
}  
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dataFormat: any
    }
}  