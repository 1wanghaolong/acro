import { createI18n } from 'vue-i18n';
import zhLocale from './zh-CN.json'
import tcLocale from './zh-TW.json'
import enLocale from './en.json'

const messages = {
  'zh-CN': {
      ...zhLocale
  },
  tc: {
      ...tcLocale
  },
  en: {
    ...enLocale
  }
}

export const LOCALE_OPTIONS = [
  { label: "中文", value: 'zh-CN' },
  { label: '英文', value: 'en' },
  { label: '繁体', value: 'tc' },
];
const defaultLocale = localStorage.getItem('arco-locale') || 'zh-CN';

const i18n = createI18n({
  globalInjection:true, // 设置为true挂载到全局可使用$t,否则报错
  locale: defaultLocale,
  legacy: false,
  allowComposition: true,
  messages: messages
});

export default i18n;
