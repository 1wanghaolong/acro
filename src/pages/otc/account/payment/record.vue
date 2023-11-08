<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('payment.record.5um3ob35ulk0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('payment.record.5um3ob35v3k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('payment.record.5um3ob35v6k0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('payment.record.5um3ob35v3k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="charge_currency" :label="$t('payment.record.5um3ob35v8s0')">
                                <a-select allow-clear v-model="searchInfo.data.charge_currency" :placeholder="$t('payment.record.5um3ob35vao0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('payment.record.5um3ob35vdo0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('payment.record.5um3ob35vao0')">
                                    <a-option v-for="item in useEnums('otc.account.payment.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('payment.record.5um3ob35vfw0')">
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
                        {{ searchInfo.show ? $t('payment.record.5um3ob35vi40') : $t('payment.record.5um3ob35vk00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('payment.record.5um3ob35vmc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('payment.record.5um3ob35vo80')}}
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
                        <a-table-column :title="$t('payment.record.5um3ob35ulk0')" data-index="asset_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35v6k0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35v8s0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record.charge_currency || $t('payment.record.5um3ob35vqo0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35vsw0')" data-index="charge_fee" :width="120"></a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35vvo0')" data-index="charge_amount" :width="160"></a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35vxw0')" data-index="charge_amount" :width="160">
                            <template #cell="{ record }">
                                {{ record.charge_amount && record.charge_fee ? (Number(record.charge_amount) -
                                    Number(record.charge_fee)).toFixed(4) : '--' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35vdo0')" data-index="type" :width="local.lang =='en'?180:120">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('otc.account.payment.type', record.type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35w080')" :width="local.lang == 'en' ? 200:180">
                            <template #cell="{ record }">
                                <div v-if="!record.system_bank_card_info?.bank_account">-</div>
                                <div v-else>
                                    <div>{{$t('payment.record.5um3op5q7dc0')}}:{{ record.system_bank_card_info?.charge_bank_full_name }}</div>
                                    <div>{{$t('payment.record.5um3op5q8740')}}:{{ record.system_bank_card_info?.bank_account }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35w3k0')" :width="local.lang == 'en' ? 200:180">
                            <template #cell="{ record }">
                                <div v-if="!record.charge_bank_code">-</div>
                                <div v-else>
                                    <div>{{$t('payment.record.5um3op5q7dc0')}}:{{ record.charge_bank_full_name }}</div>
                                    <div>{{$t('payment.record.5um3op5q8bc0')}}:{{ record.charge_bank_code }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35w5k0')" data-index="charge_bank_account" :width="200" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35w7k0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.operator_info?.nickname }}</div>
                                <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('payment.record.5um3ob35vfw0')" :width="120">
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
import { useEnums, useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        asset_account: '',
        charge_currency: '',
        real_name: '',
        type: '',
        check_time: [],
        status: 4,
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
    const { code, data } = await apiOtc.accountChargePaymentList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            type: searchInfo.data.type ? searchInfo.data.type : null
        })
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