<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="asset_account_id" :label="$t('risk.create.5um7qwx4bgg0')">
                    <a-select v-model:model-value="form.data.asset_account_id" allow-search :placeholder="$t('risk.create.5um7qwx4bxs0')"
                        :options="form.accountList" :field-names="{ value: 'id', label: 'account' }"
                        @search="getAccountList" :filter-option="true" :show-extra-options="false" />
                </a-form-item>
                <a-form-item field="risk_level" :label="$t('risk.create.5um7qwx4c4g0')">
                    <a-select v-model:model-value="form.data.risk_level" allow-search :placeholder="$t('risk.create.5um7qwx4c6k0')">
                        <a-option v-for="item in useEnums('otc.risk.risk_level')" :value="item.value">
                            {{ item.trans[local.lang] }}
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item allow-search field="questionnaire_url" :label="$t('risk.create.5um7qwx4c900')">
                    <a-upload :on-before-upload="beforeUpload" :limit="1" accept=".pdf,.doc,.docx,.xls,.xlsx" draggable image-preview
                        :auto-upload="true" v-model:file-list="form.data.questionnaire_url"
                        :custom-request="(upload as any)">
                    </a-upload>
                </a-form-item>
                <a-form-item>
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="formRef?.resetFields()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('risk.create.5um7qwx4cb40')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('risk.create.5um7qwx4cd40')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const route = useRoute()
const { t } = useI18n();
const router = useRouter()
const formRef = ref()
const form = reactive({
    show: false,
    loading: false,
    accountList: [],
    data: {
        asset_account_id: '',
        risk_level: '',
        questionnaire_url: [],
        from_type: 2,
        status: 2
    },
    rules: {
        asset_account_id: [{ required: true, message: t('risk.create.5um7qwx4cf00') }],
        risk_level: [{ required: true, message: t('risk.create.5um7qwx4c6k0') }],
        questionnaire_url: [{ type: 'array', required: true, message: t('risk.create.5um7qwx4cho0') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiOtc.riskAssessmenCreate({
        data: {
            ...form.data,
            questionnaire_url: form.data.questionnaire_url?.map((item: any) => item.response?.url)?.join()
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const beforeUpload = (file: any): any => {
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return new Promise((resolve) => {
        if (allowedFileTypes.includes(file.type)) {
            resolve(true)
        } else {
            Message.info(t('risk.create.5um7qwx4cjs0'))
            return false
        }
    });
};
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const { code, data } = await apiSystem.upload(formData)
    if (code != 1) return onError();
    onSuccess(data);
}
const getAccountList = async (value: string) => {
    const { code, data } = await apiOtc.accountList(useFilter({
        account: value,
        status: 1
    }))
    if (code != 1) return;
    form.accountList = data.list
}
</script>