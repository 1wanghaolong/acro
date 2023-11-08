<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="agentName" :label="$t('settlement.detail.5uklpeg4kg80')">
                                <a-input v-model="searchInfo.data.agentName" :placeholder="$t('settlement.detail.5uklpeg4m1c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userName" :label="$t('settlement.detail.5uklpeg4mbg0')">
                                <a-input v-model="searchInfo.data.userName" :placeholder="$t('settlement.detail.5uklpeg4m1c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="userId" :label="$t('settlement.detail.5uklpeg4mkg0')">
                                <a-input v-model="searchInfo.data.userId" :placeholder="$t('settlement.detail.5uklpeg4m1c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('settlement.detail.5uklpeg4mq00')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('settlement.detail.5uklpeg4mxs0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="commissionType" :label="$t('settlement.detail.5uklpeg4n340')"
                                v-if='local.config?.agent?.is_show_trs_interest'>
                                <a-select allow-clear v-model="searchInfo.data.commissionType" :placeholder="$t('settlement.detail.5uklpeg4mxs0')">
                                    <a-option v-for="item in useEnums('cms.agent.settlement.commissionType2')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="commissionType" :label="$t('settlement.detail.5uklpeg4n340')" v-else>
                                <a-select allow-clear v-model="searchInfo.data.commissionType" :placeholder="$t('settlement.detail.5uklpeg4mxs0')">
                                    <a-option v-for="item in useEnums('cms.agent.settlement.commissionType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="clearDate" :label="$t('settlement.detail.5uklpeg4n840')">
                                <a-month-picker v-model="searchInfo.data.clearDate" style="width: 100%;" />
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
                        {{ searchInfo.show ? $t('settlement.detail.5uklpeg4ndc0') : $t('settlement.detail.5uklpeg4nig0') }}
                    </a-button>
                    <a-button @click="resetBtn">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('settlement.detail.5uklpeg4nn00')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('settlement.detail.5uklpeg4nsg0')}}
                    </a-button>
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
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4nxg0')" data-index="agent_name" :ellipsis="true" :tooltip="true" :width="150">
                            <template #cell="{ record }">
                                <span v-if="record.user_name">
                                    {{ record.agent_name }}({{ record.user_name }})
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4n840')" data-index="clear_date"
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4mq00')" data-index="currency" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('currency', record.currency) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4n340')" data-index="commission_type" :width="120">
                            <template #cell="{ record }">
                                <div v-if='local.config?.agent?.is_show_trs_interest'>{{
                                    useEnumsFormat('cms.agent.settlement.commissionType2', record.commission_type) }}</div>
                                <div v-else>{{ useEnumsFormat('cms.agent.settlement.commissionType', record.commission_type)
                                }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4mkg0')" data-index="user_id" 
                            :width="90"></a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4o2c0')" data-index="mobile"  :width="160">
                            <template #cell="{ record }">
                                {{ record.country_code }} {{ record.mobile }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4o7k0')" data-index="real_name" :ellipsis="true" :tooltip="true" :width="140">
                            <template #cell="{ record }">
                                <span v-if="record.user_belong_to_agent_info">
                                    {{ record.user_belong_to_agent_info?.agent_name }}({{
                                        record.user_belong_to_agent_info?.user_name }})
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4ocw0')" data-index="real_name" 
                            :width="150">
                            <template #cell="{ record }">
                                <span
                                    v-if="record.user_belong_to_top_agent_info && (record.user_belong_to_top_agent_info?.id != record.user_belong_to_agent_info?.id)">
                                    {{ record.user_belong_to_top_agent_info?.agent_name }}({{
                                        record.user_belong_to_top_agent_info?.user_name }})
                                </span>
                                <span v-else>
                                    -
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4oi80')" data-index="commission_money" 
                            :width="120">
                            <template #cell="{ record }">
                                <a-link @click="detailBtn(record)" v-if="$permission(['cmsAgentClearCommissionSummary'])">{{
                                    $dataFormat(record.commission_money, 2, 1) }}</a-link>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('settlement.detail.5uklpeg4ovo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
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
        <a-modal width="600px" :footer="false" :mask-closable=false v-model:visible="showVisible">
            <template #title>
                {{ $t('settlement.detail.5uklpeg4oi80') }}
            </template>
            <div>
                <a-form ref="formRef" :model="detail" layout="vertical">
                    <a-row :gutter="16" v-if='interestShow'>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4p3g0')">
                                <a-input disabled v-model="detail.commission_produce" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4p980')">
                                <a-input disabled v-model="detail.top_agent.commission_rate" >
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4pgc0')">
                                <a-input disabled v-model="detail.top_agent.commission_money" />
                            </a-form-item>
                        </a-col>
                        <a-col v-if="commissionTypeShow" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4pkk0')">
                                <a-input disabled v-model="detail.lower_agent_commission_rate" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4ppo0')">
                                <a-input disabled v-model="detail.this_agent_commission" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row v-else :gutter="16">
                        <template v-for="item in detail.type_list">
                            <a-col v-if="item.type == 1" :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('settlement.detail.5uklpeg4ptw0')">
                                    <a-input disabled v-model="item.commission_produce" />
                                </a-form-item>
                            </a-col>
                            <a-col v-if="item.type == 2" :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('settlement.detail.5uklpeg4pxw0')">
                                    <a-input disabled v-model="item.commission_produce" />
                                </a-form-item>
                            </a-col>
                        </template>
                        <template v-for="item in detail.top_agent_type_list">
                            <a-col v-if="item.type == 1" :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('settlement.detail.5uklpeg4rgo0')">
                                    <a-input disabled v-model="item.commission_rate" />
                                </a-form-item>
                            </a-col>
                            <a-col v-if="item.type == 1" :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('settlement.detail.5uklpeg4roo0')">
                                    <a-input disabled v-model="item.commission_money" />
                                </a-form-item>
                            </a-col>
                            <a-col v-if="item.type == 2" :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('settlement.detail.5uklpeg4rt80')">
                                    <a-input disabled v-model="item.commission_rate" />
                                </a-form-item>
                            </a-col>
                            <a-col v-if="item.type == 2" :xs="24" :sm="12" :md="8" :xl="12">
                                <a-form-item :label="$t('settlement.detail.5uklpeg4rxc0')">
                                    <a-input disabled v-model="item.commission_money" />
                                </a-form-item>
                            </a-col>
                        </template>
                        <a-col v-if="commissionTypeShow" :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4s180')">
                                <a-input disabled v-model="detail.lower_agent_commission_rate" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('settlement.detail.5uklpeg4ppo0')">
                                <a-input disabled v-model="detail.this_agent_commission" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import { dataFormat } from '@/hooks/permission'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
// const router = useRouter()
const searchFormRef = ref()
const searchInfo: any = reactive({
    show: false,
    data: {
        agentName: '',
        userId: route.query?.userId || '',
        userName: '',
        currency: '',
        commissionType: '',
        clearDate: '',
        agentId: route.query?.id || '',
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
// console.log(import.meta.env.VITE_BASE_API,1);

const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsAgentClearLogList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const resetBtn = () => {
    searchFormRef.value?.resetFields()
    getData()
}
// 详情
const detail: any = ref({
    type_list: [{ commission_produce: '' }, { commission_produce: '' }],
    top_agent_type_list: [{ commission_money: '', commission_rate: '' }, { commission_money: '', commission_rate: '' }],
    top_agent: { commission_money: '', commission_rate: '' },
})
const showVisible = ref(false)
const commissionTypeShow = ref(false)
const interestShow = ref(false)
const detailBtn = async (val: any) => {
    let obj: any = {}
    if (val.commission_type == 4 || val.commission_type == 5 || val.commission_type == 6) {
        obj = await getInterestDetail(val)
    } else {
        obj = await getDetail(val)
    }
    if (val.commission_type == 2 || val.commission_type == 5 || val.commission_type == 3 || val.commission_type == 6) {
        commissionTypeShow.value = true
    } else {
        commissionTypeShow.value = false
    }
    if (val.commission_type == 4 || val.commission_type == 5 || val.commission_type == 6) {
        interestShow.value = true
    } else {
        interestShow.value = false
    }
    detail.value = { ...obj }
    if (val.commission_type == 4 || val.commission_type == 5 || val.commission_type == 6) {
        detail.value.top_agent.commission_money = dataFormat(obj.top_agent.commission_money, 2, 1)
        detail.value.top_agent.commission_rate = dataFormat(obj.top_agent.commission_rate, 2, 1) + '%'
    } else {
        if (detail.value.type_list?.length) {
            detail.value.type_list.forEach((item: any) => {
                item.commission_produce = dataFormat(item.commission_produce, 2, 1)
            })
        }
        if (detail.value.top_agent_type_list?.length) {
            detail.value.top_agent_type_list.forEach((item: any) => {
                item.commission_money = dataFormat(item.commission_money, 2, 1)
                item.commission_rate = dataFormat(item.commission_rate, 2, 1) + '%'
            })
        }
    }
    detail.value.lower_agent_commission_rate = dataFormat(obj.lower_agent_commission_rate, 2, 1) + '%'
    detail.value.this_agent_commission = dataFormat(obj.this_agent_commission, 2, 1)
    detail.value.commission_produce = dataFormat(obj.commission_produce, 2, 1)



    showVisible.value = true

}
const getDetail = async (val: any) => {
    const { code, data } = await apiCms.cmsAgentClearCommissionSummary({
        agentId: val.agent_id,
        userId: val.user_id,
        currency: val.currency,
        clearDate: val.clear_date,
    })
    if (code != 1) return;
    return data
}
const getInterestDetail = async (val: any) => {
    const { code, data } = await apiCms.cmsAgentInterestClearCommissionSummary({
        agentId: val.agent_id,
        userId: val.user_id,
        currency: val.currency,
        clearDate: val.clear_date,
    })
    if (code != 1) return;
    return data
}

{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}
</style>