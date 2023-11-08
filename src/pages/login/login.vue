<template>
    <div class="login">
        <div class="langSelect">
            <span :class="local.lang == 'zh-CN' ? 'blueText' : ''" @click="setLocal('zh-CN')">{{
                $t('login.login.5un2dj466gg0') }}</span>
            <span>|</span>
            <span :class="local.lang == 'tc' ? 'blueText' : ''" @click="setLocal('tc')">{{ $t('login.login.5un2dj46jcs0')
            }}</span>
            <span>|</span>
            <span :class="local.lang == 'en' ? 'blueText' : ''" @click="setLocal('en')">EN</span>
        </div>
        <div class="loginBox">
            <div class="left">
                <div>
                    <img v-if="local.init.logo[local.theme == 'light' ? 'white' : 'black']"
                        :src="local.init.logo[local.theme == 'light' ? 'white' : 'black']">
                    <img v-else src="@/assets/img/logo.png">
                </div>
                <div>
                    <a-carousel :style="{
                        width: '300px',
                        height: '60%',
                    }" indicator-type="line" :auto-play="true" show-arrow="never">
                        <a-carousel-item v-for="item in list">
                            <div class="title">{{ item.title }}</div>
                            <div class="content">{{ item.content }}</div>
                        </a-carousel-item>
                    </a-carousel>
                </div>
                <div>
                    <a :href="local.init.copyright.url" target="_blank">©{{ local.init.copyright.name }}</a>
                </div>
            </div>
            <div class="right">
                <div class="title">{{ $t('login.login.5un2dj46jw80') }} {{ local.init?.name?.[local.lang] }}</div>
                <a-form ref="formRef" class="loginForm" :model="form" layout="vertical" @submit="login">
                    <a-form-item field="username" :rules="[{ required: true, message: $t('login.login.5un2dj46k6k0') }]"
                        :validate-trigger="['change', 'blur']" hide-label>
                        <a-input v-model="form.username" :placeholder="$t('login.login.5un2dj46k6k0')">
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="password" :rules="[{ required: true, message: $t('login.login.5un2dj46kec0') }]"
                        :validate-trigger="['change', 'blur']" hide-label>
                        <a-input-password v-model="form.password" :placeholder="$t('login.login.5un2dj46kec0')" allow-clear>
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item field="verify_code" :rules="[{ required: true, message: $t('login.login.5un2dj46kls0') }]"
                        :validate-trigger="['change', 'blur']" hide-label>
                        <a-input v-model="form.verify_code" :placeholder="$t('login.login.5un2dj46kls0')" allow-clear>
                            <template #prefix>
                                <icon-safe />
                            </template>
                        </a-input>
                        <a-image @click="getVerifyCode" :preview="false" width="100" :src="verifyCode" />
                    </a-form-item>
                    <a-space :size="16" direction="vertical">
                        <div style="display: flex;justify-content: space-between;">
                            <a-checkbox v-model="(local.loginConfig.remember as any)">
                                {{ $t('login.login.5un2dj46kt40') }}
                            </a-checkbox>
                        </div>
                        <a-button type="primary" html-type="submit" long :disabled="loading" :loading="loading">
                            {{ $t('login.login.5un2dj46jw80') }}
                        </a-button>
                    </a-space>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
const { t } = useI18n();
const router = useRouter()
const local = useLocal()
const temp = useTemp()
const verifyCode = ref()

const list = ref([
    {
        title: t('login.login.5un2dj46l080'),
        content: `${t('login.login.5un2gx2ieu40')}${local?.init?.copyright?.name || 'LINKSOFT'}${t('login.login.5un37bbpkeo0')}`
    }, {
        title: t('login.login.5un2dj46lgs0'),
        content: t('login.login.5un2dj46m5s0')
    }, {
        title: t('login.login.5un2dj46ms40'),
        content: `${t('login.login.5un2gx2igu40')}${local?.init?.copyright?.name || 'LINKSOFT'}${t('login.login.5un37bbpni00')}`,
    }
])
const loading = ref(false)
const formRef = ref()
const form = reactive({
    username: '',
    password: '',
    request_id: uuidv4(),
    verify_code: ''
})
const setLocal = (val: any) => {
    local.lang = val
    router.go(0)
}
const login = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    loading.value = true
    const { code, data } = await apiAdmin.login(form)
    loading.value = false
    if (code != 1) return getVerifyCode();
    local.loginConfig.username = form.username
    temp.token = data.token
    loading.value = true
    const res = await apiAdmin.userInfo()
    if (res.code != 1) return;
    loading.value = false
    local.userInfo = res.data.user_info
    local.permissions = res.data.permission_list.map((item: any) => item.url)
    local.menus = res.data.menu_list
    local.isLogin = true
    Message.success({ content: t('login.login.5un2dj46n3g0') })
    router.push('/')
}
const getVerifyCode = async () => {
    const { code, data } = await apiAdmin.verifyCode({
        request_id: form.request_id
    })
    if (code != 1) return;
    verifyCode.value = data.verify_code
}
const changeFavicon = (link: string) => {
    let favicon: any = document.querySelector('link[rel="icon"]')
    if (favicon !== null) {
        favicon.href = link;
    } else {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = link;
        document.head.appendChild(favicon);
    }
};
const init = () => {
    apiSystem.systemInit().then(({ code, data }) => {
        if (code != 1) return;
        local.init = data.basic
        changeFavicon(data.basic?.icon)
    })
    apiSystem.systemConfig().then(({ code, data }) => {
        if (code != 1) return;
        local.config = data
    })
}
{
    getVerifyCode()
    local.loginConfig.remember && (form.username = local.loginConfig.username)
    init()
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url(@/assets/img/login.png) no-repeat;
    background-size: 100% 100%;

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

    .loginBox {
        width: 750px;
        height: 450px;
        display: flex;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);
        background-color: rgba(255, 255, 255, 0.8);
    }

    .left {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background: url(@/assets/img/loginLeft.png) no-repeat;
        background-size: 100% 100%;
        padding: 35px;

        :deep(.arco-carousel-indicator-wrapper-bottom) {
            background: none;
        }

        >div:first-of-type {
            width: 100%;

            img {
                width: 150px;
            }
        }

        >div:nth-of-type(2) {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            user-select: none;

            .title {
                font-size: 24px;
                font-weight: 800;
                color: #F9F9F9 !important;
                line-height: 24px;
                margin-bottom: 50px;
                text-align: left;
            }

            .content {
                font-size: 14px;
                line-height: 16px;
                font-weight: 500;
                color: #F9F9F9;
            }
        }

        >div:last-of-type {
            width: 100%;

            a {
                text-decoration: none;
                color: rgba(255, 255, 255, 0.8);
            }
        }
    }

    .right {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title {
        width: 320px;
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 40px;
        color: #707070;
        text-align: center;
    }

    .loginForm {
        width: 320px;
    }
}
</style>