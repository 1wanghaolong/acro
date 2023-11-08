<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('record.record.5um3rgwh61o0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('record.record.5um9hmpyu3o0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('record.record.5um9hmpyumo0') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="charge_currency" :label="$t('record.record.5um3rgwh65k0')">
                                <a-select allow-clear v-model="searchInfo.data.charge_currency" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="check_time" :label="$t('record.record.5um9hmpyups0')">
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
                        {{ searchInfo.show ? $t('record.record.5ukg0t2vk6o0') : $t('record.record.5ukg0t2vk9c0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('record.record.5ukg0t2vkbw0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('record.record.5ukg0t2vkek0')}}
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
                        <a-table-column :title="`TRS${ $t('record.record.5um9hmpyumo0') }`" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.trs_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um9hmpyu3o0')" :width="120">
                            <template #cell="{ record }">
                                <div>CN:{{ record.asset_account_info?.real_name }}</div>
                                <div>EN:{{ record.asset_account_info?.english_name }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um3rgwh61o0')" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.asset_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um3rgwh65k0')" data-index="charge_currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.charge_currency || $t('record.record.5ukg0t2vljw0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vl6c0')" data-index="charge_amount" :width="160"></a-table-column>
                        <a-table-column :title="$t('record.record.5um9hmpyurw0')" data-index="charge_fee" :width="120"></a-table-column>
                        <a-table-column :title="$t('record.record.5um9hmpyuts0')" :width="local.lang =='en'?160:100">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('trs.account.withdraw.apply.from_type', record.from_type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um8ivgazfg0')" :width="local.lang =='en'?160:120">
                            <template #cell="{ record }">
                                <div v-if="!record?.operator_info?.id">-</div>
                                <div v-else>
                                    <div>{{ record?.operator_info?.nickname }}</div>
                                    <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um9hmpyups0')" :width="120">
                            <template #cell="{ record }">
                                <div v-if="record.check_time">
                                    <div>{{ dayjs.unix(record.check_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.check_time).format('HH:mm:ss') }}</div>
                                </div>
                                <div v-else>-</div>
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
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.accountWithdraw({
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