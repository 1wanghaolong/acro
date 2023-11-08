<template>
  <a-config-provider :locale="locale">
    <template #empty>
      <a-empty in-config-provider>
        <template #image>
          <img style="width: 76.8px;height: 42px;margin-top: 20px;" src="@/assets/img/none.png">
        </template>
        <span style="font-size: 12px;">暂无数据</span>
      </a-empty>
    </template>
    <router-view></router-view>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { Notification, Button } from '@arco-design/web-vue';
import { h } from 'vue';
import { computed } from 'vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import zhTW from "@arco-design/web-vue/es/locale/lang/zh-tw";
import useLocale from '@/hooks/locale';
const { t } = useI18n()
const route = useRoute()
const local = useLocal()
const temp = useTemp()
const html = ref()
const menuList = computed(() => {
  return useTreeToList(local.menus)
})
const routerWatch = watch(() => [route.name, local.lang], () => {
  let menu = menuList.value.find((item: any) => item.url == route.name)
  document.title = menu?.title?.[local.lang] || t(`router.${String(route.name)}`)
  menu && (local.menuActive = String(route.name))
})
const checkUpdate = async () => {
  const nowHtml = await fetch('/?timetemp=' + Date.now()).then((res) => res.text());
  if (!html.value) return (html.value = nowHtml)
  if (html.value != nowHtml) {
    Notification.clear()
    Notification.info({
      title: '发现新版本！',
      content: '请刷新页面体验最新版本',
      duration: 0,
      footer: () => h(Button, {
        onClick: () => {
          location.reload()
        }
      }, () => '立即更新')
    })
  }
}
const changeFavicon = (link: string) => {
  let favicon: any = document.querySelector('link[rel="icon"]')
  if (favicon !== null) {
    favicon.href = link;
  } else {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = link;
    document.head.appendChild(favicon);
  }
};

const timer = ref()


const { currentLocale } = useLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      return zhCN;
    case 'en':
      return enUS;
    case 'tc':
      return zhTW;
    default:
      return zhCN;
  }
});
onBeforeUnmount(() => {
  routerWatch && routerWatch()
  clearInterval(timer.value)
  if (temp.setIntervalName) {
    clearInterval(temp.setIntervalName);
  }
  timer.value = null
})
onMounted(() => {
  if (!import.meta.env.DEV) {
    timer.value = setInterval(() => {
      checkUpdate()
    }, 30000)
  }
})
{
  local.init?.icon && changeFavicon(local.init.icon)
}
</script>