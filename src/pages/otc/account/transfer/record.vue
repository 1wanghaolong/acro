<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('transfer.record.5um3udwqqz80')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('transfer.record.5um3udwqrfk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('transfer.record.5um3uq43prk0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('transfer.record.5um3udwqrfk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('transfer.record.5um3udwqriw0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('transfer.record.5um3udwqrfk0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="charge_currency" :label="$t('transfer.record.5um3udwqrl00')">
                                <a-select allow-clear v-model="searchInfo.data.charge_currency" :placeholder="$t('transfer.record.5um3udwqrn40')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('transfer.record.5um3udwqrpk0')">
                                <a-range-picker v-model="searchInfo.data.check_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('transfer.record.5um3udwqrs40') : $t('transfer.record.5um3udwqru40') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('transfer.record.5um3udwqrwg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('transfer.record.5um3udwqrzg0')}}
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
                        <a-table-column :title="$t('transfer.record.5um3udwqqz80')" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.asset_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqriw0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqrl00')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('transfer.record.5um3udwqs1s0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('transfer.record.5um3uq43prk0') }`" data-index="trs_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqs400')" data-index="charge_amount" :width="160" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqs6c0')" data-index="charge_fee" :width="120"></a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqs8g0')" :width="local.lang == 'en' ? 160:80">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('otc.account.transfer.from_type', record.from_type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqsas0')" :width="local.lang == 'en' ? 160:120">
                            <template #cell="{ record }">
                                <div>{{ record?.operator_info?.nickname }}</div>
                                <div v-if="record?.operator_info?.id" style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('transfer.record.5um3udwqscw0')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="!record.check_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
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
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        asset_account: '',
        charge_currency: '',
        trs_account: '',
        real_name: '',
        check_time: [],
        status: 2,
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
    tableData.loading = true
    const { code, data } = await apiTrs.accountChargeTransferList({
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