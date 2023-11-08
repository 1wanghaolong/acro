<template>
    <div class="tabBox">
        <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
            <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="from_type" :label="$t('record.record.5ukg0t2vjus0')">
                            <a-select allow-clear v-model="searchInfo.data.from_type" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                <a-option v-for="item in useEnums('otc.account.record.from_type')" :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="create_time" :label="$t('record.record.5um3rgwh5kw0')">
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
                    <a-table-column :title="$t('record.record.5um3rgwh61o0')" :width="100" :ellipsis="true" :tooltip="true">
                        <template #cell="{ record }">
                            <div>{{ record.asset_account_info?.account }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5ukg0t2vjus0')" :width="120">
                        <template #cell="{ record }">
                            <div>{{ useEnumsFormat('otc.account.record.from_type', record.from_type) }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5um3rgwh65k0')" :width="80">
                        <template #cell="{ record }">
                            <a-tag>{{ record.currency || $t('record.record.5ukg0t2vljw0') }}</a-tag>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5um3rgwh6800')" :width="100">
                        <template #cell="{ record }">
                            <div>{{ useEnumsFormat('otc.account.record.type', record.type) }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5um3rgwh6a80')" :width="160">
                        <template #cell="{ record }">
                            <div>{{ Number(record.update_num) > 0 ? '+' : '' }}{{ record.update_num }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5um3rgwh6c80')" :width="160">
                        <template #cell="{ record }">
                            <div>{{ record.before_num }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5um3rgwh6fo0')" :width="160">
                        <template #cell="{ record }">
                            <div>{{ record.after_num }}</div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('record.record.5um3rgwh5kw0')" :width="120">
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