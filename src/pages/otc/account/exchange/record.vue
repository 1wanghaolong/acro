<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('exchange.record.5um3qkmn2fk0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('exchange.record.5um3qkmn2xs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('exchange.record.5um3qkmn31s0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('exchange.record.5um3qkmn2xs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="from_currency" :label="$t('exchange.record.5um3qkmn3440')">
                                <a-select allow-clear v-model="searchInfo.data.from_currency" :placeholder="$t('exchange.record.5um3qkmn36c0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="to_currency" :label="$t('exchange.record.5um3qkmn38k0')">
                                <a-select allow-clear v-model="searchInfo.data.to_currency" :placeholder="$t('exchange.record.5um3qkmn36c0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('exchange.record.5um3qkmn3as0')">
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
                        {{ searchInfo.show ? $t('exchange.record.5um3qkmn3dg0') : $t('exchange.record.5um3qkmn3fc0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('exchange.record.5um3qkmn3ho0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('exchange.record.5um3qkmn3jk0')}}
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
                        <a-table-column data-index="asset_account_info.account" :title="$t('exchange.record.5um3qkmn2fk0')" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('exchange.record.5um3qkmn31s0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.record.5um3qkmn3lw0')" data-index="charge_currency" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.from_currency }}<icon-arrow-right />{{ record.to_currency }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.record.5um3qkmn3nw0')" data-index="charge_currency" :width="160">
                            <template #cell="{ record }">
                                <div>{{$t('exchange.record.5um3quuejxs0')}}:{{ record.from_amount }}</div>
                                <div>{{$t('exchange.record.5um3quuekok0')}}:{{ record.to_amount }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.record.5um3qkmn3ps0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.fee }} {{ record.from_currency }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.record.5um3qkmn3s80')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.operator_info?.nickname }}</div>
                                <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('exchange.record.5um3qkmn3as0')" :width="120">
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
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        asset_account: '',
        from_currency: '',
        to_currency: '',
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
    const { code, data } = await apiOtc.accountChargeExchangeList({
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