<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="username" :label="$t('user.info.5um3pgzc66g0')">
                    <a-input disabled v-model="form.data.username" :placeholder="$t('user.info.5um3pgzcr940')"  />
                </a-form-item>
                <a-form-item field="nickname" :label="$t('user.info.5um3pgzcskg0')">
                    <a-input v-model="form.data.nickname" :placeholder="$t('user.info.5um3pgzcxc80')"  />
                </a-form-item>
                <a-form-item :label="$t('user.info.5um3pgzcz4o0')">
                    <a-upload :limit="1" list-type="picture-card" :show-preview-button="false" :auto-upload="true"
                        v-model:file-list="fileList" :custom-request="(upload as any)">
                    </a-upload>
                </a-form-item>
                <a-form-item field="password" :label="$t('user.info.5um3pgzd17g0')">
                    <a-input-password v-model="form.data.password" :placeholder="$t('user.info.5um3pgzd1sc0')"  />
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('user.info.5um3pgzd2d80')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('user.info.5um3pgzd99s0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const fileList = ref()
const form:any = reactive({
    show: false,
    loading: false,
    data: {
        nickname:'',
        avatar:'',
        password:''
    },
    rules: {
        nickname: [{ required: true, message: t('user.info.5um3pgzd9zc0') }],
        avatar: [{ required: true, message: t('user.info.5um3pgzdagw0') }],
        platform:[{ required: true, type: 'array', message: t('user.info.5um3pgzdb6g0') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiAdmin.userInfoUpdate({
        data: {
            nickname:form.data.nickname,
            avatar: fileList.value?.[0]?.response?.url || form.data.avatar,
            password:form.data.password||null
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const getData = async () => {
    const { code, data } = await apiAdmin.userInfo()
    if (code != 1) return;
    form.data = data.user_info
    local.userInfo = data.user_info
    if (data.user_info.avatar) {
        fileList.value = [{
            url: data.user_info.avatar
        }]
    }
}
{
    form.data = local.userInfo
    if (local.userInfo.avatar) {
        fileList.value = [{
            url: local.userInfo.avatar
        }]
    }

}
</script>