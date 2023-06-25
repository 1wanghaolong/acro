<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });
</script>
<style>
::-webkit-scrollbar {
    width: 5px; /*对垂直流动条有效*/
    height: 5px; /*对水平流动条有效*/
}
 
::-webkit-scrollbar-track{
    border-radius: 50px;
    background-color: var(--color-bg-2); 
}
 
::-webkit-scrollbar-thumb{
    border-radius: 20px;
    background-color: var(--color-fill-2);
}
 
</style>

