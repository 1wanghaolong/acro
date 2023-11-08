<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('exchange.exchange.5ukk1fm449o0')">
                                <a-range-picker v-model="searchInfo.data.time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('exchange.exchange.5ukk1fm46m00')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('exchange.exchange.5ukk1fm476w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="from" :label="$t('exchange.exchange.5ukk1fm47h80')">
                                <a-select allow-clear v-model="searchInfo.data.from" :placeholder="$t('exchange.exchange.5ukk1fm47ps0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="to" :label="$t('exchange.exchange.5ukk1fm47yo0')">
                                <a-select allow-clear v-model="searchInfo.data.to" :placeholder="$t('exchange.exchange.5ukk1fm47ps0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('exchange.exchange.5ukk1fm488s0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('exchange.exchange.5ukk1fm47ps0')">
                                    <a-option v-for="item in useEnums('cms.asset.exchange.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('exchange.exchange.5ukk1fm48go0') : $t('exchange.exchange.5ukk1fm48rg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('exchange.exchange.5ukk1fm48ws0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('exchange.exchange.5ukk1fm490w0')}}
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
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm495o0')" data-index="real_name" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm46m00')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm49ho0')" data-index="account" :width="local.lang=='en'?150:100" ></a-table-column>
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm49pg0')" data-index="from_amount" :width="120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.from_amount, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm4a200')" data-index="from" :width="120">
                            <template #cell="{ record }">
                                {{ record.from + "->" + record.to }}
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('exchange.exchange.5ukk1fm4aao0')" data-index="to_amount" :width="local.lang=='en'?140:120" >
                            <template #cell="{ record }">
                                {{ $dataFormat(record.to_amount, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm4arc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.exchange.5ukk1fm488s0')" data-index="status" :width="local.lang=='en'?160:100">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('cms.asset.exchange.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('exchange.exchange.5ukk1fm4b0s0')" :width="80"
                            v-if="$permission(['cmsAssetExchangeDetail', 'cmsChargeExchangeAudit'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <template v-if="record.status != 1">
                                        <a-link v-if="$permission(['cmsAssetExchangeDetail'])"
                                            @click="router.push({ name: 'cmsAssetExchangeDetail', params: { id: record.id } })">{{$t('exchange.exchange.5ukk1fm4b8s0')}}</a-link>
                                    </template>
                                    <template v-if="record.status == 1">
                                        <a-link v-if="$permission(['cmsChargeExchangeAudit'])"
                                            @click="updateBtn(record)">{{$t('exchange.exchange.5ukk1fm4bj40')}}</a-link>
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
                {{ $t('exchange.exchange.5ukk1fm4bj40') }}
            </template>
            <div>
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">

                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.exchange.5ukk1fm49ho0')">
                                <a-input disabled v-model="form.data.account" :placeholder="$t('exchange.exchange.5ukk1fm4bq40')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.exchange.5ukk1fm495o0')">
                                <a-input disabled v-model="form.data.real_name" :placeholder="$t('exchange.exchange.5ukk1fm4bv40')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.exchange.5ukk1fm49pg0')">
                                <a-input disabled v-model="form.data.from_amount" :placeholder="$t('exchange.exchange.5ukk1fm4c7c0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.exchange.5ukk1fm47h80')">
                                <a-input disabled v-model="form.data.from" :placeholder="$t('exchange.exchange.5ukk1fm4cgc0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.exchange.5ukk1fm47yo0')">
                                <a-input disabled v-model="form.data.to" :placeholder="$t('exchange.exchange.5ukk1fm4cnk0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('exchange.exchange.5ukk1fm4crk0')">
                                <a-input disabled v-model="form.data.fee" :placeholder="$t('exchange.exchange.5ukk1fm4cuo0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="statusRadio" :label="$t('exchange.exchange.5ukk1fm488s0')">
                                <a-radio-group v-model="form.data.statusRadio" :options="optionsToBe" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 2" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="to_amount" :label="$t('exchange.exchange.5ukk1fm4aao0')">
                                <a-input-number hide-button v-model="form.data.to_amount" :placeholder="$t('exchange.exchange.5ukk1fm4cz40')">
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <!-- <a-col v-if="form.data.statusRadio == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.zh-CN" :label="$t('exchange.exchange.5ukk1fm4d3c0')">
                                <a-input v-model="form.data.reasons['zh-CN']" :placeholder="$t('exchange.exchange.5ukk1fm4d740')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.en" :label="$t('exchange.exchange.5ukk1fm4dek0')">
                                <a-input v-model="form.data.reasons['en']" :placeholder="$t('exchange.exchange.5ukk1fm4dkw0')">
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="form.data.statusRadio == 3" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="reasons.tc" :label="$t('exchange.exchange.5ukk1fm4ds40')">
                                <a-input v-model="form.data.reasons['tc']" :placeholder="$t('exchange.exchange.5ukk1fm4du80')">
                                </a-input>
                            </a-form-item>
                        </a-col> -->



                    </a-row>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import { dataFormat } from '@/hooks/permission'
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
        from: '',
        status: '',
        to: '',
        time: [],
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
    const { code, data } = await apiCms.cmsChargeExchangeList({
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
        statusRadio: '',
        to_amount: 0
    },
    rules: {
        'reasons.zh-CN': [{ required: true, message: t('exchange.exchange.5ukk1fm4d740') }],
        'reasons.en': [{ required: true, message: t('exchange.exchange.5ukk1fm4dkw0') }],
        'reasons.tc': [{ required: true, message: t('exchange.exchange.5ukk1fm4du80') }],
        'type': [{ required: true, message: t('exchange.exchange.5ukk1fm4dy00') }],
        'statusRadio': [{ required: true, message: t('exchange.exchange.5ukk1fm4e1o0') }],
        'to_amount': [{ required: true, message: t('exchange.exchange.5ukk1fm4cz40') }],
    }
})

const optionsToBe = [
    { label: t('exchange.exchange.5ukk1fm4e4c0'), value: '2' },
    { label: t('exchange.exchange.5ukk1fm4ee00'), value: '3' },
];
const updateBtn = async (val: any) => {
    let obj: any = await getDetail(val.id)
    form.data = { ...obj }
    form.data.statusRadio = ''
    form.data.to_amount = 0.00
    form.data.from_amount = dataFormat(form.data.from_amount, 2, 1)
    console.log(form.data);
    form.data.real_name = form.data.real_name ? form.data.real_name : val.real_name
    form.data.type = Number(form.data.type)
    showVisible.value = true
}
const getDetail = async (id: any) => {
    const { code, data } = await apiCms.cmsChargeExchangeInfo({
        exchangeId: id
    })
    if (code != 1) return;
    return data
}
const handleSubmit = async () => {
    const validate = await formRef.value?.validate();
    if (validate) return false
    let params: any = {
        exchangeId: form.data.id,
        data: {
            status: form.data.statusRadio,
        }
    }
    // if (form.data.statusRadio == 3) {
    //     params.reasons = form.data.reasons
    // }
    if (form.data.statusRadio == 2) {
        params.data.to_amount = form.data.to_amount
    }
    const { code, msg } = await apiCms.cmsChargeExchangeAudit({ ...params })
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
        statusRadio: '',
        to_amount: 0
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