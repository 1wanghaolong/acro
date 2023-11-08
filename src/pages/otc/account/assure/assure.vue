<template>
    <a-tabs v-model:active-key="active" justify>
        <template #extra>
            <a-button type="primary" @click="createInfo.show = true" v-if="!active"
                v-permission="['otcAccountDetailAssureCreate']">
                <template #icon>
                    <icon-plus />
                </template>
                {{$t('assure.assure.5um4heu3b1k0')}}
            </a-button>
        </template>
        <a-tab-pane key="" :title="$t('assure.assure.5um4heu3bok0')" :disabled="tableData.loading">
            <div class="tabBox">
                <!-- otcAccountDetailAssureSum -->
                <a-space style="margin-bottom: 10px;" v-permission="['otcAccountDetailAssureSum']">
                    <a-tag>{{$t('assure.assure.5um4heu3bsg0')}} {{ tableData?.summary?.asset_account_total_assure_cash?.CNY || 0 }} CNY / {{
                        tableData?.summary?.asset_account_total_assure_cash?.HKD || 0 }} HKD / {{
        tableData?.summary?.asset_account_total_assure_cash?.USD || 0 }} USD</a-tag>
                </a-space>
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
                            <a-table-column :title="$t('assure.assure.5um4heu3bwg0')" :width="100" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3bz80')" :width="140">
                                <template #cell="{ record }">
                                    <div>{{ record.trs_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3c280')" :width="80">
                                <template #cell="{ record }">
                                    <a-tag>{{ record.trs_account_info?.currency||$t('assure.assure.5um4heu3c4w0') }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3ccs0')" :width="160">
                                <template #cell="{ record }">
                                    <div>{{ record.assure_cash }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3cno0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3crs0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3cvk0')" :width="80" v-if="$permission(['otcAccountDetailAssureCancel'])">
                                <template #cell="{ record }">
                                    <a-space>
                                        <a-link :loading="cancelInfo.loading" :disabled="cancelInfo.loading"
                                            @click="cancelShow(record)" status="danger">{{$t('assure.assure.5um4heu3czo0')}}</a-link>
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
            </div>
            <!-- 新增 -->
            <a-modal draggable v-model:visible="createInfo.show" :title="$t('assure.assure.5um4heu3b1k0')" @cancel="createInfo.show = false"
                @before-ok="create">
                <a-form ref="createFormRef" :model="createInfo.data" layout="vertical">
                    <a-form-item :label="$t('assure.assure.5um4heu3d280')">
                        {{ accountDetail?.account }}
                    </a-form-item>
                    <a-form-item :label="$t('assure.assure.5um4heu3d4g0')">
                        {{ accountDetail?.real_name }}
                    </a-form-item>
                    <a-form-item field="trs_account_id" :label="`TRS${ $t('assure.assure.5um9jjb729k0') }`" :rules="[{ required: true, message: $t('assure.assure.5um4heu3d9s0') }]">
                        <a-select v-model:model-value="createInfo.data.trs_account_id" allow-search :placeholder="$t('assure.assure.5um4heu3dbo0')"
                            :options="trsAccountList" :field-names="{ value: 'id', label: 'account' }"
                            @search="getTrsAccountList" :filter-option="true" :show-extra-options="false" />
                    </a-form-item>
                    <a-form-item field="assure_cash" :label="$t('assure.assure.5um4heu3ccs0')"
                        :rules="[{ required: true, message: $t('assure.assure.5um4heu3dh80') }, { type: 'number', min: 1, message: $t('assure.assure.5um4heu3dk00') }]">
                        <a-input-number v-model="createInfo.data.assure_cash" :placeholder="$t('assure.assure.5um4heu3dh80')" />
                    </a-form-item>
                </a-form>
            </a-modal>
        </a-tab-pane>
        <a-tab-pane key="4" :title="$t('assure.assure.5um4heu3dmg0')" :disabled="tableData.loading">
            <div class="tabBox">
                <div class="tableBox">
                    <a-table :bordered="false" column-resizable :pagination="false" :loading="assureRecord.loading"
                        :scroll="assureRecord.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                        :data="assureRecord.list" class="table">
                        <template #columns>
                            <a-table-column title="#" :width="50">
                                <template #cell="{ rowIndex }">
                                    {{ rowIndex + 1 }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3bwg0')" :width="100" :ellipsis="true" :tooltip="true">
                                <template #cell="{ record }">
                                    <div>{{ record.asset_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3bz80')" :width="140">
                                <template #cell="{ record }">
                                    <div>{{ record.trs_account_info?.account }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3dog0')" data-index="type" :width="120">
                                <template #cell="{ record }">
                                    {{ useEnumsFormat('otc.account.assure.type', record.type) }}
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3c280')" data-index="charge_currency" :width="80">
                                <template #cell="{ record }">
                                    <a-tag>{{ record.trs_account_info?.currency||$t('assure.assure.5um4heu3c4w0') }}</a-tag>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3ccs0')" :width="160">
                                <template #cell="{ record }">
                                    <div>{{ record.assure_cash }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3cno0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                                </template>
                            </a-table-column>
                            <a-table-column :title="$t('assure.assure.5um4heu3crs0')" :width="120">
                                <template #cell="{ record }">
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </template>
                            </a-table-column>
                        </template>
                    </a-table>
                </div>
                <div class="pagination">
                    <a-pagination size="small" @change="getAccountAssureRecord" @page-size-change="getAccountAssureRecord"
                        v-model:current="assureRecord.searchInfo.page" v-model:page-size="assureRecord.searchInfo.per_page"
                        :total="assureRecord.count" show-total show-jumper show-page-size />
                </div>
            </div>
        </a-tab-pane>
    </a-tabs>
    <!-- 新增 -->
    <a-modal draggable v-model:visible="cancelInfo.show" :title="$t('assure.assure.5um4heu3drk0')" @cancel="cancelInfo.show = false"
        @before-ok="assureCancel">
        <a-form :model="cancelInfo.data" layout="vertical">
            <a-space direction="vertical">
                <a-alert type="warning" :show-icon="false">{{$t('assure.assure.5um4heu3dtg0')}}</a-alert>
                <a-alert
                    v-if="cancelInfo.detail?.trs_account_info?.cancel_is_trigger_risk_control"
                    type="error" :show-icon="false">{{ $t('assure.assure.5um4i4i5zsw0') }}，{{ $t('assure.assure.5um4i4i60mo0') }}，{{ $t('assure.assure.5um4i4i60q40') }}{{cancelInfo.detail?.trs_account_info?.trigger_risk_control_name}}，{{$t('assure.assure.5um9j40iano0')}}</a-alert>
            </a-space>
            <a-row :gutter="16" style="margin-top: 20px;">
                <a-col :xs="24" :sm="12">
                    <a-form-item :label="$t('assure.assure.5um4heu3dvc0')">
                        {{ cancelInfo.detail?.trs_account_info?.account }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                    <a-form-item :label="$t('assure.assure.5um4heu3dxs0')">
                        {{ cancelInfo.detail?.assured_asset_account_info?.real_name }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                    <a-form-item :label="$t('assure.assure.5um4heu3ccs0')">
                        {{ cancelInfo.detail?.assure_cash }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                    <a-form-item :label="$t('assure.assure.5um4heu3dzg0')">
                        {{ cancelInfo.detail?.trs_account_info?.total_cash }}
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                    <a-form-item :label="$t('assure.assure.5um4heu3e1c0')">
                        {{ cancelInfo.detail?.trs_account_info?.loss_amount }}
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const active = ref('')
const route = useRoute()
const createFormRef = ref()
const searchInfo = reactive({
    data: {
        page: 1,
        per_page: 20
    }
})
const accountDetail: any = ref()
const trsAccountList: any = ref()
const tableData: any = reactive({
    show: false,
    loading: false,
    summary: {},
    list: [],
    count: 0
})
const assureRecord = reactive({
    show: false,
    loading: false,
    list: [],
    count: 0,
    searchInfo: {
        page: 1,
        per_page: 20
    }
})
const createInfo = reactive({
    show: false,
    loading: false,
    data: {
        trs_account_id: '',
        // currency: '',
        assure_cash: 0
    }
})
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.accountAssureList(useFilter({
        ...searchInfo.data,
        asset_account_id: route.params?.id
    }))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data.list
    tableData.count = data.count
}
const getAccountAssureRecord = async () => {
    assureRecord.loading = true
    const { code, data } = await apiTrs.accountAssureRecord(useFilter({
        ...assureRecord.searchInfo,
        asset_account_id: route.params?.id
    }))
    assureRecord.loading = false
    if (code != 1) return;
    assureRecord.list = data.list
    assureRecord.count = data.count
}
const getAccountAssureSummary = async () => {
    const { code, data } = await apiTrs.accountAssureSummary(useFilter({
        asset_account_id: route.params?.id
    }))
    if (code != 1) return;
    tableData.summary = data
}
const getAccountDetail = async () => {
    const { code, data } = await apiOtc.accountInfo({
        id: route.params?.id
    })
    if (code != 1) return;
    accountDetail.value = data
}
const getTrsAccountList = async (value: string) => {
    const { code, data } = await apiTrs.accountList(useFilter({
        trs_account: value,
        status: 1
    }))
    if (code != 1) return;
    trsAccountList.value = data.list
}
const create = async () => {
    const validate = await createFormRef.value?.validate()
    if (validate) return false;
    createInfo.loading = true
    const { code, msg } = await apiTrs.accountAssureCreate({
        data: {
            ...createInfo.data,
            asset_account_id: route.params?.id,
            operator_id: local.userInfo?.id || 1,
            currency: trsAccountList.value?.find((item: any) => item.id == createInfo.data.trs_account_id)?.currency
        }
    })
    createInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    createFormRef.value?.resetFields()
    createInfo.show = false
    getData()
    getAccountAssureRecord()
}
const cancelInfo: any = reactive({
    show: false,
    loading: false,
    data: {},
    detail: {}
})
const cancelShow = async (record: any) => {
    cancelInfo.loading = true
    const { code, data } = await apiTrs.accountAssureInfo({
        id: record.id
    })
    cancelInfo.loading = false
    if (code != 1) return false;
    cancelInfo.detail = data
    cancelInfo.show = true
}
const assureCancel = async () => {
    const { code, msg } = await apiTrs.accountAssureCancel({
        data: {
            id: cancelInfo.detail?.id,
            operator_id: local.userInfo?.id || 1
        }
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getData()
    getAccountAssureRecord()
}
onMounted(() => {
    route.query?.create ? createInfo.show = true : ""
})
{
    getData()
    getAccountAssureRecord()
    getAccountAssureSummary()
    getAccountDetail()
}
</script>