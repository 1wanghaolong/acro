<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="$t('status.status.5um8j75rtks0')">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('status.status.5um8j75ruc00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('status.status.5um8j75rufw0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('status.status.5um8j75ruc00')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('status.status.5um8j75rujc0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('status.status.5um8j75ruls0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('status.status.5um8j75ruo00')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('status.status.5um8j75ruq80') : $t('status.status.5um8j75ruso0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('status.status.5um8j75ruuo0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('status.status.5um8j75ruwo0')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
                    class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75rufw0')">
                            <template #cell="{ record }">
                                <div>{{ record.asset_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75ruyo0')">
                            <template #cell="{ record }">
                                <div>{{ record.trs_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('status.status.5um8jtikxk40') }`">
                            <template #cell="{ record }">
                                <div>{{ record.trs_account_info?.currency }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75rv0s0')">
                            <template #cell="{ record }">
                                <div>{{ record.assure_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75ruo00')">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75rv2o0')">
                            <template #cell="{ record }">
                                <div>{{ record?.operator_info?.nickname }}</div>
                                <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('status.status.5um8j75rv5k0')" :width="100" fixed="right"
                            v-if="$permission(['trsAccountAssureCancel'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link :loading="cancelInfo.loading" :disabled="cancelInfo.loading"
                                        @click="cancelShow(record)" status="danger">{{$t('status.status.5um8j75rv7s0')}}</a-link>
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
        <!-- 新增 -->
        <a-modal draggable v-model:visible="cancelInfo.show" :title="$t('status.status.5um8j75rv9w0')" @cancel="cancelInfo.show = false"
            @before-ok="assureCancel">
            <a-form :model="cancelInfo.data" layout="vertical">
                <a-space direction="vertical">
                    <a-alert type="warning" :show-icon="false">{{$t('status.status.5um8j75rvbs0')}}</a-alert>
                    <a-alert v-if="cancelInfo.detail?.trs_account_info?.cancel_is_trigger_risk_control" type="error"
                        :show-icon="false">{{$t('status.status.5um8k30cads0')}}{{ cancelInfo.detail?.trs_account_info?.trigger_risk_control_name }}，{{$t('status.status.5um9jb43sn00')}}</a-alert>
                </a-space>
                <a-row :gutter="16" style="margin-top: 20px;">
                    <a-col :xs="24" :sm="12">
                        <a-form-item :label="$t('status.status.5um8j75rvds0')">
                            {{ cancelInfo.detail?.trs_account_info?.account }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12">
                        <a-form-item :label="$t('status.status.5um8j75rvfw0')">
                            {{ cancelInfo.detail?.assured_asset_account_info?.real_name }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12">
                        <a-form-item :label="$t('status.status.5um8j75rv0s0')">
                            {{ cancelInfo.detail?.assure_cash }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12">
                        <a-form-item :label="$t('status.status.5um8j75rvi00')">
                            {{ cancelInfo.detail?.trs_account_info?.total_cash }}
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12">
                        <a-form-item :label="$t('status.status.5um8j75rvmg0')">
                            {{ cancelInfo.detail?.trs_account_info?.loss_amount }}
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        asset_account: '',
        trs_account: '',
        currency: '',
        create_time: [],
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
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.accountAssureList({
        ...useFilter(searchInfo.data)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
{
    getData()
}
</script>