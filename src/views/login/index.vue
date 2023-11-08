<template>
  <div class="container login">
    <div class="langSelect">
      <span
        :class="lang == 'tc' ? 'blueText' : ''"
        @click="setLocal('tc')"
      >{{ $t('login.index.5t081aikwk00') }}</span>
      <span>|</span>
      <span
        :class="lang == 'zh-CN' ? 'blueText' : ''"
        @click="setLocal('zh-CN')"
      >{{ $t('login.index.5t081aikxsg0') }}</span>
      <span>|</span>
      <span
        :class="lang == 'en' ? 'blueText' : ''"
        @click="setLocal('en')"
      >EN</span>
    </div>
    <div class="content">
      <div class="login_left">
        <div class="logo">
          <img :src="logoin.logo_login" alt="" class="logo">
        </div>
        <!-- <img draggable="false" v-show="true" :src="$store.state.user.nameLogo.loginLogo" alt="" class="logo" /> -->
        <!-- <h1 style="text-align: center">{{ 'LINKESOP开户后台' }}</h1> -->
        <logincarousel></logincarousel>
        <div>
          <p class="fonts">©{{ $t('login.index.5t081aikxx80') }}</p>
        </div>
      </div>
      <loginForm></loginForm>
      <!-- <h3 class="title" style="text-align: center;">{{ "欢迎登录" }}</h3> -->
    </div>

    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref,reactive } from 'vue';
  import loginForm from "./components/login-form.vue";
  import logincarousel from "./components/login-carousel.vue";
  import { logologin } from '@/api/api';
  import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
  let logoin:any = reactive({
    logo_login: '',
    open_account_icon: '',
    terminal_name: "",
  });
  const router = useRouter();
  const lang:any = ref("")
  const logo = async () =>{
    const { data } = await logologin()
    logoin.logo_login = data?.logo_login
    logoin.terminal_name = data.terminal_name 
  }
  const setLocal = (val:any) =>{
    if (!val) {
      return
    }
    localStorage.setItem('arco-locale',val)
    router.go(0)
  }
  {
    lang.value = localStorage.getItem('arco-locale') || "zh-CN"
  }
  logo()
</script>

<script lang="ts">
  export default {
    name: 'login', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/images/login2.png');
    background-size: cover;
  }
  .rightEye {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    cursor: pointer;
  }
  .langSelect {
    position: absolute;
    top: 20px;
    right: 30px;
    cursor: pointer;
    user-select: none;
    .blueText {
      color: rgb(var(--arcoblue-6))
    }
    span {
      margin: 0 3px;
      font-size: 16px;
    }
  }

  .login-form {
    border-radius: 6px;
    background: var(--color-bg-5);
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .content {
    background: var(--color-bg-5);
    width: 800px;
    height: 500px;
    overflow: hidden;
    box-shadow: 0px 4px 33px 4px rgba(240, 240, 240, 0.8);
    display: flex;
    align-items: center;
    .leftImg {
      position: relative;
      width: 350px;
      font-size: 0;
      .leftBg {
        width: 100%;
      }
      .leftimg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 200px;
      }
    }
    .el-form {
      flex: 1;
      padding: 0 50px;
      .title {
        width: auto;
        margin: 0 auto 30px auto;
        text-align: center;
        color: var(--color-text-2);
        font-weight: 500;
        letter-spacing: 3px;
        font-size: 22px;
      }
      .el-form-item {
        margin-bottom: 22px;
      }
      .el-form-item--small .el-form-item__content,
      .el-form-item--small .el-form-item__label {
        line-height: 38px;
      }
      .el-input--small .el-input__inner {
        height: 38px;
        line-height: 38px;
      }
      .el-input__prefix {
        position: absolute;
        height: 100%;
        left: 5px;
        top: 0;
        text-align: center;
        color: var(--color-text-3);
        transition: all 0.3s;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
      .el-input .el-input__suffix-inner img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      .formItemCode {
        .el-form-item__content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .el-form-item__content::before {
          display: none;
        }
      }
      .el-form-item__content::after {
        display: none;
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
      .loginBtn {
        font-size: 16px;
        padding: 11px;
      }
    }
    .login_left {
      height: 100%;
      width: 50%;
      float: left;
      background-position: center !important;
      background-size: cover !important;
      background-image: url('@/assets/images/login8.png');
      background-repeat: no-repeat;
      position: relative;
      //   /deep/.el-carousel__container{
      //   padding-bottom: 30px;
      h1 {
        color: var(--color-text-1);
      }
      .logo{
        padding-top: 30px;
        width: 146px;
        margin-left: 16px;
      }
      .fonts{
        font-size: 12px;
        width: 50%;
        color: #fff;
        line-height: 20px;
        position: absolute;
        bottom: 38px;
        left: 30px;
      }
      // }
    }
  }
</style>
