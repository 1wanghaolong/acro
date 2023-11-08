<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('withdraw.withdraw.5ukmqklvrk00')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('withdraw.withdraw.5ukmqklvseg0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="accountId" :label="$t('withdraw.withdraw.5ukmqklvsmw0')">
                                <a-input v-model="searchInfo.data.accountId" :placeholder="$t('withdraw.withdraw.5ukmqklvseg0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="chargeCurrency" :label="$t('withdraw.withdraw.5ukmqklvsr40')">
                                <a-select allow-clear v-model="searchInfo.data.chargeCurrency" :placeholder="$t('withdraw.withdraw.5ukmqklvsto0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('withdraw.withdraw.5ukmqklvszg0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('withdraw.withdraw.5ukmqklvsto0')">
                                    <a-option v-for="item in useEnums('cms.asset.withdraw.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="createTime" :label="$t('withdraw.withdraw.5ukmqklvt200')">
                                <a-range-picker v-model="searchInfo.data.createTime" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('withdraw.withdraw.5ukmqklvt4g0') : $t('withdraw.withdraw.5ukmqklvt6w0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('withdraw.withdraw.5ukmqklvt9c0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('withdraw.withdraw.5ukmqklvtbo0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">

                </a-space>
            </div>
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
                        <a-table-column title="ID" data-index="id" :width="60" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvtg40')" data-index="real_name" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvrk00')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvsmw0')" data-index="account_id" :width="100" ></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvtik0')" data-index="charge_bank" :width="100" ></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvtkw0')" data-index="charge_bank_code" :width="200" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvtn40')" data-index="charge_amount" :width="120" >
                            <template #cell="{ record }">
                                {{ $dataFormat(record.charge_amount) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvszg0')" data-index="status" :width="local.lang=='en'?160:100">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('cms.asset.withdraw.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvsr40')" data-index="charge_currency" :width="100">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('withdraw.withdraw.5ukmqklvtps0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvtu00')" data-index="charge_fee" :width="120" ></a-table-column>

                        <a-table-column :title="$t('withdraw.withdraw.5ukmqklvt200')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('withdraw.withdraw.5ukmqklvtws0')" :width="80"
                            v-if="$permission(['cmsAssetWithdrawDetail', 'cmsChargeWithdrawAudit'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <template v-if="record.status != 0">
                                    <a-link v-if="$permission(['cmsAssetWithdrawDetail'])"
                                        @click="router.push({ name: 'cmsAssetWithdrawDetail', params: { id: record.id } })">{{$t('withdraw.withdraw.5ukmqklvtzk0')}}</a-link>
                                    </template>
                                    <template v-if="record.status == 0">
                                        <a-link v-if="$permission(['cmsChargeWithdrawAudit'])"
                                            @click="updateBtn(record)">{{$t('withdraw.withdraw.5ukmqklvu200')}}</a-link>
                                    </template>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getData" @page-size-change="getData"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
        <a-modal width="600px" :mask-closable=false v-model:visible="showVisible" :on-before-ok="handleSubmit"
            @close="onCloseEdit">
            <template #title>
                {{ $t('withdraw.withdraw.5ukmqklvu200') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">

                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvrk00')">
                                <a-input disabled v-model="form.data.mobile" :placeholder="$t('withdraw.withdraw.5ukmqklvu7o0')">
                                </a-input>
                            </a-form-item>
                        </a-col>

                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvsmw0')">
                                <a-input disabled v-model="form.data.account_id" :placeholder="$t('withdraw.withdraw.5ukmqklvu9k0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvtik0')">
                                <a-input disabled v-model="form.data.charge_bank" :placeholder="$t('withdraw.withdraw.5ukmqklvuck0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvueo0')">
                                <a-input disabled v-model="form.data.charge_bank_code" :placeholder="$t('withdraw.withdraw.5ukmqklvugc0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvtn40')">
                                <a-input disabled v-model="form.data.charge_amount" :placeholder="$t('withdraw.withdraw.5ukmqklvui80')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvtu00')">
                                <a-input disabled v-model="form.data.charge_fee" :placeholder="$t('withdraw.withdraw.5ukmqklvukw0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvsr40')">
                                <a-input disabled v-model="form.data.charge_currency" :placeholder="$t('withdraw.withdraw.5ukmqklvumo0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('withdraw.withdraw.5ukmqklvt200')">
                                <a-input disabled v-model="form.data.create_time" :placeholder="$t('withdraw.withdraw.5ukmqklvuog0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="statusRadio" :label="$t('withdraw.withdraw.5ukmqklvszg0')">
                                <a-radio-group v-model="form.data.statusRadio" :options="optionsToBe" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.zh-CN" :label="$t('withdraw.withdraw.5ukmqklvuq40')">
                                <a-input v-model="form.data.reasons['zh-CN']" :placeholder="$t('withdraw.withdraw.5ukmqklvuro0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.en" :label="$t('withdraw.withdraw.5ukmqklvutk0')">
                                <a-input v-model="form.data.reasons['en']" :placeholder="$t('withdraw.withdraw.5ukmqklvuv80')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.tc" :label="$t('withdraw.withdraw.5ukmqklvux40')">
                                <a-input v-model="form.data.reasons['tc']" :placeholder="$t('withdraw.withdraw.5ukmqklvuz40')">
                                </a-input>
                            </a-form-item>
                        </a-col>



                    </a-row>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        mobile: '',
        chargeCurrency: '',
        accountId: '',
        status: '',
        type: '',
        createTime: [],
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    const { code, data } = await apiCms.cmsChargeWithdrawList({
        ...useFilter(param)

    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}

const showVisible = ref(false)
const formRef = ref()
const form: any = reactive({
    data: {
        reasons: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        id: '',
        statusRadio: ''
    },
    rules: {
        'reasons.zh-CN': [{ required: true, message: t('withdraw.withdraw.5ukmqklvuro0') }],
        'reasons.en': [{ required: true, message: t('withdraw.withdraw.5ukmqklvuv80') }],
        'reasons.tc': [{ required: true, message: t('withdraw.withdraw.5ukmqklvuz40') }],
        'type': [{ required: true, message: t('withdraw.withdraw.5ukmqklvv0s0') }],
        'statusRadio': [{ required: true, message: t('withdraw.withdraw.5ukmqklvv2o0') }],
    }
})

const optionsToBe = [
    { label: t('withdraw.withdraw.5ukmqklvv480'), value: '2' },
    { label: t('withdraw.withdraw.5ukmqklvv5s0'), value: '3' },
];
const updateBtn = async (val: any) => {
    let obj: any = await getDetail(val.id)
    form.data = {
        ...obj, reasons: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        }
    }
    console.log(form.data);

    form.data.statusRadio = ''
    console.log(form.data);
    form.data.create_time = dayjs.unix(obj.create_time).format('YYYY-MM-DD HH:mm:ss')
    form.data.type = Number(form.data.type)
    showVisible.value = true
}
const getDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsChargeWithdrawInfo({
        withdrawId: id
    })
    if (code != 1) return;
    return data
}
const handleSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let params: any = {
        withdrawId: form.data.id,
        status: form.data.statusRadio,
    }
    if (form.data.statusRadio == 3) {
        params.reasons = form.data.reasons
    }
    const { code, msg } = await apiCms.cmsChargeWithdrawAudit({ ...params })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData();
    return true
}
const onCloseEdit = () => {
    form.data = {
        reasons: {
            'zh-CN': '',
            'en': '',
            'tc': ''
        },
        id: '',
        statusRadio: ''
    }
    formRef.value.resetFields()
}
{

    getData()
}
</script>
<style scoped>
:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-select-view-disabled) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>