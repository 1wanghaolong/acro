<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('entrust.entrust.5ukfpvnry180')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('entrust.entrust.5ukfpvnrz000')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="realName" :label="$t('entrust.entrust.5ukfpvnrz500')">
                                <a-input v-model="searchInfo.data.realName" :placeholder="$t('entrust.entrust.5ukfpvnrz000')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('entrust.entrust.5ukfpvnrz7w0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('entrust.entrust.5ukfpvnrzak0')">
                                    <a-option v-for="item in useEnums('market.market_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="orderId" :label="$t('entrust.entrust.5ukfpvnrzdc0')">
                                <a-input v-model="searchInfo.data.orderId" :placeholder="$t('entrust.entrust.5ukfpvnrz000')" />
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
                        {{ searchInfo.show ? $t('entrust.entrust.5ukfpvnrzg00') : $t('entrust.entrust.5ukfpvnrzio0') }}
                    </a-button>
                    <a-button @click="resetBtn">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('entrust.entrust.5ukfpvnrzlc0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('entrust.entrust.5ukfpvnrzpg0')}}
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
                            <a-table-column :title="$t('entrust.entrust.5ukfpvnrz500')" data-index="real_name" :ellipsis="true" :tooltip="true"
                            :width="100"></a-table-column>
                            <a-table-column :title="$t('entrust.entrust.5ukfpvnry180')" data-index="mobile" :ellipsis="true" :tooltip="true"
                            :width="130"></a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvnrz7w0')" data-index="market" :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('market.market_type', record.market) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvnrzrc0')" data-index="symbol" 
                            :width="100"></a-table-column>
                            <a-table-column :title="$t('entrust.entrust.5ukfpvnrztk0')" data-index="name" 
                            :width="120"></a-table-column>
                            <a-table-column :title="$t('entrust.entrust.5ukfpvnrzdc0')" data-index="order_id" :ellipsis="true" :tooltip="true"
                            :width="180"></a-table-column>
                            <a-table-column :title="$t('entrust.entrust.5ukfpvnrzwc0')" data-index="direction" 
                            :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.account.direction', record.direction) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvnrzzo0')" data-index="price_type" 
                            :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.trade.type', record.price_type) }}
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('entrust.entrust.5ukfpvns03k0')" data-index="trade_price" 
                            :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                {{ record.trade_price }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvns08c0')" data-index="trade_num" 
                            :width="local.lang=='en'?120:100">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.trade_num, 1, 1, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvns0ao0')" data-index="status" 
                            :width="100">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.account.status', record.status) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvns0cs0')" data-index="deal_num" 
                            :width="100">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.deal_num, 1, 1, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvns0g80')" data-index="deal_num" 
                            :width="local.lang=='en'?140:120">
                            <template #cell="{ record }">
                                {{ Number(record.trade_num) - Number(record.deal_num) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('entrust.entrust.5ukfpvns0nc0')" data-index="expire_type" 
                            :width="110">
                            <template #cell="{ record }">
                                {{ useEnumsFormat('cms.simulate.entrust.expire_type', record.expire_type) }}
                            </template>
                        </a-table-column>
                            <a-table-column :title="$t('entrust.entrust.5ukfpvns0vk0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.trade_time ? dayjs.unix(record.trade_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.trade_time ? dayjs.unix(record.trade_time).format('HH:mm:ss') : '--' }}
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
        realName: '',
        orderId: '',
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
    const { code, data } = await apiCms.cmsSimulateEntrustedList({
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
        router.push({ name: 'cmsSimulateEntrust' })
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