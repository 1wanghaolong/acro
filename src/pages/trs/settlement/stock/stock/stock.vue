<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('stock.stock.5uke4t98h540')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('stock.stock.5uke4t98hac0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('stock.stock.5umxj12u8dg0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('stock.stock.5uke4t98gs00')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('stock.stock.5umxj12u9140')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('stock.stock.5uke4t98gs00')">
                                    <a-option v-for="item in useEnums('trs.settlement.dividend.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="record_date" :label="$t('stock.stock.5umxj12u9540')">
                                <a-range-picker v-model="searchInfo.data.record_date" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="payment_date" :label="$t('stock.stock.5umctqzu4940')">
                                <a-range-picker v-model="searchInfo.data.payment_date" format="YYYY-MM-DD" />
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
                <a-space :size="18" v-permission="['trsSettlementStockTask']">
                    <a-button @click="router.push({ name: 'trsSettlementStockTask' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('stock.stock.5umxj12u9700')}}
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
                        <a-table-column :title="$t('stock.stock.5umctqzu4aw0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record?.name }}</div>
                                <div style="font-size: 12px;">{{ record?.market }} {{ record?.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umctqzu4ko0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record?.from_num }}{{ record?.type == 1 ? $t('stock.stock.5umctqzu4mo0') : $t('stock.stock.5umctqzu4ok0') }}{{ record.to_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umxj12u9140')" :width="local.lang =='en'?130:100">
                            <template #cell="{ record }">
                                <a-tag v-if="record.is_cancel" size="small" color="#86909c">
                                    {{ useEnumsFormat('trs.settlement.dividend.status', 5) }}
                                </a-tag>
                                <a-tag v-else size="small"
                                    :color="record.status == 4 ? '#00b42a' : record.status == 1 ? '#ff7d00' : record.status == 2 ? '#ff7d00' : record.status == 3 ? '#165dff' : '#86909c'">
                                    {{ useEnumsFormat('trs.settlement.dividend.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umxj12u99k0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs(record.record_date).format('YYYY-MM-DD') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('stock.stock.5umxj12u9bs0')" :width="120">
                            <template #cell="{ record }">
                                <div style="color:var(--color-text-3)" v-if="record.status != 4">
                                    {{$t('stock.stock.5umxj12u9do0')}}
                                </div>
                                <div v-else>
                                    <div>{{ dayjs(record.deal_time * 1000).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs(record.deal_time * 1000).format('HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('stock.stock.5umxj12u9g00')" :width="120"
                            v-if="$permission(['trsSettlementStockTask'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsSettlementStockTask', query: { id: record.id } })">{{$t('stock.stock.5umxj12u9i80')}}</a-link>
                                </a-space>
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
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
        market: '',
        status: '',
        record_date: [],
        payment_date: [],
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
    const { code, data } = await apiTrs.trsSymbolSplitList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            status: searchInfo.data.status !== '' ? searchInfo.data.status : null
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