<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('order.order.5umc4r7033g0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('order.order.5um838uug040')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('order.order.5umc4r704is0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('order.order.5umc4r704nc0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trs_account" :label="`TRS${ $t('order.order.5umc4r704s00') }`">
                                <a-input v-model="searchInfo.data.trs_account" :placeholder="$t('order.order.5um838uug040')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="direction" :label="$t('order.order.5umc4r704vo0')">
                                <a-select allow-clear v-model="searchInfo.data.direction" :placeholder="$t('order.order.5umc4r704zw0')">
                                    <a-option v-for="item in useEnums('market.order.direction')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="price_type" :label="$t('order.order.5umc4r7052o0')">
                                <a-select allow-clear v-model="searchInfo.data.price_type" :placeholder="$t('order.order.5umc4r7056g0')">
                                    <a-option v-for="item in useEnums('market.order.price_type')" :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('order.order.5umc4r7059k0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('order.order.5umc4r705cs0')">
                                    <a-option v-for="item in useEnums('market.order.status')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_account_id" :label="$t('order.order.5umc4r705mw0')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_account_id"
                                    :placeholder="$t('order.order.5umc4r705r40')">
                                    <a-option v-for="item in (tableData.counterChannelAccount as any)" :value="item.id">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_scene" :label="$t('order.order.5umc4r705vg0')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_scene" :placeholder="$t('order.order.5umc4r705yw0')">
                                    <a-option v-for="item in useEnums('market.order.counter_channel_scene')"
                                        :value="item.value">
                                        {{ item.trans[local.lang] }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="up_order_no" :label="$t('order.order.5umc4r7062g0')">
                                <a-input v-model="searchInfo.data.up_order_no" :placeholder="$t('order.order.5um838uug040')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="trade_time" :label="$t('order.order.5umc4r706580')">
                                <a-range-picker v-model="searchInfo.data.trade_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('order.order.5um838uugis0') : $t('order.order.5um838uugms0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('order.order.5um838uugqo0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('order.order.5um838uuguo0')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-if="$permission(['trsTradeOrderDownload', 'trsTradeOrderCreate'])">

                    <a-button v-permission="['trsTradeOrderCreate']" @click="router.push({ name: 'trsTradeOrderCreate' })"
                        type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('order.order.5umc4r7068g0')}}
                    </a-button>
                    <a-button v-if="$permission(['trsTradeOrderDownload'])" @click="download()"
                        :loading="tableData.loading">
                        <template #icon>
                            <icon-to-bottom />
                        </template>
                        {{$t('order.order.5umc4r706b40')}}
                    </a-button>
                </a-space>
            </div>
            <div class="tableBox">
                <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
                    :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                    :data="tableData.list" class="table" :expandable="{ title: '', width: 50 }" row-key="id">
                    <template #expand-icon="{ expanded }">
                        <IconUp v-if="expanded" />
                        <IconDown v-else />
                    </template>
                    <template #columns>
                        <a-table-column title="#" :width="50">
                            <template #cell="{ rowIndex }">
                                {{ rowIndex + 1 }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r706dw0')" data-index="real_name" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record?.security_info?.name }}</div>
                                <div style="font-size: 12px;color: #b8c2cc;">{{ record?.market }} {{ record?.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="`TRS${ $t('order.order.5umc4r704s00') }`" data-index="trs_account_info.account" :width="120" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r706j40')" data-index="trs_account_info.currency" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.trs_account_info?.currency || $t('order.order.5umc4r706og0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r704vo0')" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('market.order.direction', record.direction) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r705mw0')" :width="160">
                            <template #cell="{ record }">
                                <div v-if="record.order_item_list?.length > 1">
                                    {{$t('order.order.5umc4r706r00')}}
                                </div>
                                <div v-else>
                                    <div>{{ record.order_item_list?.[0]?.counter_channel_account_info?.name }}</div>
                                    <div>{{ record.order_item_list?.[0]?.counter_channel_info?.name }} {{
                                        useEnumsFormat('market.order.counter_channel_scene',
                                            record?.order_item_list?.[0]?.counter_channel_scene)
                                    }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r706uo0')" :width="local.lang == 'en'?250:150">
                            <template #cell="{ record }">
                                <div>{{$t('order.order.5umc5zjwjbc0')}}：{{ record?.trade_price }}</div>
                                <div>{{$t('order.order.5umc5zjwk7o0')}}：{{ record?.trade_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r706yc0')" :width="local.lang == 'en'?200:150">
                            <template #cell="{ record }">
                                <div>{{$t('order.order.5umc5zjwkbw0')}}：{{ record?.deal_price }}</div>
                                <div>{{$t('order.order.5umc5zjwke40')}}：{{ record?.deal_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r7052o0')" :width="local.lang =='en'?120:100">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('market.order.price_type', record.price_type) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r7059k0')" :width="local.lang =='en'?150:100">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('market.order.status', record.status) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r707240')" :width="100">
                            <template #cell="{ record }">
                                <div v-if="[0, 1, 3, 5].includes(record.status)">{{ record.trade_fare }}</div>
                                <div v-else>{{ record.deal_fare }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r7074o0')" :width="local.lang == 'en'?200:120">
                            <template #cell="{ record }">
                                <div v-if="record.settlement_status == 2">{{$t('order.order.5umc4r707980')}}</div>
                                <div v-else-if="record.settlement_status == 1">
                                    <div>{{$t('order.order.5umc5zjwkhc0')}}：{{ Number(record.trade_exchange_rate) }}</div>
                                    <div>{{$t('order.order.5umc5zjwkks0')}}：{{ Number(record.settlement_exchange_rate) }}</div>
                                </div>
                                <div v-else>
                                    <div>{{$t('order.order.5umc5zjwkhc0')}}：{{ Number(record.trade_exchange_rate) }}</div>
                                    <div>{{$t('order.order.5umc4r707bs0')}}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r7062g0')" :width="local.lang == 'en'?150:120">
                            <template #cell="{ record }">
                                <div v-if="record.order_item_list?.length > 1">-</div>
                                <div v-else>{{ record.order_item_list?.[0]?.up_order_no || '-' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umc4r706580')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.trade_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.trade_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('order.order.5um838uuhbk0')" :width="80" v-if="$permission(['trsTradeOrderDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'trsTradeOrderDetail', params: { id: record.id } })">{{$t('order.order.5um838uuhfk0')}}</a-link>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                    <template #expand-row="{ record }">
                        <a-table :bordered="false" :pagination="false" size="small" :data="record.order_item_list"
                            class="table">
                            <template #columns>
                                <a-table-column :title="$t('order.order.5umc4r705mw0')" :width="150">
                                    <template #cell="{ record }">
                                        <div>{{ record?.counter_channel_account_info?.name }}</div>
                                        <div>{{ record?.counter_channel_info?.name }} {{
                                            useEnumsFormat('market.order.counter_channel_scene',
                                                record?.counter_channel_scene)
                                        }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r706uo0')" :width="150">
                                    <template #cell="{ record }">
                                        <div>{{$t('order.order.5umc5zjwjbc0')}}：{{ record?.trade_price }}</div>
                                        <div>{{$t('order.order.5umc5zjwk7o0')}}：{{ record?.trade_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r706yc0')" :width="150">
                                    <template #cell="{ record }">
                                        <div>{{$t('order.order.5umc5zjwkbw0')}}：{{ record?.deal_price }}</div>
                                        <div>{{$t('order.order.5umc5zjwke40')}}：{{ record?.deal_num }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r7059k0')" :width="100">
                                    <template #cell="{ record }">
                                        <div>{{ useEnumsFormat('market.order.status', record.status) }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r7074o0')" :width="120">
                                    <template #cell="{ record }">
                                        <div v-if="record.settlement_status == 2">{{$t('order.order.5umc4r707980')}}</div>
                                        <div v-else-if="record.settlement_status == 1">
                                            <div>{{$t('order.order.5umc5zjwkhc0')}}：{{ Number(record.trade_exchange_rate).toFixed(4) }}</div>
                                            <div>{{$t('order.order.5umc5zjwkks0')}}：{{ Number(record.settlement_exchange_rate).toFixed(4) }}</div>
                                        </div>
                                        <div v-else>
                                            <div>{{$t('order.order.5umc5zjwkhc0')}}：{{ Number(record.trade_exchange_rate) }}</div>
                                            <div>{{$t('order.order.5umc4r707bs0')}}</div>
                                        </div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r7062g0')" :width="120">
                                    <template #cell="{ record }">
                                        <div>{{ record?.up_order_no || '-' }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r706580')" :width="120">
                                    <template #cell="{ record }">
                                        <div>{{ dayjs.unix(record.trade_time).format('YYYY-MM-DD') }}</div>
                                        <div>{{ dayjs.unix(record.trade_time).format('HH:mm:ss') }}</div>
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('order.order.5umc4r707f40')" :width="120">
                                    <template #cell="{ record }">
                                        <div v-if="!record.deal_time">-</div>
                                        <div v-else>
                                            <div>{{ dayjs.unix(record.deal_time).format('YYYY-MM-DD') }}</div>
                                            <div>{{ dayjs.unix(record.deal_time).format('HH:mm:ss') }}</div>
                                        </div>
                                    </template>
                                </a-table-column>
                                <a-table-column fixed="right" :title="$t('order.order.5um838uuhbk0')" :width="80"
                                    v-if="$permission(['trsTradeChannelOrderDetail'])">
                                    <template #cell="{ record }">
                                        <a-space>
                                            <a-link
                                                @click="router.push({ name: 'trsTradeChannelOrderDetail', params: { id: record.id } })">{{$t('order.order.5um838uuhfk0')}}</a-link>
                                        </a-space>
                                    </template>
                                </a-table-column>
                            </template>
                        </a-table>
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
        trs_account: '',
        direction: '',
        trade_type: '',
        price_type: '',
        status: '',
        trade_time: [],
        counter_channel_account_id: '',
        counter_channel_scene: '',
        up_order_no: '',
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    counterChannelAccount: [],
    count: 0,
    message: [],
    loading: false
})
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.orderList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            status: searchInfo.data.status !== '' ? searchInfo.data.status : null,
        })
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const getCounterChannelAccountAll = async () => {
    const { code, data } = await apiTrs.counterChannelAccountAll()
    if (code != 1) return;
    tableData.counterChannelAccount = data?.length ? data : []
}
// 导出
const download = async () => {
    // let strTitle = `#,股票代码/Stock code,股票名称/Stock Name,方向/Direction,订单类型/Order Type,委托价/Commission Price,委托量/Entrusted Quantity,委托时间/Entrustment Time,到期类型/Expiration Type,成交价/Transaction Price,成交量/Turnover,成交时间/Transaction Time,成交金额/Transaction Amount,订单状态/Status,交易费用/Transaction Cost,订单来源/Order Source\n`
    let strTitle = `#,股票代码,股票名称,方向,订单类型,委托价,委托量,委托时间,到期类型,成交价,成交量,成交时间,成交金额,订单状态,交易费用,订单来源\n`
    let name = 'trade-order-' + dayjs(new Date()).format('YYYY-MM-DD')
    searchInfo.data.page = 1
    searchInfo.data.per_page = 20
    let list = []
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
    for (let i = 1; i <= pageNum; i++) {
        param.page = i
        const { data } = await apiTrs.orderList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('order.order.5umc4r707ik0') });
    let downloadList = listValue(strTitle, list)
    downloadExcel(downloadList, name)
    searchInfo.data.page = 1
    searchInfo.data.per_page = 20
}
const listValue = (strTitle: any, list: any) => {
    //定义表头
    if (!list.length) {
        return
    }
    let str = strTitle
    list.forEach((item: any, Index: any) => {
        let trade_time = item.trade_time ? dayjs.unix(item.trade_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let deal_time = item.deal_time ? dayjs.unix(item.deal_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let direction = useEnumsFormat('market.order.direction', item.direction)
        let price_type = useEnumsFormat('market.order.price_type', item.price_type)
        let expire_type = useEnumsFormat('market.order.expire_type', item.expire_type)
        let status = useEnumsFormat('market.order.status', item.status)
        let create_type = useEnumsFormat('market.order.create_type', item.create_type)
        let fare = [0, 1, 3, 5].includes(item.status) ? item.trade_fare : item.deal_fare
        let dealAoumt = (Number(item?.deal_num) * Number(item?.deal_price)).toFixed(4)
        str += `${Index + 1}\t,`  // index
        str += `${item?.symbol}\t,`  //股票代码
        str += `${item?.security_info?.name}\t,`  // 股票名称
        str += `${direction}\t,` // 方向
        str += `${price_type}\t,` // 订单类型
        str += `${item?.trade_price + ' ' + item?.trade_currency}\t,` // 委托价
        str += `${item?.trade_num}\t,` // 委托量
        str += `${trade_time}\t,` // 委托时间
        str += `${expire_type}\t,` // 到期类型
        str += `${item?.deal_price + ' ' + item?.trade_currency}\t,` // 成交价
        str += `${item?.deal_num}\t,` // 成交量
        str += `${deal_time}\t,` // 成交时间
        str += `${dealAoumt + ' ' + item?.trade_currency}\t,` // 成交金额
        str += `${status}\t,` // 订单状态
        str += `${fare + ' ' + item?.trade_currency}\t,` // 交易费用
        str += `${create_type}\t,` // 订单来源



        str += '\n'
    })
    return str
}
{
    getData()
    getCounterChannelAccountAll()
}
</script>