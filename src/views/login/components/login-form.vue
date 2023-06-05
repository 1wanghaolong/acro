<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ "欢迎登录" }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: messge.username }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          placeholder="账号"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: messge.password }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <div style="display: flex;">
        <a-form-item
          field="code"
          :rules="[{ required: true, message: messge.code }]"
          :validate-trigger="['change', 'blur']"
          hide-label
          style="width: 50%;"
        >
          <a-input
            v-model="userInfo.code"
            placeholder="验证码"
            allow-clear

          >
            <template #prefix>
              <icon-safe />
            </template>
          </a-input>
        </a-form-item>
        <div class="login-code" >
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </div>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ "记住账号" }}
          </a-checkbox>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ "登录" }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  import { getCodeImg } from '@/api/user';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  // 验证码开关
  const captchaEnabled:any = ref(true);
  const messge = reactive({
    username:"请输入您的账号",
    password:"请输入您的密码",
    code:'请输入验证码'
  })
  const codeUrl = ref('')
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'root', // 演示默认值
    // password: 'LinkESOP2022', // demo default value
    // code:''
  });
  const userInfo = reactive({
    username: "root",
    password: "LinkESOP2022",
    code:'',
    key:""
  });

  const getCode = async () => {
    const { data } = await getCodeImg();
    captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled;
    codeUrl.value = ''+data.base64;
    userInfo.key = data.key || "";
    
    // getCodeImg().then((res) => {
    //   let { data = {} } = res;
    //   captchaEnabled.value =
    //     res.captchaEnabled === undefined ? true : res.captchaEnabled;
    //   if (JSON.stringify("data") != "{}") {
    //     codeUrl.value = "data:image/gif;base64," + data.img;
    //     loginForm.value.uuid = data.uuid;
    //   }
    // });
  }

  getCode()
  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('登录成功'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.username = rememberPassword ? username : '';
        // loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      flex: 1;
      padding: 0 40px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 90px;
      text-align: center;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
  .login-code {
      width: 50%;
      display: inline-block;
      height: 38px;
      padding-left: 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
</style>
