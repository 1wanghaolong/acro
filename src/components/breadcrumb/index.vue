<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-home />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in useMenuTreeFind(local.menus,route.name)" :key="item.url">
      {{ item?.title[local.lang] }}
    </a-breadcrumb-item>
    <a-breadcrumb-item v-if="!useMenuTreeFind(local.menus,route.name)?.length">
      {{ $t(`router.${String(route.name)}`) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { useMenuTreeFind } from '@/hooks/tree'
const local = useLocal()
const route = useRoute()
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 16px 0;

  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));

    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
