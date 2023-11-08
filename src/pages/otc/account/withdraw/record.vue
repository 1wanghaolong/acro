<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('withdraw.record.5um3wcb6atk0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('withdraw.record.5um3wcb6bcs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('withdraw.record.5um3wcb6bg80')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('withdraw.record.5um3wcb6bcs0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="charge_currency" :label="$t('withdraw.record.5um3wcb6bic0')">
                                <a-select allow-clear v-model="searchInfo.data.charge_currency" :placeholder="$t('withdraw.record.5um3wcb6bkg0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('withdraw.record.5um3wcb6bmg0')">
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
                        {{ searchInfo.show ? $t('withdraw.record.5um3wcb6bpc0') : $t('withdraw.record.5um3wcb6brc0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('withdraw.record.5um3wcb6btk0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('withdraw.record.5um3wcb6bvo0')}}
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
                        <a-table-column :title="$t('withdraw.record.5um3wcb6atk0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6bg80')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6bic0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('withdraw.record.5um3wcb6c0g0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6c2o0')" data-index="charge_fee" :width="120"></a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6c4s0')" data-index="charge_amount" :width="160"></a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6c7k0')" :width="160">
                            <template #cell="{ record }">
                                {{ record.charge_amount && record.charge_fee ? (Number(record.charge_amount) -
                                    Number(record.charge_fee)).toFixed(4) : '--' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6c9s0')" :width="180">
                            <template #cell="{ record }">
                                <div v-if="!record.charge_bank_code">-</div>
                                <div v-else>
                                    <div>{{$t('withdraw.record.5um3wo8lqjs0')}}:{{ record.charge_bank_full_name }}</div>
                                    <div>{{$t('withdraw.record.5um3wo8lr0k0')}}:{{ record.charge_bank_code }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6cbk0')" data-index="charge_bank_account" :width="200" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6cdo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.operator_info?.nickname }}</div>
                                <div v-if='record?.operator_info?.id' style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('withdraw.record.5um3wcb6bmg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
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
        charge_currency: '',
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
    const { code, data } = await apiOtc.accountChargeWithdrawList({
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