import { Message } from '@arco-design/web-vue';
export default function useLocale() {
const router = useRouter();
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value;
  });
  const changeLocale = (value: any) => {
    if (i18.locale.value === value) {
      return;
    }
    router.go(0);
    i18.locale.value = value;
    useLocal().lang = value
    Message.success(i18.t('hooks.locale'));
  };
  return {
    currentLocale,
    changeLocale,
  };
}
