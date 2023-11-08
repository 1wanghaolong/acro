<template>
    <div class="head">
        <div>
            <img v-if="local.init.logo[local.theme == 'light'?'white':'black']" :src="local.init.logo[local.theme == 'light'?'white':'black']">
            <template v-else>
                <img v-if="local.theme == 'light'" src="@/assets/img/logo.png" />
                <img v-else src="@/assets/img/logoWhite.png" />
            </template>
        </div>
        <div>
            <!-- 长远不需要关联后台 -->
            <div v-if="$permission(['systemSettingOpenAdmin'])" style="margin-right: 10px;">
                
                <a-popover trigger="click" position="bottom">
                        <span style="cursor: pointer;" type="text">
                            {{$t('layout.head.5um3qygym0s0')}}
                        </span>
                        <template #content>
                            <div style="text-align: center;">
                                <p @click="openNewWindow"  style="cursor: pointer;">{{$t('layout.head.5um3qygymjc0')}}</p>
                            </div>
                        </template>
                    </a-popover>
            </div>

            <div>
                <a-tooltip :content="$t('layout.head.5um3qygymnc0')">
                    <div class="message-box-trigger">
                        <a-badge :count="count"  :offset="[-10, 2]">
                            <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setPopoverVisible">
                                <icon-notification />
                            </a-button>
                        </a-badge>
                    </div>
                </a-tooltip>
                <a-popover v-if="$permission(['statisticsAccountInfo'])" position="br" v-model:popup-visible="popupVisible" trigger="click" content-class="message-popover">
                    <div ref="refBtn" class="ref-btn"></div>
                    <template #content>
                        <TRSMessageBox @close="popupVisible = false"/>
                    </template>
                </a-popover>
                <a-popover v-if="$permission(['cmsMessageList'])" position="br" v-model:popup-visible="popupVisible" trigger="click" content-class="message-popover">
                    <div ref="refBtn" class="ref-btn"></div>
                    <template #content>
                        <CMSMessageBox  @close="popupVisible = false"/>
                    </template>
                </a-popover>
            </div>
            <div>
                <a-tooltip :content="$t('layout.head.5um3qygymqo0')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
                        <template #icon>
                            <icon-language />
                        </template>
                    </a-button>
                </a-tooltip>
                <a-dropdown trigger="click" @select="(changeLocale as any)">
                    <div ref="triggerBtn" class="trigger-btn"></div>
                    <template #content>
                        <a-doption v-for="item in LOCALE_OPTIONS" :key="item.value" :value="item.value">
                            <template #icon>
                                <icon-check v-show="item.value === currentLocale" />
                            </template>
                            {{ item.label }}
                        </a-doption>
                    </template>
                </a-dropdown>
            </div>
            <div>
                <a-tooltip :content="local.theme === 'light'
                        ? $t('layout.head.5um3qygymt00')
                        : $t('layout.head.5um3qygymvk0')
                    ">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
                        <template #icon>
                            <icon-moon-fill v-if="local.theme === 'dark'" />
                            <icon-sun-fill v-else />
                        </template>
                    </a-button>
                </a-tooltip>
            </div>
            <div>
                <a-tooltip :content="isFullscreen
                    ? $t('layout.head.5um3qygymy00')
                    : $t('layout.head.5um3qygyn3g0')">
                    <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleFullScreen">
                        <template #icon>
                            <icon-fullscreen-exit v-if="isFullscreen" />
                            <icon-fullscreen v-else />
                        </template>
                    </a-button>
                </a-tooltip>
            </div>
            <!-- <div class="nickname">管理员</div> -->
            <div class="avatar">
                <a-dropdown trigger="click">
                    <a-avatar :size="34"
                        :style="{ cursor: 'pointer',boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.05)' }">
                        <img v-if="local.userInfo.avatar" alt="avatar" :src="local.userInfo.avatar" />
                        <img alt="avatar" src="@/assets/img/avatar.png" />
                    </a-avatar>
                    <template #content>
                        <a-doption @click="router.push({name:'systemUserInfo'})">
                            <a-space>
                                <icon-user />
                                <span>
                                    {{$t('layout.head.5um3qygynfs0')}}
                                </span>
                            </a-space>
                        </a-doption>
                        <a-doption @click="logout">
                            <a-space>
                                <IconExport />
                                <span>
                                    {{$t('layout.head.5um3qygynmo0')}}
                                </span>
                            </a-space>
                        </a-doption>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core';
import useLocale from '@/hooks/locale';
import { LOCALE_OPTIONS } from '@/locales';
import TRSMessageBox from '../TRSmessageBox/index.vue';
import CMSMessageBox from '../CMSmessageBox/index.vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter()
const local = useLocal()
const temp = useTemp()
const count:any = ref(0)
const popupVisible = ref(false)
const { changeLocale, currentLocale } = useLocale();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const triggerBtn = ref();
const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
};
const logout = async () => {
    await apiAdmin.logout()
    temp.token = ''
    if (temp.setIntervalName) {
        clearInterval(temp.setIntervalName);
    }
    router.push({name:'login'})
    Message.success({content:t('layout.head.5um3qygynpw0')})
}
const dataList = ref({
  status:"0",
  page: 1,
  per_page: 20,
});
const getData = async () => {
  //消息列表
  const { code, data } = await apiCms.cmsSystemAffairList({
    ...useFilter(dataList.value),
  });
  if (code != 1) return;
  if (data.list.length) {
    count.value = data.count;
  }
};
const handleToggleTheme = () => {
    local.theme == 'dark'?local.setTheme('light'):local.setTheme('dark')
};
const openAdminUrl = ref('')
const getDataSystem = async () => {
    const { code, data } = await apiAdmin.configList({
        group: 'system'
    })
    if (code != 1) return;
    openAdminUrl.value = data.open_admin_url
}
getDataSystem()
const openNewWindow = () =>{
      window.open(openAdminUrl.value, '_blank');
    }

const setPopoverVisible = () => {
    popupVisible.value = !popupVisible.value
};
local.setTheme(local.theme)
{
    usePermission(["cmsMessageAffairList"]) && getData();
}
</script>
<style lang="less" scoped>
.head {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.05);
    color: var(--color-text-1);
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);

    .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
        font-size: 14px;
        margin-right: 10px;
    }

    >div:first-of-type {
        width: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        >img {
            width: 135px;
        }
    }

    >div:last-of-type {
        display: flex;
        align-items: center;
        padding-right: 20px;

        .nickname {
            font-size: 12px;
            margin-right: 10px;
        }
    }
}
</style>