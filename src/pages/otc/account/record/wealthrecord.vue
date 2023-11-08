<template>
    <div class="tabBox">
        <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
            <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="from_type" :label="$t('record.wealthrecord.5um3ru671t40')">
                            <a-select allow-clear v-model="searchInfo.data.from_type" :placeholder="$t('record.wealthrecord.5um3ru672ew0')">
                                <a-option v-for="item in useEnums('otc.account.wealthrecord.from_type')"
                                    :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="create_time" :label="$t('record.wealthrecord.5um3ru672ls0')">
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
                    {{ searchInfo.show ? $t('record.wealthrecord.5um3ru672r00') : $t('record.wealthrecord.5um3ru672w80') }}
                </a-button>
                <a-button @click="searchFormRef?.resetFields(), getData()">
                    <template #icon>
                        <icon-refresh />
                    </template>
                    {{$t('record.wealthrecord.5um3ru6730w0')}}
                </a-button>
                <a-button @click="getData" type="primary">
                    <template #icon>
                        <icon-search />
                    </template>
                    {{$t('record.wealthrecord.5um3ru6735g0')}}
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
                    <a-table-column :title="$t('record.wealthrecord.5um3ru673bs0')" :width="100" :ellipsis="true" :tooltip="true">
                        <template #cell="{ record }">
                            <div>{{ record.asset_account_info?.account }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru671t40')" :width="100">
                        <template #cell="{ record }">
                            <div>{{ useEnumsFormat('otc.account.wealthrecord.from_type', record.from_type) }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru673h00')" :width="80">
                        <template #cell="{ record }">
                            <div>{{ record.currency || $t('record.wealthrecord.5um3ru673lo0') }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru673qo0')" :width="100">
                        <template #cell="{ record }">
                            <div>{{ useEnumsFormat('otc.account.wealthrecord.type', record.type) }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru673vg0')" :width="160" :ellipsis="true" :tooltip="true">
                        <template #cell="{ record }">
                            <div>{{ Number(record.update_num) > 0 ? '+' : '' }}{{ record.update_num }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru673zw0')" :width="160" :ellipsis="true" :tooltip="true">
                        <template #cell="{ record }">
                            <div>{{ record.before_num }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru674g00')" :width="160" :ellipsis="true" :tooltip="true">
                        <template #cell="{ record }">
                            <div>{{ record.after_num }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.wealthrecord.5um3ru672ls0')" :width="120">
                        <template #cell="{ record }">
                            <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                            <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
        </div>
        <div class="pagination">
            <a-pagination size="small" @change="getData" @page-size-change="getData" v-model:current="searchInfo.data.page"
                v-model:page-size="searchInfo.data.per_page" :total="tableData.count" show-total show-jumper
                show-page-size />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const searchFormRef = ref()
const local = useLocal()
const route = useRoute()
const searchInfo = reactive({
    show: false,
    data: {
        from_type: '',
        create_time: [],
        page: 1,
        per_page: 20
    }
})
const tableData: any = reactive({
    show: false,
    loading: false,
    summary: {},
    list: [],
    count: 0
})
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiOtc.accountAssetRecord(useFilter({
        ...searchInfo.data,
        asset_account_id: route.params?.id,
        from_type: searchInfo.data.from_type !== '' ? searchInfo.data.from_type : null
    }))
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data.list
    tableData.count = data.count
}

{
    getData()
}
</script>