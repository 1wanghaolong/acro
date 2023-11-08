<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('stock.stock.5uke4t98f4k0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('stock.stock.5uke4t98gs00')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('stock.stock.5uke4t98h540')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('stock.stock.5uke4t98hac0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="name" :label="$t('stock.stock.5uke4t98hf40')">
                                <a-input v-model="searchInfo.data.name" :placeholder="$t('stock.stock.5uke4t98hac0')" />
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
                        {{ searchInfo.show ? $t('stock.stock.5uke4t98hjs0') : $t('stock.stock.5uke4t98how0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('stock.stock.5uke4t98ht80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('stock.stock.5uke4t98hxw0')}}
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
                        <a-table-column :title="$t('stock.stock.5uke4t98f4k0')" :width="90">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('market.market', record.market) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98i280')" :width="90">
                            <template #cell="{ record }">
                                <a-tag>
                                    {{ useEnumsFormat('market.security_type', record.security_type) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98h540')" :width="90">
                            <template #cell="{ record }">
                                <div>{{ record?.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98i6c0')" >
                            <template #cell="{ record }">
                                <div>{{ record?.name['zh-CN'] }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98ii80')" >
                            <template #cell="{ record }">
                                <div>{{ record?.name['en'] }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98io40')" >
                            <template #cell="{ record }">
                                <div>{{ record?.name['tc'] }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98isw0')" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency||$t('stock.stock.5uke4t98j5s0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98jaw0')" :width="90">
                            <template #cell="{ record }">
                                <div>{{ record?.lot_size }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98jfc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.tick_size }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5uke4t98jjk0')" :width="150">
                            <template #cell="{ record }">
                                <div v-if="!record.update_time">-</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.update_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.update_time).format('HH:mm:ss') }}</div>
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
        market: '',
        symbol: '',
        name: '',
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
    const { code, data } = await apiMarket.symbolList({
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