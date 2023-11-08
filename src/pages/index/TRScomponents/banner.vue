<template>
  <a-col class="banner">
    <a-col :span="8">
      <a-typography-title :heading="5" style="margin-top: 0" class='title'>
        {{ $t('TRScomponents.banner.5ulhi1fvzwo0') }} {{ userInfo.name }}
      </a-typography-title>
    </a-col>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  const local = useLocal()
  const userInfo = computed(() => {
    return {
      name: local.loginConfig.username,
    };
  });
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
  .title{
    display: flex;
    align-items: center;
    height: 50px;
    margin-left: 20px;
    margin-bottom:0px;
  }
  :deep(.arco-divider-horizontal){
    margin:0px;
  }
</style>
