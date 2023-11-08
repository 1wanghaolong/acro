<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="englishName" :label="$t('payment.payment.5ukjpgd864g0')">
                                <a-input v-model="searchInfo.data.englishName" :placeholder="$t('payment.payment.5ukjpgd8gq00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="accountId" :label="$t('payment.payment.5ukjpgd8h880')">
                                <a-input v-model="searchInfo.data.accountId" :placeholder="$t('payment.payment.5ukjpgd8gq00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="chargeBankCode" :label="$t('payment.payment.5ukjpgd8he80')">
                                <a-input v-model="searchInfo.data.chargeBankCode" :placeholder="$t('payment.payment.5ukjpgd8gq00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('payment.payment.5ukjpgd8i7s0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('payment.payment.5ukjpgd8id80')">
                                    <a-option v-for="item in useEnums('cms.asset.payment.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('payment.payment.5ukjpgd8ii00')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('payment.payment.5ukjpgd8id80')">
                                    <a-option v-for="item in useEnums('cms.asset.payment.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
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
                        {{ searchInfo.show ? $t('payment.payment.5ukjpgd8j3c0') : $t('payment.payment.5ukjpgd8j8c0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('payment.payment.5ukjpgd8lhc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('payment.payment.5ukjpgd8lnk0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-popover v-if="$permission(['cmsAssetPaymentDownload'])" trigger="click" position="bottom">
                        <a-button :loading="tableData.loading">
                            <template #icon>
                                <icon-to-bottom />
                            </template>
                            {{$t('payment.payment.5ukjpgd8lrk0')}}
                        </a-button>
                        <template #content>
                            <div style="text-align: center;">
                                <p @click="download(1)" style="cursor: pointer;margin-bottom:10px">{{$t('payment.payment.5ukjpgd8mis0')}}</p>
                                <p @click="download(2)" style="cursor: pointer;">{{$t('payment.payment.5ukjpgd8moc0')}}</p>
                            </div>
                        </template>
                    </a-popover>
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
                        <a-table-column :title="$t('payment.payment.5ukjpgd8mz00')" data-index="real_name" :width="100" ></a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd864g0')" data-index="english_name" :width="140" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8h880')" data-index="account_id" :width="120" ></a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8he80')" data-index="charge_bank_code" :width="200" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8i7s0')" data-index="type" :width="local.lang=='en'?160:120">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('cms.asset.payment.type', record.type) }}
                                </a-tag>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('payment.payment.5ukjpgd8n580')" data-index="charge_amount" :width="160">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.charge_amount, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8n9w0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('payment.payment.5ukjpgd8nec0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8nkg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8npc0')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="record.check_time">
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                </div>
                                <div v-else>-</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.payment.5ukjpgd8ii00')" data-index="status" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('cms.asset.payment.status1', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>

                        <a-table-column fixed="right" :title="$t('payment.payment.5ukjpgd8nu80')" :width="local.lang=='en'?120:100"
                            v-if="$permission(['cmsAssetPaymentDetail', 'cmsChargePaymentAudit'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-if="$permission(['cmsAssetPaymentDetail'])"
                                        @click="router.push({ name: 'cmsAssetPaymentDetail', params: { id: record.id } })">{{$t('payment.payment.5ukjpgd8o080')}}</a-link>
                                    <template v-if="record.status == 0 || record.status == 2 || record.status == 3">
                                        <a-link v-if="$permission(['cmsChargePaymentAudit'])"
                                            @click="updateBtn(record)">{{$t('payment.payment.5ukjpgd8o340')}}</a-link>
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
                {{ $t('payment.payment.5ukjpgd8o340') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">

                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd8mz00')">
                                <a-input disabled v-model="form.data.real_name">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd864g0')">
                                <a-input disabled v-model="form.data.english_name">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd8h880')">
                                <a-input disabled v-model="form.data.account_id" :placeholder="$t('payment.payment.5ukjpgd8o6c0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd8he80')">
                                <a-input disabled v-model="form.data.charge_bank_code" :placeholder="$t('payment.payment.5ukjpgd8o900')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd8i7s0')">
                                <a-select disabled allow-clear v-model="form.data.type" :placeholder="$t('payment.payment.5ukjpgd8id80')">
                                    <a-option v-for="item in useEnums('cms.asset.payment.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd8n580')">
                                <a-input disabled v-model="form.data.charge_amount" :placeholder="$t('payment.payment.5ukjpgd94ag0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('payment.payment.5ukjpgd8n9w0')">
                                <a-input disabled v-model="form.data.charge_currency" :placeholder="$t('payment.payment.5ukjpgd960c0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12"
                            v-if="form.data?.charge_voucher?.length && form.data?.charge_voucher[0]">
                            <a-form-item :label="$t('payment.payment.5ukjpgd96fw0')">
                                <a-image-preview-group infinite>
                                    <a-space wrap>
                                        <a-image v-for="item in form.data?.charge_voucher" :src="item" height="100" />
                                    </a-space>
                                </a-image-preview-group>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.status == 0 || form.data.status == 1" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="statusRadio" :label="$t('payment.payment.5ukjpgd96n80')">
                                <a-radio-group v-model="form.data.statusRadio" :options="options" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.status == 2" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="statusRadio" :label="$t('payment.payment.5ukjpgd96n80')">
                                <a-radio-group v-model="form.data.statusRadio" :options="optionsToBe" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.status == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="statusRadio" :label="$t('payment.payment.5ukjpgd96n80')">
                                <a-radio-group v-model="form.data.statusRadio" :options="optionsRefund" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 6" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.zh-CN" :label="$t('payment.payment.5ukjpgd96vs0')">
                                <a-input v-model="form.data.reasons['zh-CN']" :placeholder="$t('payment.payment.5ukjpgd97300')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 6" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.en" :label="$t('payment.payment.5ukjpgd979k0')">
                                <a-input v-model="form.data.reasons['en']" :placeholder="$t('payment.payment.5ukjpgd97g80')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 6" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.tc" :label="$t('payment.payment.5ukjpgd998o0')">
                                <a-input v-model="form.data.reasons['tc']" :placeholder="$t('payment.payment.5ukjpgd9bss0')">
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
const route = useRoute()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        englishName: '',
        chargeBankCode: '',
        accountId: '',
        status: '',
        type: '',
        userId: route.query.id || '',
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
    const { code, data } = await apiCms.cmsChargePaymentList({
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
        'reasons.zh-CN': [{ required: true, message: t('payment.payment.5ukjpgd97300') }],
        'reasons.en': [{ required: true, message: t('payment.payment.5ukjpgd97g80') }],
        'reasons.tc': [{ required: true, message: t('payment.payment.5ukjpgd9bss0') }],
        'type': [{ required: true, message: t('payment.payment.5ukjpgd9ccg0') }],
        'statusRadio': [{ required: true, message: t('payment.payment.5ukjpgd9cm40') }],
    }
})
const options = [
    { label: t('payment.payment.5ukjpgd9csk0'), value: '2' },
    { label: t('payment.payment.5ukjpgd9dcc0'), value: '6' },
];
const optionsToBe = [
    { label: t('payment.payment.5ukjpgd9dio0'), value: '3' },
    { label: t('payment.payment.5ukjpgd9h5o0'), value: '4' },
];
const optionsRefund = [
    { label: t('payment.payment.5ukjpgd9hno0'), value: '5' },
];
const updateBtn = async (val: any) => {
    let obj: any = await getDetail(val.id)
    form.data = { ...obj }
    form.data.statusRadio = ''
    console.log(form.data);

    form.data.type = Number(form.data.type)
    showVisible.value = true
}
const getDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsChargePaymentInfo({
        paymentId: id
    })
    if (code != 1) return;
    return data
}
const handleSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let params: any = {
        paymentId: form.data.id,
        status: form.data.statusRadio,
    }
    if (form.data.statusRadio == 6) {
        params.reasons = form.data.reasons
    }
    const { code, msg } = await apiCms.cmsChargePaymentAudit({ ...params })
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
// 导出
const download = async (num: any) => {
    let strTitle = `ID,真实姓名/Real Name,英文姓名/English Name,Account ID/证券账户,银行账号/Bank No,入金方式/Method,金额/Amount,币种/Currency,创建时间/Create Time,审核时间/Check Time,入金状态/Status\n`
    let name = 'payment-record-' + dayjs(new Date()).format('YYYY-MM-DD')
    let list = []
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    if (num == 1) {
        param.page = 1
        let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
        for (let i = 1; i <= pageNum; i++) {
            param.page = i
            const { data } = await apiCms.cmsChargePaymentList({
                ...useFilter(param)
            })
            list.push(...data.list)
        }
    } else {
        const { data } = await apiCms.cmsChargePaymentList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('payment.payment.5ukjpgd9hu80') });
    let downloadList = listValue(strTitle, list)
    downloadExcel(downloadList, name)
}
const listValue = (strTitle: any, list: any) => {
    //定义表头
    if (!list.length) {
        return
    }
    let str = strTitle
    list.forEach((item: any) => {
        let create_time = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let check_time = item.check_time ? dayjs.unix(item.check_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let type = useEnumsFormat('cms.asset.payment.type', item.type) || item.type || t('payment.payment.5ukjpgd8nec0')
        let status = useEnumsFormat('cms.asset.payment.status1', item.status) || item.status || t('payment.payment.5ukjpgd8nec0')
        str += `${item?.id}\t,`  // ID
        str += `${item?.real_name}\t,`
        str += `${item?.english_name}\t,` // 账号
        str += `${item?.account_id}\t,`
        str += `${item?.charge_bank_code}\t,`
        str += `${type}\t,`
        str += `${item?.charge_amount}\t,`
        str += `${item?.charge_currency}\t,`
        str += `${create_time}\t,`
        str += `${check_time}\t,`
        str += `${status}\t,`
        str += '\n'
    })
    return str
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