<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="asset_account_id" :label="$t('pi.create.5um7ofa2gqs0')">
                    <a-select v-model:model-value="form.data.asset_account_id" allow-search :placeholder="$t('pi.create.5um7ofa2hbs0')"
                        :options="form.accountList" :field-names="{ value: 'id', label: 'account' }" @search="getAccountList"
                        :filter-option="true" :show-extra-options="false" />
                </a-form-item>
                <a-form-item allow-search field="voucher" :label="$t('pi.create.5um7ofa2hgk0')">
                    <a-upload :limit="12" :on-before-upload="beforeUpload" accept=".png,.jpg,.jpeg" draggable image-preview :auto-upload="true" v-model:file-list="form.data.voucher"
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
                                {{$t('pi.create.5um7ofa2hjo0')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('pi.create.5um7ofa2hmw0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const form = reactive({
    show: false,
    loading: false,
    accountList: [],
    data: {
        asset_account_id: '',
        voucher: [],
        from_type:2,
        status:2
    },
    rules: {
        asset_account_id: [{ required: true, message: t('pi.create.5um7ofa2hq40') }],
        voucher: [{ type: 'array', required: true, message: t('pi.create.5um7ofa2htc0') }]
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiOtc.piAuthenticationCreate({
        data: {
            ...form.data,
            voucher:form.data.voucher?.map((item:any)=>item.response?.url)?.join()
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    router.back()
}
const beforeUpload = (file:any):any => {
    return new Promise((resolve) => {
    if (['image/jpeg','image/png'].includes(file.type)) {
        resolve(true)
    } else {
        Message.info(t('pi.create.5um7ofa2hw00'))
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