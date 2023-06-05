<template>
  <div class="container login">
    <div class="langSelect">
      <!-- <span
        :class="lang == 'tc-TW' ? 'blueText' : ''"
        @click="setLocal('tc-TW')"
      >{{$t('views.login.5o6uqijmp9s0')}}</span>
      <span>|</span>
      <span
        :class="lang == 'zh-CN' ? 'blueText' : ''"
        @click="setLocal('zh-CN')"
      >{{$t('views.login.5o6u6ziikrs0')}}</span>
      <span>|</span>
      <span
        :class="lang == 'en-US' ? 'blueText' : ''"
        @click="setLocal('en-US')"
      >EN</span> -->
    </div>
    <div class="content">
      <div class="login_left">
        <!-- <img draggable="false" v-show="true" :src="$store.state.user.nameLogo.loginLogo" alt="" class="logo" /> -->
        <h1 style="text-align: center">{{ '通源数据监控平台' }}</h1>
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

  const form = reactive({
    name: '',
    post: '',
    isRead: true,
  });
  const layout:any = ref('vertical')
  const handleSubmit = () => {};
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
      color: #448ef6;
    }
    span {
      margin: 0 3px;
      font-size: 16px;
    }
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
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
    background: #ffffff;
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
        color: #707070;
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
        color: #c0c4cc;
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
      display: flex;
      justify-content: center;
      align-items: center;
      //   // position: relative;
      //   /deep/.el-carousel__container{
      //   padding-bottom: 30px;
      h1 {
        color: #fff;
      }
      // }
    }
  }
</style>
