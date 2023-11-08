<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="options_product_id" :label="$t('offer.offer.5umwskilakc0')">
                                <a-select allow-clear v-model="searchInfo.data.options_product_id" :placeholder="$t('offer.offer.5umwskilcow0')">
                                    <a-option v-for="item in TypeAllData" :value="item.id">{{
                                        item.product_name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="currency" :label="$t('offer.offer.5umwskild2o0')">
                                <a-select allow-clear v-model="searchInfo.data.currency" :placeholder="$t('offer.offer.5umwskilcow0')">
                                    <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="push" :label="$t('offer.offer.5umwskildbs0')">
                                <a-range-picker v-model="searchInfo.data.push" format="YYYY-MM-DD" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('offer.offer.5umwskildlo0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('offer.offer.5umwskilcow0')">
                                    <a-option v-for="item in useEnums('wealth.product.offer.status')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('offer.offer.5umwskildvk0') : $t('offer.offer.5umwskile4k0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('offer.offer.5umwskilecg0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('offer.offer.5umwskilek80')}}
                    </a-button>
                </a-space>
                <a-space :size="18" v-permission="['wealthProductOfferCreate']">
                    <a-button @click="router.push({ name: 'wealthProductOfferCreate' })" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('offer.offer.5umwskilfh00')}}
                    </a-button>
                    <a-button @click="download()" :loading="tableData.loading"
                        v-if="$permission(['wealthProductOfferListExport'])">
                        <template #icon>
                            <icon-to-bottom />
                        </template>
                        {{$t('offer.offer.5umwskilgh80')}}
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
                        <a-table-column :title="$t('offer.offer.5umwskilgso0')" data-index="account" :width="200">
                            <template #cell="{ record }">
                                <a-tag class="wordWrap" color="arcoblue" :default-checked="true">{{ record.security_info.name ?
                                    record.security_info.name : '' }} {{
        record.symbol ? record.symbol : '' }} {{ record.market ?
        useEnumsFormat('market.market', record.market) : '' }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskilh0g0')" :width="130" data-index="options_product_info.product_name"
                            :ellipsis="true" :tooltip="true">

                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskild2o0')" :width="80">
                            <template #cell="{ record }">
                                <a-tag>{{ record?.currency || $t('offer.offer.5umwskilh980') }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskilhh40')" :width="180">
                            <template #cell="{ record }">
                                <div>{{ record.nominal_principal }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskilhmw0')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('offer.offer.5umwskilhv40')" position="right">
                                    <template #content>
                                        <div v-if="structureData(record, 'framework_params') != '1'"
                                            v-for="item in structureData(record, 'framework_params')">{{ item }}</div>
                                        <div v-else>{{ $t('offer.offer.5umwskilhv40') }}</div>
                                    </template>
                                    <a-link>{{$t('offer.offer.5umwskili280')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskili9o0')" :width="100">
                            <template #cell="{ record }">
                                <a-tooltip :content="$t('offer.offer.5umwskilhv40')" position="right">
                                    <template #content>
                                        <div v-if="structureData(record, 'quote_params') != '1'"
                                            v-for="item in structureData(record, 'quote_params')">{{ item }}</div>
                                        <div v-else>{{ $t('offer.offer.5umwskilhv40') }}</div>
                                    </template>
                                    <a-link>{{$t('offer.offer.5umwskili280')}}</a-link>
                                </a-tooltip>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskildlo0')" :width="local.lang=='en'?140:120" v-if="$permission(['wealthProductOfferStates'])">
                            <template #cell="{ record }">
                                <div style="display: flex;align-items: center;">
                                    <a-typography-text>
                                        <a-tag v-if="record.status == '1'" size="small" :color="'#00b42a'">
                                            {{ $t('offer.offer.5umwskiliho0') }}
                                        </a-tag>
                                        <a-tag v-if="record.status == '0'" size="small" :color="'#ff7d00'">
                                            {{ $t('offer.offer.5umwskiliog0') }}
                                        </a-tag>
                                    </a-typography-text>
                                    <a-switch style="margin-left:10px" @change="changeStatus(record)" size="small"
                                        :checked-value="1" :unchecked-value="0" v-model="record.status" />
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskildbs0')" :width="150">
                            <template #cell="{ record }">
                                <div v-if="!record.listing_time">{{ '--' }}</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.listing_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.listing_time).format('HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskilit40')" :width="150">
                            <template #cell="{ record }">
                                <div v-if="record.end_time == '0' && record.start_time == '0'">{{ $t('offer.offer.5umwskilj000') }}</div>
                                <div v-else>
                                    <div>{{ dayjs.unix(record.end_time).format('YYYY-MM-DD') }}</div>
                                    <div>{{ dayjs.unix(record.end_time).format('HH:mm:ss') }}</div>
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('offer.offer.5umwskilj6s0')" :width="150">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.create_time).format('YYYY-MM-DD') }}</div>
                                <div>{{ dayjs.unix(record.create_time).format('HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('offer.offer.5umwskiljdo0')" :width="100"
                            v-if="$permission(['wealthproductofferDetailIndex'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link
                                        @click="router.push({ name: 'wealthproductOfferDetail', params: { productid: record.id } })">{{$t('offer.offer.5umwskiljk80')}}</a-link>
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
        options_product_id: '',
        currency: '',
        push: [],
        status: '',
        page: 1,
        per_page: 20
    },
    allData: {
        status: "",
        product_name: ""
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const TypeAllData = ref()
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
    let strTitle = `#,标的,产品类型,币种,名义本金,结构,报价,状态,上架时间,过期时间,添加时间\n`
    let name = t('offer.offer.5umwskiljp00')
    searchInfo.data.page = 1
    searchInfo.data.per_page = 20
    let list = []
    let param: any = { ...searchInfo.data }
    tableData.loading = true
    let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
    for (let i = 1; i <= pageNum; i++) {
        param.page = i
        const { data } = await apiWealth.apiWealthOptionsProductQuoteList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content: t('offer.offer.5umwskiljtk0') });
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
        let gqTime = item.end_time == '0' && item.start_time == '0' ? t('offer.offer.5umwskilj000') : dayjs.unix(item.end_time).format('YYYY-MM-DD HH:mm:ss')
        let listingTime = item.listing_time ? dayjs.unix(item.listing_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        str += `${Index + 1}\t,`
        str += biaode //标的
        str += `${item?.options_product_info.product_name}\t,` //产品类型
        str += `${item?.currency}\t,` //币种
        str += `${item?.nominal_principal}\t,` // 名义本金
        str += `${frameworkParams}\t,` // 结构
        str += `${quoteParams}\t,` //报价
        str += `${item?.status ? '上架' : '下架'}\t,` //状态
        str += `${listingTime}\t,` //上架时间
        str += `${gqTime}\t,` //过期时间
        str += `${dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss')}\t,` //添加时间
        str += '\n'
    })
    return str
}
// 导出
// 编辑状态
const changeStatus = async (record: any) => {
    const { code, msg } = await apiWealth.apiWealthOptionsProductQuoteUpdateStatus({
        id: record.id,
        status: record.status
    })
    if (code != 1) return getData();
    Message.success({ content: msg })
}
const getData = async () => {
    tableData.loading = true
    const { code, data } = await apiWealth.apiWealthOptionsProductQuoteList({
        ...useFilter(searchInfo.data)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const ProductAllData = async () => {
    const { code, data } = await apiWealth.apiWealthOptionsProductAll({
        ...useFilter(searchInfo.allData)
    })
    if (code != 1) return;
    TypeAllData.value = data.list
}
{
    getData()
    usePermission(['wealthOptionsProductAll']) && ProductAllData()
}
</script>