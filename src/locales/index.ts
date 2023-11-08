import { createI18n } from 'vue-i18n'


import locZh from './zh-CN.json'
import locTc from './zh-HK.json'
import locEn from './en.json'

import arcoZh from "@arco-design/web-vue/es/locale/lang/zh-cn.js";
import arcoTc from "@arco-design/web-vue/es/locale/lang/zh-tw.js";
import arcoEn from "@arco-design/web-vue/es/locale/lang/en-us.js";

export const LOCALE_OPTIONS = [
  { label: '中文简体', value: 'zh-CN' },
  { label: 'English', value: 'en' },
  { label: '中文繁體', value: 'tc' },
];

const messages = {
  'zh-CN': {
    ...locZh,
    ...arcoZh
  },
  tc: {
    ...locTc,
    ...arcoTc
  },
  en: {
    ...locEn,
    ...arcoEn
  }
}
const local = JSON.parse(String(localStorage.getItem('local')))
const i18n = createI18n({
  globalInjection:true, // 设置为true挂载到全局可使用$t,否则报错
  legacy: false,
  locale:  local?.lang  || 'zh-CN',
  messages: messages
})

export default i18n