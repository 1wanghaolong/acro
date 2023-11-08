<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('position.position.5ukft4xh2v00')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('position.position.5ukft4xh5zw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="real_name" :label="$t('position.position.5ukft4xh6cw0')">
                                <a-input v-model="searchInfo.data.real_name" :placeholder="$t('position.position.5ukft4xh5zw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('position.position.5ukft4xh6i80')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('position.position.5ukft4xh6ng0')">
                                    <a-option v-for="item in useEnums('market.market_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
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
                        {{ searchInfo.show ? $t('position.position.5ukft4xh6uk0') : $t('position.position.5ukft4xh74o0') }}
                    </a-button>
                    <a-button @click="resetBtn">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('position.position.5ukft4xh7h80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('position.position.5ukft4xh7o00')}}
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
                        <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
                            <a-table-column :title="$t('position.position.5ukft4xh6cw0')" data-index="real_name" :ellipsis="true" :tooltip="true"
                            :width="120"></a-table-column>
                            <a-table-column :title="$t('position.position.5ukft4xh2v00')" data-index="mobile" :ellipsis="true" :tooltip="true"
                            :width="130"></a-table-column>
                        <a-table-column :title="$t('position.position.5ukft4xh6i80')" data-index="market" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market_type', record.market) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('position.position.5ukft4xh7z00')" data-index="symbol" 
                            :width="100"></a-table-column>
                            <a-table-column :title="$t('position.position.5ukft4xh8500')" data-index="name" 
                            :width="120"></a-table-column>
                        <a-table-column :title="$t('position.position.5ukft4xh8ao0')" data-index="cost_price" :ellipsis="true" :tooltip="true"
                            :width="100">
                            <template #cell="{ record }">
                                {{ record.cost_price }}
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('position.position.5ukft4xh8fk0')" data-index="rest_num" 
                            :width="100">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.rest_num, 3, 1, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('position.position.5ukft4xh8k40')" data-index="positions_profit" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.positions_profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('position.position.5ukft4xh8os0')" data-index="positions_profit_rate" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ record.positions_profit_rate > 0 ? '+' : '' }}{{ $dataFormat(record.positions_profit_rate * 100)
                                }}%
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('position.position.5ukft4xh8uo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
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
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const searchFormRef = ref()
console.log(route.query);

const searchInfo: any = reactive({
    show: false,
    data: {
        mobile: route.query?.mobile || '',
        real_name: '',
        market: route.query?.market || '',
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
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiCms.cmsSimulatePositionsList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const resetBtn = () => {
    searchFormRef.value?.resetFields()
    searchInfo.data.market = ''
    searchInfo.data.mobile = ''
    if (route.query?.mobile || route.query?.market) {
        router.push({ name: 'cmsSimulatePosition' })
    }
    getData()
}

{
    getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>