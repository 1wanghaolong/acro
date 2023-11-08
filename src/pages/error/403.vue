<template>
    <div class="content">
      <a-result class="result" status="403" subtitle="对不起，您没有访问该资源的权限"> </a-result>
      <div class="operation-row">
        <a-button key="back" type="primary" @click="back">返回首页</a-button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { useRouter } from 'vue-router';
  
    const router = useRouter();
    const back = () => {
      router.push('/');
    };
  </script>
  
  <style scoped lang="less">
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -95px;
      margin-top: -121px;
      text-align: center;
    }
  </style>
  