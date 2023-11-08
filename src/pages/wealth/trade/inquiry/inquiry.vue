<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('inquiry.inquiry.5um88onmdx00')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('inquiry.inquiry.5um88onmerw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('inquiry.inquiry.5um88onmezw0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('inquiry.inquiry.5um88onmf4k0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="asset_account" :label="$t('inquiry.inquiry.5um88onmf8c0')">
                                <a-input v-model="searchInfo.data.asset_account" :placeholder="$t('inquiry.inquiry.5um88onmerw0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="options_product_id" :label="$t('inquiry.inquiry.5um88onmfd40')">
                                <a-select allow-clear v-model="searchInfo.data.options_product_id" :placeholder="$t('inquiry.inquiry.5um88onmf4k0')">
                                    <a-option v-for="item in productAllEnum.product" :value="item.id">{{
                                        item.product_name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="quote" :label="$t('inquiry.inquiry.5um88onmfhc0')">
                                <a-range-picker v-model="searchInfo.data.quote" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="period" :label="$t('inquiry.inquiry.5um88onmflg0')">
                                <a-select allow-clear v-model="searchInfo.data.period" :placeholder="$t('inquiry.inquiry.5um88onmf4k0')">
                                    <a-option v-for="item in productAllEnum.period" :value="item.value">{{
                                        item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('inquiry.inquiry.5um88onmfsg0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('inquiry.inquiry.5um88onmf4k0')">
                                    <a-option v-for="item in useEnums('wealth.transaction.inquiryRecord.status')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="create_time" :label="$t('inquiry.inquiry.5um88onmfwo0')">
                                <a-range-picker v-model="searchInfo.data.create_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('inquiry.inquiry.5um88onmg2w0') : $t('inquiry.inquiry.5um88onmg7c0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('inquiry.inquiry.5um88onmgb40')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('inquiry.inquiry.5um88onmgfk0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button v-permission="['wealthTradeInquiryCreate']"
                        @click="router.push({ name: 'wealthTradeInquiryCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('inquiry.inquiry.5um88onmgj80')}}
                    </a-button>
                    <a-button @click="download()" :loading="tableData.loading"
                        v-if="$permission(['wealthTradeInquiryExport'])">
                        <template #icon>
                            <icon-to-bottom />
                        </template>
                        {{$t('inquiry.inquiry.5um88onmhe40')}}
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
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmhlo0')" :width="200">
                            <template #cell="{ record }">
                                <a-tag class="wordWrap" color="arcoblue">{{ record?.security_info?.name }} {{ record.symbol }}.{{
                                    record.market ?
                                    useEnumsFormat('market.market', record.market) : '' }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmf8c0')" data-index="asset_account_info.account" :width="local.lang=='en'?140:120"></a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmfd40')" :ellipsis="true" :tooltip="true"
                            data-index="options_product_info.product_name" :width="130"></a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmezw0')" data-index="currency" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('inquiry.inquiry.5um88onmhps0') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmhtg0')" data-index="nominal_principal" 
                            :width="150"></a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmflg0')" :width="100">
                            <template #cell="{ record }">
                                {{ record.period }}{{ $t('inquiry.inquiry.5um88onmhzs0') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmi540')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('inquiry.inquiry.5um88onmi8k0')" position="right">
                                    <template #content>
                                        <p style="margin:0" v-for="item in record.framework_params">{{ item.params_name }}:
                                            {{ item.name }}</p>
                                    </template>
                                    <a-link>{{$t('inquiry.inquiry.5um88onmic80')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmih00')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('wealth.transaction.inquiryRecord.status', record.status) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmikg0')" data-index="inquiry_no"
                            :width="180"></a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmfwo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('inquiry.inquiry.5um88onmfhc0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.quote_time ? dayjs.unix(record.quote_time).format('YYYY-MM-DD') : $t('inquiry.inquiry.5um88onmio40') }}
                                </div>
                                <div>{{ record.quote_time ? dayjs.unix(record.quote_time).format('HH:mm:ss') : '' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('inquiry.inquiry.5um88onmiy80')" v-if="$permission(['wealthTradeInquiryDetail'])"
                            :width="80">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['wealthTradeInquiryDetail']"
                                        @click="router.push({ name: 'wealthTradeInquiryDetail', params: { id: record.id } })">{{$t('inquiry.inquiry.5um88onmj840')}}</a-link>
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
import { useI18n } from "vue-i18n";
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
        period: '',
        status: '',
        quote: [],
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
const getData = async () => {
    tableData.loading = true
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    const { code, data } = await apiWealth.apiWealthInquiryList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    if (data.list?.length) {
        data.list.forEach((arr: any) => {
            arr.nominal_principal = Number(arr.nominal_principal).toFixed(2)
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
    let strTitle = `#,询价标的,资金账户号,产品类型,币种,名义本金,期限,结构,询价状态,询价单号,询价时间,报价时间\n`
    let name = t('inquiry.inquiry.5um88onmjf40')
    searchInfo.data.page = 1
    searchInfo.data.per_page = 20
    let list = []
    let param: any = { ...searchInfo.data }
    tableData.loading = true
    let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
    for (let i = 1; i <= pageNum; i++) {
        param.page = i
        const { data } = await apiWealth.apiWealthInquiryList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('inquiry.inquiry.5um88onmji40') });
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
    // #,,,,,,期限,结构,询价状态,询价单号,询价时间,报价时间
    list.forEach((item: any, Index: any) => {
        let biaode = `${item?.security_info.name ? item.security_info.name : ''}${item.symbol ? item.symbol : ''}${item.market ? useEnumsFormat('market.market', item.market) : ''}\t,`
        let frameworkParams = structureData(item, 'framework_params', '1').replace(',', '，')
        let quoteTime = item.quote_time ? dayjs.unix(item.quote_time).format('YYYY-MM-DD HH:mm:ss') : t('inquiry.inquiry.5um88onmio40')
        let status = useEnumsFormat('wealth.transaction.inquiryRecord.status', item.status)
        let createTime = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD') : '--'
        str += `${Index + 1}\t,`  // index
        str += biaode  //询价标的
        str += `${item?.asset_account_info.account}\t,` // 资金账户号
        str += `${item?.options_product_info.product_name}\t,` // 产品类型
        str += `${item?.currency}\t,` // 币种
        str += `${item?.nominal_principal}\t,` // 名义本金
        str += `${item.period ? item.period + '个月' : '--'}\t,` //期限
        str += `${frameworkParams}\t,` //结构
        str += `${status}\t,` //询价状态
        str += `${item.inquiry_no ? item.inquiry_no : '--'}\t,` //询价单号
        str += `${createTime}\t,` //询价时间
        str += `${quoteTime}\t,` //报价时间时间
        str += '\n'
    })
    return str
}
// 导出
// const Export = async() =>{
//     // let param:any = {...searchInfo.data}
//     // Object.keys(param).forEach((item: any) => {
//     //     if (!param[item] && param[item] != '0') {
//     //         delete param[item];
//     //     }
//     // })
//     // const { code, data } = await apiWealth.apiWealthInquiryExport({
//     //     ...useFilter(param)
//     // })
//     // if (code != 1) return;
// 所有产品类型
const productAllEnum: any = reactive({})
const getWealthOptionsProductAll = async () => {
    const { code, data } = await apiWealth.apiWealthOptionsProductAll({})
    if (code != 1) return;
    productAllEnum.product = data.list
    let arr: any = []
    data.list.forEach((item: any) => {
        if (item.period) {
            arr.push(...item.period.split(','))
        }
    })
    arr = [...new Set(arr)]
    arr.sort(function (x: any, y: any) {
        return x - y;
    });
    productAllEnum.period = []
    arr.forEach((item: any) => {
        productAllEnum.period.push({ value: item, name: item + t('inquiry.inquiry.5um88onmhzs0') })
    })
}
{
    getData()
    getWealthOptionsProductAll()
}
</script>