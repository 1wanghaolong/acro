<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="$t('record.record.5um8ivgayq80')">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('record.record.5um3rgwh61o0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('record.record.5ukg0t2vjus0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('trs.account.assure.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('record.record.5um3rgwh65k0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('record.record.5um8ivgaz800')">
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
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
                    class="table">
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um3rgwh61o0')" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.asset_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um8ivgazb40')" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                <div>{{ record.trs_account_info?.account }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vjus0')" :width="80">
                            <template #cell="{ record }">
                                <a-tag size="small" :color="record.type == 1 ? '#00b42a' : '#f53f3f'">
                                    {{ useEnumsFormat('trs.account.assure.type', record.type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('record.record.5umdn98sy0o0') }`" :width="80">
                            <template #cell="{ record }">
                                <div>{{ record.trs_account_info?.currency || $t('record.record.5ukg0t2vljw0') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um8ivgazdc0')" :width="160">
                            <template #cell="{ record }">
                                <div>{{ record.assure_cash }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um8ivgaz800')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5um8ivgazfg0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.operator_info?.nickname }}</div>
                                <div style="color: #b8c2cc;">ID:{{ record?.operator_info?.id }}</div>
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
        trs_account: '',
        type: '',
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
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.accountAssureRecord({
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