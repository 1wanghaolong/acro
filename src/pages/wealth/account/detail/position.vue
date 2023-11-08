<template>
    <div>
        <a-card :loading="tableData.loading" style="margin-top: 20px;">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('detail.position.5umyk84n27s0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('detail.position.5umyk84n34k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('detail.position.5umyk84n3fk0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('detail.position.5umyk84n3nw0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('detail.position.5umyk84n3wk0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('detail.position.5umyk84n34k0')" />
                            </a-form-item>
                        </a-col> -->
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="options_product_id" :label="$t('detail.position.5umyk84n43s0')">
                                <a-select allow-clear v-model="searchInfo.data.options_product_id" :placeholder="$t('detail.position.5umyk84n3nw0')">
                                    <a-option v-for="item in productAllEnum.product" :value="item.id">{{
                                        item.product_name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('detail.position.5umyk84n49s0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="order_no" :label="$t('detail.position.5umyk84n4is0')">
                                <a-input v-model="searchInfo.data.order_no" :placeholder="$t('detail.position.5umyk84n34k0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('detail.position.5umyk84n4pc0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('detail.position.5umyk84n3nw0')">
                                    <a-option v-for="item in useEnums('wealth.transaction.optionPosition.status')"
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
                        {{ searchInfo.show ? $t('detail.position.5umyk84n4yo0') : $t('detail.position.5umyk84n54c0') }}
                    </a-button>
                    <a-button @click="resetField">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('detail.position.5umyk84n5c40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('detail.position.5umyk84n5j80')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['wealthTradePositionCreateAccout']"
                        @click="router.push({ name: 'wealthTradePositionCreate', query: { account: searchInfo.data.asset_account } })"
                        type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('detail.position.5umyk84n5o40')}}
                    </a-button>
                    <a-button @click="download()" :loading="tableData.loading"
                        v-if="$permission(['wealthTradePositionExport'])">
                        <template #icon>
                            <icon-to-bottom />
                        </template>
                        {{$t('detail.position.5umyk84n5sg0')}}
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
                        <a-table-column :title="$t('detail.position.5umyk84n5ww0')" :width="200">
                            <template #cell="{ record }">
                                <a-tag class="wordWrap" color="arcoblue">{{ record?.security_info?.name }} {{ record.symbol }}.{{
                                    record.market ?
                                    useEnumsFormat('market.market', record.market) : '' }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n3wk0')" data-index="asset_account" :width="local.lang=='en'?140:120" ></a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n43s0')" :ellipsis="true" :tooltip="true"
                            data-index="options_product_info.product_name" :width="130"></a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n3fk0')" data-index="currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('detail.position.5umyk84n61s0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n66s0')" data-index="nominal_principal" 
                            :width="150"></a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n6ck0')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('detail.position.5umyk84n6jo0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.framework_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('detail.position.5umyk84n6q80')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n6v40')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('detail.position.5umyk84n6jo0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.quote_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('detail.position.5umyk84n6q80')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>

                        <a-table-column :title="$t('detail.position.5umyk84n6zo0')" data-index="net_profit" :width="local.lang=='en'?220:190">
                            <template #cell="{ record }">
                                <template v-if="record.status != 2">
                                    <a-tag color="gray">{{ $t('detail.position.5umyk84n73k0') }}</a-tag>
                                </template>
                                <template v-else>
                                    <span><a-tag style="margin-bottom:5px;margin-right:5px" color="arcoblue">{{$t('detail.position.5umyk84n77c0')}}</a-tag>
                                        <span
                                            :style="{ 'color': record.net_profit > 0 ? '#eb5350' : record.net_profit < 0 ? '#3ab265' : '#999' }">{{ record.net_profit > 0 ? '+' : '' }}{{
                                                record.net_profit }}</span></span>
                                    <br>
                                    <span><a-tag style="margin-right:5px" color="arcoblue">{{$t('detail.position.5umyk84n7b00')}}</a-tag>
                                        <span
                                            :style="{ 'color': record.net_profit_rate > 0 ? '#eb5350' : record.net_profit_rate < 0 ? '#3ab265' : '#999' }">{{ record.net_profit_rate > 0 ? '+' : '' }}{{
                                                record.net_profit_rate }}%</span></span>
                                </template>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n7fw0')" data-index="order_no" :ellipsis="true" :tooltip="true" :width="180">
                            <template #cell="{ record }">
                                {{ record.order_no ? record.order_no : '--' }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n7k80')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.start_time ? dayjs.unix(record.start_time).format('YYYY-MM-DD') : '--' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n7qk0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.end_time ? dayjs.unix(record.end_time).format('YYYY-MM-DD') : '--' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('detail.position.5umyk84n4pc0')" :width="100">
                            <template #cell="{ record }">
                                <a-tag size="small"
                                    :color="record.status == 2 ? '#00b42a' : record.status == 1 ? '#86909c' : '#ffb400'">
                                    {{ useEnumsFormat('wealth.transaction.optionPosition.status', record.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('detail.position.5umyk84n7vk0')" v-if="$permission(['wealthTradePositionDetailAccout'])"
                            :width="100">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['wealthTradePositionDetailAccout']"
                                        @click="router.push({ name: 'wealthTradePositionDetail', params: { id: record.id } })">{{$t('detail.position.5umyk84n80c0')}}</a-link>
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
// const props = defineProps({
//     account:String
// })
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
        currency: '',
        asset_account: sessionStorage.getItem('account') || '',
        options_product_id: '',
        status: '',
        order_no: '',
        create_time: [],
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
const resetField = () => {
    searchInfo.data = {
        symbol: '',
        currency: '',
        asset_account: sessionStorage.getItem('account') || '',
        options_product_id: '',
        status: '',
        order_no: '',
        create_time: [],
        page: 1,
        per_page: 20
    }
    searchFormRef.value?.resetFields()
    getData()
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
    let strTitle = `#,标的,资金账户号,产品类型,币种,名义本金,结构,费用,合约收益,关联单号,开始时间,结束时间,状态\n`
    let name = t('detail.position.5umyk84n8bo0')
    searchInfo.data.page = 1
    searchInfo.data.per_page = 20
    let list = []
    let param: any = { ...searchInfo.data }
    tableData.loading = true
    let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
    for (let i = 1; i <= pageNum; i++) {
        param.page = i
        const { data } = await apiWealth.apiWealthPositionList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('detail.position.5umyk84n8h40') });
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
        let biaode = `${item?.security_info.name ? item.security_info.name : ''}${item.symbol ? item.symbol : ''}${item.market ? useEnumsFormat('market.market', item.market) : ''}\t,`
        let frameworkParams = structureData(item, 'framework_params', '1').replace(',', '，')
        let quoteParams = structureData(item, 'quote_params', '1').replace(',', '，')
        let status = useEnumsFormat('wealth.transaction.optionPosition.status', item.status)
        let startTime = item.start_time ? dayjs.unix(item.start_time).format('YYYY-MM-DD') : '--'
        let endTime = item.end_time ? dayjs.unix(item.end_time).format('YYYY-MM-DD') : '--'
        let netProfit = item.status != 2 ? t('detail.position.5umyk84n73k0') : `净收益:${item.net_profit > 0 ? '+' + item.net_profit : item.net_profit}，净收益率:${item.net_profit_rate > 0 ? '+' + item.net_profit_rate : item.net_profit_rate}`
        str += `${Index + 1}\t,`  // index
        str += biaode  //标的
        str += `${item?.asset_account}\t,` // 资金账户号
        str += `${item?.options_product_info.product_name}\t,` // 产品类型
        str += `${item?.currency}\t,` // 币种
        str += `${item?.nominal_principal}\t,` // 名义本金
        str += `${frameworkParams}\t,` //结构
        str += `${quoteParams}\t,` //费用
        str += `${netProfit}\t,` //合约收益
        str += `${item.order_no ? item.order_no : '--'}\t,` //关联单号
        str += `${startTime}\t,` //开始时间
        str += `${endTime}\t,` //结束时间
        str += `${status}\t,` //状态
        str += '\n'
    })
    return str
}
// 导出
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
// const Export = () =>{
//     // downloadExcel('admin.v2/wealth/options/product/quote/export',{...useFilter(searchInfo.data)})
// }
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