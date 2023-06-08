<template>
  <a-card class="general-card" :title="$t('userInfo.title.myProject')">
    <template #extra>
      <a-link>{{}}</a-link>
    </template>
    <a-row :gutter="16">
      <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
        <div style="display: flex">
          <a-form-item
            field="name"
            tooltip="请输入姓名"
            label="姓名"
            :rules="rules1"
          >
            <a-input
              v-model="form.name"
              placeholder="请输入姓名"
              allow-clear
              show-word-limit
              :max-length="5"
            />
          </a-form-item>
          <div class="tistyle"> 用户姓名不作为登录使用 </div>
        </div>
        <div style="display: flex">
          <a-form-item
            field="mobile"
            label="手机号"
            tooltip="请输入手机号"
            :rules="rules2"
          >
            <a-input
              v-model="form.mobile"
              placeholder="请输入手机号"
              allow-clear
              show-word-limit
              :max-length="11"
            />
          </a-form-item>
          <div class="tistyle"> 手机号码不能重复 </div>
        </div>
        <div style="display: flex;padding-right: 165px;">
          <a-form-item>
            <a-button html-type="submit" type="primary">保存配置</a-button>
          </a-form-item>
        </div>
      </a-form>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useUserStore } from '@/store';

  const userInfo = useUserStore();

  const form = reactive({
    name: userInfo.name || '',
    mobile: userInfo.mobile || '',
  });
  const rules1 = ref([
    { required: true, message: '请输入姓名' },
    { minLength: 5, message: 'must be greater than 5 characters' },
  ]);
  const rules2 = ref([
    { required: true, message: '请输入手机号' },
    { minLength: 11, message: 'must be greater than 11 characters' },
    { match: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ },
  ]);
  const handleSubmit = (data: any) => {
    console.log(data);
  };
</script>

<style scoped lang="less">
  :deep(.arco-card-body) {
    min-height: 128px;
    padding-bottom: 0;
  }
  .my-project {
    &-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &-title {
      margin-top: 0 !important;
      margin-bottom: 18px !important;
    }

    &-list {
      display: flex;
      justify-content: space-between;
    }

    &-item {
      // padding-right: 16px;
      margin-bottom: 16px;

      &:last-child {
        padding-right: 0;
      }
    }
  }
  .tistyle {
    padding-left: 10px;
    width: 234px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: rgb(192, 192, 192);
  }
</style>
