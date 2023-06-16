<template>
  <div class="header">
    <a-space :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <icon-camera />
        </template>
        <img :src="userInfo.avatar" />
      </a-avatar>
      <a-typography-title :heading="6" style="margin: 0">
        {{ userInfo.name }}
      </a-typography-title>
      <div class="user-msg">
        <a-space :size="18">
          <div>
            <icon-user />
            <a-typography-text>{{ userInfo.username }}</a-typography-text>
          </div>
          <div>
            <icon-phone />
            <a-typography-text>{{ userInfo.mobile}}</a-typography-text>
          </div>
          <div>
            <icon-home />
            <a-typography-text>
              {{ userInfo.name }}
            </a-typography-text>
          </div>
        </a-space>
        <div class="icon">
          <icon-thumb-up-fill />
          <icon-heart-fill />
          <icon-star-fill />
          <!-- <icon-thumb-down-fill /> -->
        </div>
        <div class="icon" @click="modifyPassword" style="color:#317ef3;cursor: pointer;">
          修改密码
        </div>
      </div>
    </a-space>

    <a-modal
        v-model:visible="visible"
        @cancel="handleCancel"
        @ok="handleOk"
        unmountOnClose
        :align-center="false"
        title-align="start"
      >
        <template #title> 修改密码 </template>
        <div>
          <a-form ref="formRef" :model="form" :style="{ width: '100%' }">
            <a-form-item field="password_old" label="旧密码">
              <a-input v-model="form.password_old" placeholder="旧密码" />
            </a-form-item>
            <a-form-item field="password_new" label="新密码">
              <a-input v-model="form.password_new" placeholder="新密码" />
            </a-form-item>
            <a-form-item field="password_confirm" label="确认密码">
              <a-input v-model="form.password_confirm" placeholder="确认密码" />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store';
  import { reactive, ref, h } from 'vue';
  const userInfo = useUserStore();
  const visible = ref(false);
  const form = reactive({
    password_old: '',
    password_new: '',
    password_confirm: "",
  });
  const modifyPassword = () =>{
    visible.value = true;
  }
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 204px;
    color: var(--gray-10);
    background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
      no-repeat;
    background-size: cover;
    border-radius: 4px;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }
    .user-msg {
      .arco-icon {
        color: rgb(var(--gray-10));
      }
      .icon{
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;
      }
      .arco-typography {
        margin-left: 6px;
      }
    }
  }
</style>
