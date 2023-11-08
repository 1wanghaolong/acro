<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div style="flex: 1;overflow: auto;">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '800px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="username" :label="$t('feedback.detail.5ukfi3ro9no0')">
                        <a-input disabled v-model="form.data.username" :placeholder="$t('feedback.detail.5ukfi3ro9no0')" />
                    </a-form-item>
                    <a-form-item field="mobile" :label="$t('feedback.detail.5ukfi3robi00')">
                        <a-input disabled v-model="form.data.mobile" :placeholder="$t('feedback.detail.5ukfi3robi00')" />
                    </a-form-item>
                    <a-form-item field="type" :label="$t('feedback.detail.5ukfi3robtg0')">
                        <a-select disabled allow-clear v-model="form.data.type"
                            :placeholder="$t('feedback.detail.5ukfi3robyo0')">
                            <a-option v-for="item in useEnums('cms.message.feedback.type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="content" :label="$t('feedback.detail.5ukfi3roc4w0')">
                        <a-textarea disabled :auto-size="{ minRows: 5, maxRows: 5 }" v-model="form.data.content"
                            :placeholder="$t('feedback.detail.5ukfi3roc4w0')" />
                    </a-form-item>

                    <a-form-item field="status" :label="$t('feedback.detail.5ukfi3rocc40')">
                        <a-radio-group disabled v-model="form.data.status" :options="useEnums('cms.help.feedback.status')">
                            <template #label="{ data }">
                                <p>{{ data.trans[local.lang] }}</p>
                            </template>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item field="reply" :label="$t('feedback.detail.5ukfi3rocgg0')">
                        <a-textarea :disabled="form.data.status == 2" :auto-size="{ minRows: 5, maxRows: 5 }"
                            v-model="form.data.reply" :placeholder="$t('feedback.detail.5ukfi3rocog0')" />
                    </a-form-item>
                    <a-form-item v-if="form.data.status != 2">
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetBtn">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    {{ $t('feedback.detail.5ukfi3rocto0') }}
                                </a-button>
                                <a-button type="primary" :loading="form.loading" :disabled="form.loading"
                                    html-type="submit">
                                    <template #icon>
                                        <icon-check />
                                    </template>
                                    {{ $t('feedback.detail.5ukfi3rocxc0') }}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        username: '',
        mobile: '',
        content: '',
        question_title: '',
        status: '',
        reply: '',
        user_id: '',
        type: ''
    },
    rules: {
        reply: [{ required: true, type: 'array', message: t('feedback.detail.5ukfi3rod680') }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    let params = { ...form.data }
    delete params.username
    delete params.content
    delete params.question_title
    delete params.mobile
    params.status = '3'
    const { code, msg } = await apiCms.cmsUserFeedbackUpdate({
        feedbackId: route.params?.id,
        data: {
            ...params,
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
// 详情
const getData = async () => {
    const { code, data } = await apiCms.cmsUserFeedbackDetail({
        feedbackId: route.params?.id
    })
    if (code != 1) return;
    for (let key in form.data) {
        form.data[key] = data[key]
    }
}
{
    getData()
}
const resetBtn = () => {
    getData()
    formRef.value.resetFields()
}
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-textarea[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
    color: var(--color-text-1);
    background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>