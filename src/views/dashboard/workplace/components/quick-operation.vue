<template>
  <a-card
    class="general-card"
    :title="$t('components.quick-operation.5szowemmti80')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <template #extra>
      <a-link>{{ $t('components.quick-operation.5szowemmuiw0') }}</a-link>
    </template>
    <a-row :gutter="8">
      <a-col v-for="link in links" :key="link.text" :span="8" class="wrapper">
        <div class="icon">
          <component :is="link.icon" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t(link.text) }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script lang="ts" setup>
  const links = [
    { text: '上传上手结单', icon: 'icon-file' },
    { text: '新增TRS账户', icon: 'icon-storage' },
    { text: '新增资金账户', icon: 'icon-settings' },
    { text: '账户申请处理', icon: 'icon-mobile' },
    { text: '融资申请处理', icon: 'icon-fire' },
    { text: '单票申请处理', icon: 'icon-fire' },
    { text: '解约申请处理', icon: 'icon-fire' },
    { text: '续约申请处理', icon: 'icon-fire' },
  ];
</script>

<style scoped lang="less"></style>
