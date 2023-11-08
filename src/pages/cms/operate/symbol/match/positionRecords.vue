
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('match.positionRecords.5ukjg8ydjm80')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('match.positionRecords.5ukjg8ydulc0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('match.positionRecords.5ukjg8yduxk0') : $t('match.positionRecords.5ukjg8ydv600') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('match.positionRecords.5ukjg8ydvcg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('match.positionRecords.5ukjg8ydvi80')}}
                    </a-button>
                    <a-button @click="router.back()">
                        {{$t('match.positionRecords.5ukjg8ydvoo0')}}
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
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydvu00')" data-index="nickname" :ellipsis="true" :tooltip="true"
                            :width="140"></a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydvzc0')" data-index="mobile" :ellipsis="true" :tooltip="true"
                            :width="130"></a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydjm80')" data-index="market" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market', record.market) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydw480')" data-index="symbol" 
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydw8c0')" data-index="name" 
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydwek0')" data-index="cost_price" :ellipsis="true" :tooltip="true" :width="100">
                            <template #cell="{ record }">
                                {{ record.cost_price }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydwl40')" data-index="buy_total_num" :ellipsis="true" :tooltip="true" :width="100">
                            <template #cell="{ record }">
                                {{ record.buy_total_num }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydwq80')" data-index="latest_price"  :width="100">
                            <template #cell="{ record }">
                                {{ record.latest_price }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydwus0')" data-index="in_market_value" :ellipsis="true" :tooltip="true"
                            :width="140">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.in_market_value) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydx3o0')" data-index="position_profit" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.position_profit) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydxak0')" data-index="position_profit_rate" :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ record.position_profit_rate > 0 ? '+' : '' }}{{ $dataFormat(record.position_profit_rate *
                                    100)
                                }}%
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.positionRecords.5ukjg8ydxio0')" :width="120">
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
const router = useRouter()
const route = useRoute()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        asset_id: route.query?.id,
        nickname: '',
        market: '',
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
    const { code, data } = await apiCms.cmsMatchPositions({
        ...useFilter(param)
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
<style scoped>
:deep(.arco-typography) {
    margin-bottom: 0;
}
</style>