<template>
  <a-card
    class="general-card"
    title="系统资源"
    :header-style="{ paddingBottom: 0 }"
    :body-style="{ paddingTop: 0 }"
  >
    <template #extra>
      <!-- <a-link>{{ '查看更多' }}</a-link> -->
    </template>
    <a-row style="margin-top: 10px;">
      <a-col :span="12">
        <a-link style="height: 40px;">
          {{ 'APP下载地址' }}
        </a-link>
      </a-col>
      <a-col :span="12">
        <a-link style="height: 40px;">
          {{ 'PC下载地址' }}
        </a-link>
      </a-col>
      <a-col :span="12">
        <a-link style="height: 40px;">
          {{ 'ISDA协议模板下载' }}
        </a-link>
      </a-col>
      <a-col :span="12">
        <a-link style="height: 40px;">
          {{ '风险问卷模板下载' }}
        </a-link>
      </a-col>
    </a-row>
  </a-card>
</template>

<style lang="less" scoped>
  .arco-card-body .arco-link {
    margin: 10px 0;
    color: rgb(var(--gray-8));
  }
</style>
