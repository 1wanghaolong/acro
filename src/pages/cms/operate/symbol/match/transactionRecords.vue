
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('match.transactionRecords.5ukjh8v0yyw0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('match.transactionRecords.5ukjh8v0zz00')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('match.transactionRecords.5ukjh8v10680')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('match.transactionRecords.5ukjh8v0zz00')">
                                    <a-option v-for="item in useEnums('cms.simulate.account.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
            <div class="buttonBox">
                <a-space :size="18">
                     <h3>
                        <span>{{$t('match.transactionRecords.5ukjiqa3uys0')}}</span>
                        <span> {{ route.query?.nickname }} </span>
                        <span>{{$t('match.transactionRecords.5ukjiqa4awc0')}}</span>
                        <span>{{title}}</span>
                        <span>{{$t('match.transactionRecords.5ukjiqa4clc0')}}</span>
                    </h3>
                </a-space>
                <a-space :size="18">
                    <a-button @click="searchInfo.show = !searchInfo.show">
                        <template #icon>
                            <icon-filter />
                        </template>
                        {{ searchInfo.show ? $t('match.transactionRecords.5ukjh8v10f80') : $t('match.transactionRecords.5ukjh8v10sg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('match.transactionRecords.5ukjh8v11300')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('match.transactionRecords.5ukjh8v11840')}}
                    </a-button>
                    <a-button @click="router.back()">
                        {{$t('match.transactionRecords.5ukjh8v11bw0')}}
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
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v11hk0')" data-index="nickname" :ellipsis="true" :tooltip="true"
                            :width="140"></a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v11oo0')" data-index="mobile" :ellipsis="true" :tooltip="true"
                            :width="130"></a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v0yyw0')" data-index="market" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market', record.market) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v11vs0')" data-index="symbol"
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v124w0')" data-index="name"
                            :width="100"></a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v12cs0')" data-index="direction" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.account.direction', record.direction) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v12hw0')" data-index="price_type" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.trade.type', record.price_type) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v12ps0')" data-index="trade_num"  :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                {{ record.trade_num ? $dataFormat(record.trade_num, 1, 1, 1) : 0 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v12xg0')" data-index="trade_price"  :width="100">
                            <template #cell="{ record }">
                                {{ record.trade_price }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v13300')" data-index="status"  :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.account.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v13740')" data-index="deal_num" :width="100">
                            <template #cell="{ record }">
                                {{ record.deal_num ? $dataFormat(record.deal_num, 1, 1, 1) : 0 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v13ak0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.trade_time ? dayjs.unix(record.trade_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.trade_time ? dayjs.unix(record.trade_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('match.transactionRecords.5ukjh8v13f40')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.deal_time ? dayjs.unix(record.deal_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.deal_time ? dayjs.unix(record.deal_time).format('HH:mm:ss') : '--' }}
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
const title = ref(sessionStorage.getItem('title') || '')
const searchInfo = reactive({
    show: false,
    data: {
        asset_id: route.query?.id,
        nickname: '',
        status: '',
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
    const { code, data } = await apiCms.cmsMatchTrade({
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