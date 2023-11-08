<template>
    <div>
        <a-card :loading="loading">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('agreement.agreement.5um854yntik0')}}
                    </a-space>
                    <a-space :size="18" v-permission="['trsAccountDetailAgreementUpload']">
                        <a-button @click="form.show = true" type="primary">
                            <template #icon>
                                <icon-upload />
                            </template>
                            {{$t('agreement.agreement.5um854yntz40')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('agreement.agreement.5um854ynu1k0')">
                            <template #cell="{ record }">
                                <div>{{ record.agreement_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('agreement.agreement.5um854ynu3k0')">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('agreement.agreement.5um854ynu680')" :width="local.lang == 'en'?100:80" v-if="$permission(['trsAccountDetailAgreementDownload'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link target="_blank"
                                    :href="record?.agreement_url">{{$t('agreement.agreement.5um854ynu880')}}</a-link>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
        </a-card>
        <!-- 上传账户协议 -->
        <a-modal draggable v-model:visible="form.show" :title="$t('agreement.agreement.5um854ynuag0')" @cancel="form.show = false" @before-ok="submit">
            <a-form ref="formRef" :model="form.data" layout="vertical">
                <a-row :gutter="6">
                    <a-col :xs="24">
                        <a-form-item field="agreement_name" :label="$t('agreement.agreement.5um854ynucg0')" :rules="[{ required: true, message: $t('agreement.agreement.5unxl3j0ij40') }]">
                            <a-input v-model="form.data.agreement_name" :placeholder="$t('agreement.agreement.5um854ynues0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24">
                        <a-form-item field="agreement_url" :label="$t('agreement.agreement.5um854ynuhg0')" :rules="[{ required: true, type: 'array', message: $t('agreement.agreement.5unxl3j0s8g0') }]">
                            <a-upload draggable :limit="1" image-preview @before-upload="beforeUpload" :auto-upload="true"
                                v-model:file-list="form.data.agreement_url" :custom-request="(upload as any)">
                            </a-upload>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const route = useRoute()
const local = useLocal()
const formRef = ref()
const { t } = useI18n();
const loading = ref(false)
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {
        agreement_name: '',
        agreement_url:[]
    },
    rules: {
        charge_package_id: [{ required: true, message: t('agreement.agreement.5um854ynujw0') }],
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    loading: false
})
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        if (file.type === 'application/pdf') {
            resolve(true)
        } else {
            Message.info(t('agreement.agreement.5um854ynuls0'))
            reject('cancel')
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
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return false;
    form.loading = true
    const { code, msg } = await apiTrs.agreementCreate({
        id: form.data.id,
        data: {
            trs_account_id: route.params?.id,
            agreement_name: form.data.agreement_name,
            agreement_url: form.data.agreement_url[0].response?.url
        }
    })
    form.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    form.setup = false
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.agreementList(useFilter({
        trs_account_id: route.params?.id
    }))
    loading.value = false
    if (code != 1) return;
    tableData.count = data.count
    tableData.list = data.list
}
onMounted(()=>{
    if(route.query?.create){
        form.show = true
    }
})
{
    getData()
}
</script>