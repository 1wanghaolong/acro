<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('contract.contract.5um850qvlu00')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('contract.contract.5um850qvmvc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('contract.contract.5um850qvn240')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('contract.contract.5um850qvn600')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('contract.contract.5um850qvn9w0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('contract.contract.5um850qvmvc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="options_product_id" :label="$t('contract.contract.5um850qvnfg0')">
                                <a-select allow-clear v-model="searchInfo.data.options_product_id" :placeholder="$t('contract.contract.5um850qvn600')">
                                    <a-option v-for="item in productAllEnum.product" :value="item.id">{{
                                        item.product_name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>

                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="order_no" :label="$t('contract.contract.5um850qvnk80')">
                                <a-input v-model="searchInfo.data.order_no" :placeholder="$t('contract.contract.5um850qvmvc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="settlement" :label="$t('contract.contract.5um850qvnmk0')">
                                <a-range-picker v-model="searchInfo.data.settlement" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('contract.contract.5um850qvnp00') : $t('contract.contract.5um850qvntg0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('contract.contract.5um850qvny80')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('contract.contract.5um850qvo300')}}
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
                        <!-- <a-table-column title="标的" :width="200">
                            <template #cell="{ record }">
                                <a-tag color="arcoblue">{{ record?.security_info?.name }} {{ record.symbol }}.{{ record.market ?
                                    useEnumsFormat('market.market', record.market) : '' }}</a-tag>
                            </template>
                        </a-table-column> -->
                        <a-table-column :title="$t('contract.contract.5um850qvo5s0')" data-index="order_no" :width="180" >
                            <template #cell="{ record }">
                                {{ record.order_no ? record.order_no : '--' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvn9w0')" data-index="asset_account" :width="120" ></a-table-column>
                        <!-- <a-table-column title="产品类型" data-index="options_product_info.product_name"
                            :width="120"></a-table-column> -->
                        <a-table-column :title="$t('contract.contract.5um850qvn240')" data-index="currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('contract.contract.5um850qvoak0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvofk0')" data-index="nominal_principal" :ellipsis="true" :tooltip="true"
                            :width="150"></a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvoj80')" :width="90">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('contract.contract.5um850qvols0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.framework_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('contract.contract.5um850qvoq40')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('contract.contract.5um850qvouo0')" :width="90">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('contract.contract.5um850qvols0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.quote_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('contract.contract.5um850qvoq40')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('contract.contract.5um850qvp0c0')" data-index="net_profit" :width="210">
                            <template #cell="{ record }">
                                <span><a-tag style="margin-bottom:5px;margin-right:5px" color="arcoblue">{{$t('contract.contract.5um850qvp480')}}</a-tag>
                                    <span
                                        :style="{ 'color': record.net_profit > 0 ? '#eb5350' : record.net_profit < 0 ? '#3ab265' : '#999' }">{{ record.net_profit > 0 ? '+' : '' }}{{
                                            record.net_profit }}</span></span>
                                <br>
                                <span><a-tag style="margin-right:5px" color="arcoblue">{{$t('contract.contract.5um850qvp680')}}</a-tag>
                                    <span
                                        :style="{ 'color': record.net_profit_rate > 0 ? '#eb5350' : record.net_profit_rate < 0 ? '#3ab265' : '#999' }">{{ record.net_profit_rate > 0 ? '+' : '' }}{{
                                            record.net_profit_rate }}%</span></span>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('contract.contract.5um850qvnmk0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.settlement_time ? dayjs.unix(record.settlement_time).format('YYYY-MM-DD') : '--'
                                }}</div>
                                <div>{{ record.settlement_time ? dayjs.unix(record.settlement_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['wealthTradePositionDetailContract'])" fixed="right" :title="$t('contract.contract.5um850qvp8g0')"
                            :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['wealthTradePositionDetailContract']"
                                        @click="router.push({ name: 'wealthTradePositionDetail', params: { id: record.id } })">{{$t('contract.contract.5um850qvpao0')}}</a-link>
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
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
        currency: '',
        asset_account: '',
        options_product_id: '',
        status: '2',
        order_no: '',
        settlement: [],
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
    const { code, data } = await apiWealth.apiWealthPositionList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    if (data.list?.length) {
        data.list.forEach((arr: any) => {
            arr.nominal_principal = Number(arr.nominal_principal).toFixed(2)
            arr.net_profit_rate = Number(arr.net_profit_rate).toFixed(2)
            arr.net_profit = Number(arr.net_profit).toFixed(2)
            if (arr.framework_params?.length) {
                arr.framework_params.forEach((item: any) => {
                    if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
                        item.name = item.params_content + '%'
                    } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
                        let arr: any = []
                        item.params_content.forEach((items: any) => {
                            arr.push(items?.text[local.lang])
                        })
                        item.name = arr.join(',')
                    } else {
                        item.name = item.params_content
                    }
                })
            }
            if (arr.quote_params?.length) {
                arr.quote_params.forEach((item: any) => {
                    if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
                        item.name = item.params_content + '%'
                    } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
                        let arr: any = []
                        item.params_content.forEach((items: any) => {
                            arr.push(items?.text[local.lang])
                        })
                        item.name = arr.join(',')
                    } else {
                        item.name = item.params_content
                    }
                })
            }
        })
    }
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 所有产品类型
const productAllEnum: any = reactive({
    product: []
})
const getWealthOptionsProductAll = async () => {
    const { code, data } = await apiWealth.apiWealthOptionsProductAll({})
    if (code != 1) return;
    productAllEnum.product = data.list
}
{
    getData()
    getWealthOptionsProductAll()
}
</script>