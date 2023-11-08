<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('order.order.5umbs905u7w0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('order.order.5umbs905vgc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('order.order.5umbs905vp80')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('order.order.5umbs905vvw0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('order.order.5umbs905w640')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('order.order.5umbs905vgc0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="options_product_id" :label="$t('order.order.5umbs905wc40')">
                                <a-select allow-clear v-model="searchInfo.data.options_product_id" :placeholder="$t('order.order.5umbs905vvw0')">
                                    <a-option v-for="item in productAllEnum.product" :value="item.id">{{
                                        item.product_name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="order_no" :label="$t('order.order.5umbs905whc0')">
                                <a-input v-model="searchInfo.data.order_no" :placeholder="$t('order.order.5umbs905vgc0')" />
                            </a-form-item>
                        </a-col>


                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('order.order.5umbs905wmo0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('order.order.5umbs905vvw0')">
                                    <a-option v-for="item in useEnums('wealth.transaction.transactionRecords.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('order.order.5umbs905wsc0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="finish" :label="$t('order.order.5umbs905wy80')">
                                <a-range-picker v-model="searchInfo.data.finish" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('order.order.5umbs905x440') : $t('order.order.5umbs905xa00') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('order.order.5umbs905xh00')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('order.order.5umbs905xmc0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['wealthTradeOrderCreate']"
                        @click="router.push({ name: 'wealthTradeOrderCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('order.order.5umbs905xsc0')}}
                    </a-button>
                    <a-button @click="download()" :loading="tableData.loading"
                        v-if="$permission(['wealthTradeOrderExport'])">
                        <template #icon>
                            <icon-to-bottom />
                        </template>
                        {{$t('order.order.5umbs905xy40')}}
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
                        <a-table-column :title="$t('order.order.5umbs905y400')" :width="200">
                            <template #cell="{ record }">
                                <a-tag class="wordWrap" color="arcoblue">{{ record?.security_info?.name }} {{ record.symbol }}.{{
                                    record.market ?
                                    useEnumsFormat('market.market', record.market) : '' }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905w640')" data-index="asset_account_info.account" :width="local.lang=='en'?140:120"></a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905wc40')" :ellipsis="true" :tooltip="true"
                            data-index="options_product_info.product_name" :width="130"></a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905vp80')" data-index="currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('order.order.5umbs905yak0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905yg00')" data-index="nominal_principal" 
                            :width="150"></a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905wmo0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('wealth.transaction.transactionRecords.status', record.status) }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905ym40')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('order.order.5umbs905ytc0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.framework_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('order.order.5umbs905yy40')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905z500')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('order.order.5umbs905ytc0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.quote_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('order.order.5umbs905yy40')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905z9g0')" data-index="cost_price" :width="180">
                            <template #cell="{ record }">
                                {{ record.cost_price }} {{ record.currency }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905wsc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('order.order.5umbs905wy80')" :width="120">
                            <template #cell="{ record }">
                                <template v-if="record.finish_time">
                                    <div>{{ record.finish_time ? dayjs.unix(record.finish_time).format('YYYY-MM-DD') : '-'
                                    }}
                                    </div>
                                    <div>{{ record.finish_time ? dayjs.unix(record.finish_time).format('HH:mm:ss') : '' }}
                                    </div>
                                </template>
                                <template v-else>
                                    {{ useEnumsFormat('wealth.transaction.transactionRecords.status', record.status) }}
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('order.order.5umbs905ze80')" :width="80" v-if="$permission(['wealthTradeOrderDetail'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['wealthTradeOrderDetail']"
                                        @click="router.push({ name: 'wealthTradeOrderDetail', params: { id: record.id } })">{{$t('order.order.5umbs905zj80')}}</a-link>
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
const { t } = useI18n();
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
        status: '',
        finish: [],
        create_time: [],
        order_no: '',
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
    const { code, data } = await apiWealth.apiWealthOrderList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    if (data.list?.length) {
        data.list.forEach((arr: any) => {
            arr.nominal_principal = Number(arr.nominal_principal).toFixed(2)
            arr.cost_price = arr.cost_price ? Number(arr.cost_price).toFixed(2) : arr.cost_price
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
const structureData = (record: any, type: any, download?: any) => {
    if (!record[type] || !record[type].length) {
        return '1'
    }
    let val: any = []
    record[type].forEach((item: any) => {
        if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
            val.push(`${item.params_name ? item.params_name : '--'}:${item.params_content}%`)
        }
        if (item.params_type == 'radio' || item.params_type == 'checkbox') {
            let list: any = []
            if (item.params_content.length) {
                item.params_content.forEach((item: any) => {
                    list.push(item.text[local.lang])
                });
            }
            val.push(`${item.params_name ? item.params_name : '--'}:${download ? list.join('，') : list.join(',')}`)
        }
        if (item.params_type == 'number' || item.params_type == 'float' || item.params_type == 'gear_number') {
            val.push(`${item.params_name ? item.params_name : '--'}:${item.params_content}`)
        }
    })
    return download ? val.join('，') : val
}
// 导出
const download = async () => {
    let strTitle = `#,标的,资金账户号,产品类型,币种,名义本金,交易状态,结构,报价,交易成本,挂单时间,完结时间\n`
    let name = t('order.order.5umbs905zo00')
    searchInfo.data.page = 1
    searchInfo.data.per_page = 20
    let list = []
    let param: any = { ...searchInfo.data }
    tableData.loading = true
    let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
    for (let i = 1; i <= pageNum; i++) {
        param.page = i
        const { data } = await apiWealth.apiWealthOrderList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('order.order.5umbs905zsk0') });
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
    // #标的,资金账户号,产品类型,币种,名义本金,交易状态,结构,报价,交易成本,挂单时间,完结时间
    list.forEach((item: any, Index: any) => {
        let biaode = `${item?.security_info.name ? item.security_info.name : ''}${item.symbol ? item.symbol : ''}${item.market ? useEnumsFormat('market.market', item.market) : ''}\t,`
        let frameworkParams = structureData(item, 'framework_params', '1').replace(',', '，')
        let quoteParams = structureData(item, 'quote_params', '1').replace(',', '，')
        let finishTime = item.finish_time ? dayjs.unix(item.finish_time).format('YYYY-MM-DD HH:mm:ss') : useEnumsFormat('wealth.transaction.transactionRecords.status', item.status)
        let status = useEnumsFormat('wealth.transaction.transactionRecords.status', item.status)
        let createTime = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        str += `${Index + 1}\t,`  // index
        str += biaode  //标的
        str += `${item?.asset_account_info.account}\t,` // 资金账户号
        str += `${item?.options_product_info.product_name}\t,` // 产品类型
        str += `${item?.currency}\t,` // 币种
        str += `${item?.nominal_principal}\t,` // 名义本金
        str += `${status}\t,` //交易状态
        str += `${frameworkParams}\t,` //结构
        str += `${quoteParams}\t,` //报价
        str += `${item.cost_price ? item.cost_price : '--'}${item.currency ? item.currency : '--'}\t,` //交易成本
        str += `${createTime}\t,` //挂单时间
        str += `${finishTime}\t,` //完结时间
        str += '\n'
    })
    return str
}
// 导出
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