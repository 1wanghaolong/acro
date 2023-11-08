
<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="mobile" :label="$t('record.record.5ukg0t2vi800')">
                                <a-input v-model="searchInfo.data.mobile" :placeholder="$t('record.record.5ukg0t2vj8w0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('record.record.5ukg0t2vjg00')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="marketType" :label="$t('record.record.5ukg0t2vjok0')">
                                <a-select allow-clear v-model="searchInfo.data.marketType" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.marketType')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="quoteLevel" :label="$t('record.record.5ukg0t2vjs40')">
                                <a-select allow-clear v-model="searchInfo.data.quoteLevel" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.quoteLevel')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="level" :label="$t('record.record.5ukg0t2vjus0')">
                                <a-select allow-clear v-model="searchInfo.data.level" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.level')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('record.record.5ukg0t2vjyo0')">
                                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('record.record.5ukg0t2vjko0')">
                                    <a-option v-for="item in useEnums('cms.operate.quote.market.accessStatus')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="time" :label="$t('record.record.5ukg0t2vk340')">
                                <a-range-picker v-model="searchInfo.data.time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('record.record.5ukg0t2vk6o0') : $t('record.record.5ukg0t2vk9c0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getData()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('record.record.5ukg0t2vkbw0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('record.record.5ukg0t2vkek0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-popover v-if="$permission(['cmsOperateQuoteRecordDownload'])" trigger="click" position="bottom">
                        <a-button :loading="tableData.loading">
                            <template #icon>
                                <icon-to-bottom />
                            </template>
                            {{$t('record.record.5ukg0t2vkik0')}}
                        </a-button>
                        <template #content>
                            <div style="text-align: center;">
                                <p @click="download(1)" style="cursor: pointer;margin-bottom:10px">{{$t('record.record.5ukg0t2vknk0')}}</p>
                                <p @click="download(2)" style="cursor: pointer;">{{$t('record.record.5ukg0t2vkq80')}}</p>
                            </div>
                        </template>
                    </a-popover>
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
                        <a-table-column :title="$t('record.record.5ukg0t2vksk0')" data-index="country_code" :width="local.lang=='en'?110:80" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vi800')" data-index="mobile" :width="130" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vkv80')" data-index="real_name" :width="100" :ellipsis="true"
                            :tooltip="true"></a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vkxk0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vjok0')" :width="100">
                            <template #cell="{ record }">
                                {{ record.market_type }}
                                <!-- <div>{{ useEnumsFormat('cms.operate.quote.market.marketType', record.market_type) }}</div> -->
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vjs40')" :width="80">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.quoteLevel', record.quote_level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vl040')" data-index="card_day" :width="80" ></a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vl6c0')" data-index="card_price" :width="120" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.card_price, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vlao0')" data-index="profit" :width="100" :ellipsis="true" :tooltip="true">
                            <template #cell="{ record }">
                                {{ $dataFormat(record.profit, 2, 1) }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vjus0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.level', record.level) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vle80')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                                </div>
                                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('record.record.5ukg0t2vjyo0')" :width="120">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('cms.operate.quote.market.accessStatus', record.status) }}</div>
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
// const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
    show: false,
    data: {
        marketType: '',
        mobile: '',
        level: '',
        type: '',
        quoteLevel: '',
        status: '',
        time: [],
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
    const { code, data } = await apiCms.cmsQuoteRecordList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
// 导出
const download = async (num: any) => {
    let strTitle = `ID,区号/Country Code,账号/Account,姓名/Real Name,获取方式/Method,证券市场/Market Type,等级/Quote Level,时长/Day,金额/Price,利润/Profit,类型/Level,创建时间/Create Time,状态/Status\n`
    let name = 'quote-record-' + dayjs(new Date()).format('YYYY-MM-DD')
    let list = []
    let param: any = { ...searchInfo.data }
    Object.keys(param).forEach((item: any) => {
        if (!param[item] && param[item] != '0') {
            delete param[item];
        }
    })
    tableData.loading = true
    if (num == 1) {
        param.page = 1
        let pageNum = Math.ceil(tableData.count / searchInfo.data.per_page)
        for (let i = 1; i <= pageNum; i++) {
            param.page = i
            const { data } = await apiCms.cmsQuoteRecordList({
                ...useFilter(param)
            })
            list.push(...data.list)
        }
    } else {
        const { data } = await apiCms.cmsQuoteRecordList({
            ...useFilter(param)
        })
        list.push(...data.list)
    }
    tableData.loading = false
    if (!list.length) return Message.warning({ content:t('record.record.5ukg0t2vlgk0') });
    let downloadList = listValue(strTitle, list)
    downloadExcel(downloadList, name)
}
const listValue = (strTitle: any, list: any) => {
    //定义表头
    if (!list.length) {
        return
    }
    let str = strTitle
    list.forEach((item: any) => {
        let create_time = item.create_time ? dayjs.unix(item.create_time).format('YYYY-MM-DD HH:mm:ss') : '--'
        let type = useEnumsFormat('cms.operate.quote.market.type', item.type) || item.type ||t('record.record.5ukg0t2vljw0')
        let quote_level = useEnumsFormat('cms.operate.quote.market.quoteLevel', item.quote_level) || item.quote_level ||t('record.record.5ukg0t2vljw0')
        let level = useEnumsFormat('cms.operate.quote.market.level', item.level) || item.level ||t('record.record.5ukg0t2vljw0')
        let status = useEnumsFormat('cms.operate.quote.market.accessStatus', item.status) || item.status ||t('record.record.5ukg0t2vljw0')
        str += `${item?.id}\t,`  // ID
        str += `${item?.country_code}\t,`
        str += `${item?.mobile}\t,`
        str += `${item?.real_name}\t,`
        str += `${type}\t,`
        str += `${item?.market_type}\t,`
        str += `${quote_level}\t,`
        str += `${item?.card_day}\t,`
        str += `${item?.card_price}\t,`
        str += `${item?.profit}\t,`
        str += `${level}\t,`
        str += `${create_time}\t,`
        str += `${status}\t,`
        str += '\n'
    })
    return str
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