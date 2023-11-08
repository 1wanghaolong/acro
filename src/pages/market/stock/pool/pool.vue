<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('pool.pool.5umbrnkhnig0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('pool.pool.5umbrnkhopo0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('pool.pool.5umbrnkhosg0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_id" :label="$t('pool.pool.5umbrnkhox00')">
                                <a-select @change="selectChange($event, '1')" @clear="clearClick('1')" allow-clear
                                    v-model="searchInfo.data.counter_channel_id" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in searchCounterList" :value="item.id">{{ item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="counter_channel_scene" :label="$t('pool.pool.5umbrnkhp0k0')">
                                <a-select allow-clear v-model="searchInfo.data.counter_channel_scene" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in searchCounterChannelScene.scene_list" :value="item">{{
                                        item }}</a-option>
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
                        {{ searchInfo.show ? $t('pool.pool.5umbrnkhp3g0') : $t('pool.pool.5umbrnkhp680') }}
                    </a-button>
                    <a-button
                        @click="searchFormRef?.resetFields(), getData(), searchCounterChannelScene.scene_list = [], searchInfoSymbolval = ''">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('pool.pool.5umbrnkhpec0')}}
                    </a-button>
                    <a-button @click="getData" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('pool.pool.5umbrnkhpow0')}}
                    </a-button>
                    <div>
                        {{$t('pool.pool.5umbtkyyjsk0')}}: {{ useEnumsFormat('config.pool.data', configform.data.symbol_pool_trade) }}
                        <a-link v-permission="['PoolConfigUpdate']" @click="configVisible = true, config()" type="primary">
                            {{$t('pool.pool.5umbrnkhpss0')}}
                        </a-link>
                    </div>
                </a-space>
                <a-space :size="18" v-if="$permission(['PoolConfigCreate', 'trsAccountResetPassword'])">
                    <a-button v-permission="['PoolConfigCreate']"
                        @click="formVisible = true, statusVisible = '1', onCloseForm()" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('pool.pool.5umbrnkhpx40')}}
                    </a-button>
                    <a-button v-permission="['PoolConfigImport']" @click="importVisible = true">
                        {{$t('pool.pool.5umbrnkhq1c0')}}
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
                        <a-table-column :title="$t('pool.pool.5umbrnkhopo0')" data-index="symbol" :width="120"></a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhnig0')" data-index="market" :width="120">
                            <template #cell="{ record }">
                                <a-tag v-if="useEnumsFormat('market.market', record.market)">{{
                                    useEnumsFormat('market.market', record.market) }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhq480')" data-index="name" :width="local.lang == 'en'?200:150"></a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhox00')" data-index="counter_channel_id" :width="150">
                            <template #cell="{ record }">
                                <div>{{ record.counter_channel_info ? record.counter_channel_info.name : '--' }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhp0k0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record?.counter_channel_scene }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhq6k0')" :width="200">
                            <template #cell="{ record }">
                                <div>{{ record?.total_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhq8o0')" :width="local.lang == 'en'?200:120">
                            <template #cell="{ record }">
                                <div>{{ record?.entrust_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhqb00')" :width="150">
                            <template #cell="{ record }">
                                <div>{{ record?.position_num }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('pool.pool.5umbrnkhs8w0')" :width="local.lang == 'en'?200:150">
                            <template #cell="{ record }">
                                <div>{{ Number(record.total_num) - Number(record.entrust_num) - Number(record.position_num)
                                }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('pool.pool.5umbrnkhsdg0')" :width="local.lang == 'en'?200:150"
                            v-if="$permission(['PoolConfigAdjust', 'PoolConfigDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['PoolConfigAdjust']" @click="adjustUpload(record)">{{$t('pool.pool.5umbrnkhsg00')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="`${ $t('pool.pool.5umbtkyykps0') }?`">
                                        <a-link status="danger" v-permission="['PoolConfigDelete']">{{$t('pool.pool.5umbrnkhsk40')}}</a-link>
                                    </a-popconfirm>
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
        <!-- 新增/编辑 -->
        <a-modal :width=" local.lang =='en'?'900px':'700px'" :mask-closable=false v-model:visible="formVisible" :on-before-ok="handleForm"
            @close="onCloseForm">
            <template #title>
                {{ statusVisible == 1 ? $t('pool.pool.5umbrnkhsmc0') : $t('pool.pool.5umbrnkhsog0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRef" :rules="(formRules as any)" :model="form" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="24" v-if="statusVisible == 1">
                            <a-form-item field="symbol" :label="$t('pool.pool.5umbrnkhopo0')">
                                <a-select v-model:model-value="form.symbol" allow-search :placeholder="$t('pool.pool.5umbrnkhsq80')"
                                    @search="getSymbolList">
                                    <a-option @click="symbolBtn(item, '2')" v-for="item in (symbolList as any)"
                                        :value="item.symbol">
                                        {{ item.title }}
                                    </a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="24" v-if="statusVisible == 1">
                            <a-form-item field="market" :label="$t('pool.pool.5umbrnkhnig0')">
                                <a-select :disabled="true" allow-clear v-model="form.market" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="24" v-if="statusVisible == 1">
                            <a-form-item field="counter_channel_id" :label="$t('pool.pool.5umbrnkhox00')">
                                <a-select @clear="clearClick('2')" @change="selectChange($event, '2')" allow-clear
                                    v-model="form.counter_channel_id" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in counterList" :value="item.id">{{ item.name }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="24" v-if="statusVisible == 1">
                            <a-form-item field="counter_channel_scene" :label="$t('pool.pool.5umbrnkhp0k0')">
                                <a-select allow-clear v-model="form.counter_channel_scene" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in counterChannelScene.scene_list" :value="item">{{
                                        item }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="24">
                            <a-form-item field="total_num" :label="statusVisible == 1 ? $t('pool.pool.5umbrnkhss00') : $t('pool.pool.5umbrnkhstw0')">
                                <a-select @change="totalNumSelectChange" v-model="selectOption" :style="{ width: '120px' }"
                                    :placeholder="$t('pool.pool.5umbrnkholk0')" v-if="statusVisible == 2">
                                    <a-option v-for="item of selectData" :value="item.value">{{ item.trans[local.lang]
                                    }}</a-option>
                                </a-select>
                                <a-input hide-button style="width: 100%;" v-model="form.total_num" :placeholder="$t('pool.pool.5umbrnkhosg0')">
                                    <template #prepend>{{$t('pool.pool.5umbrnkhsvo0')}}</template>
                                </a-input>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div>
                        <a-card :style="{ width: '100%' }">
                            <div style="margin-bottom: 10px;" v-if="statusVisible == 1">
                                {{$t('pool.pool.5umbrnkhsxc0')}}
                            </div>
                            <div style="display: flex;align-items: center;margin-bottom: 10px;" v-if="statusVisible == 2">
                                <span :style="local.lang == 'en'?'width: 200px;':'width: 80px;'">{{$t('pool.pool.5umbrnkhsz00')}}:</span>
                                <a-input v-model="OrderInfo.total_num" style="flex: 1;" :placeholder="$t('pool.pool.5umbrnkhsz00')" allow-clear
                                    :disabled="true">
                                    <template #prepend>
                                        {{$t('pool.pool.5umbrnkhsvo0')}}
                                    </template>
                                </a-input>
                            </div>
                            <div style="display: flex;align-items: center;margin-bottom: 10px;">
                                <span :style="local.lang == 'en'?'width: 200px;':'width: 80px;'">{{$t('pool.pool.5umc001tf8w0')}}:</span>
                                <a-input v-model="OrderInfo.position_num" style="flex: 1;" :placeholder="$t('pool.pool.5umbrnkht0k0')" allow-clear
                                    :disabled="true">
                                    <template #prepend>
                                        {{$t('pool.pool.5umbrnkhsvo0')}}
                                    </template>
                                </a-input>
                            </div>
                            <div style="display: flex;align-items: center;margin-bottom: 10px;">
                                <span :style="local.lang == 'en'?'width: 200px;':'width: 80px;'">{{$t('pool.pool.5umbrnkhq8o0')}}:</span>
                                <a-input v-model="OrderInfo.entrust_num" style="flex: 1;" :placeholder="$t('pool.pool.5umbrnkhq8o0')" allow-clear
                                    :disabled="true">
                                    <template #prepend>
                                        {{$t('pool.pool.5umbrnkhsvo0')}}
                                    </template>
                                </a-input>
                            </div>
                            <div style="display: flex;align-items: center;margin-bottom: 10px;">
                                <span :style="local.lang == 'en'?'width: 200px;':'width: 80px;'">{{ statusVisible == 1 ? $t('pool.pool.5umbrnkht240') : $t('pool.pool.5umbrnkht400') }}:</span>
                                <a-input v-model="OrderInfo.balance" style="flex: 1;"
                                    :placeholder="statusVisible == 1 ? $t('pool.pool.5umbrnkht240') : $t('pool.pool.5umbrnkht400')" allow-clear :disabled="true">
                                    <template #prepend>
                                        {{$t('pool.pool.5umbrnkhsvo0')}}
                                    </template>
                                </a-input>
                            </div>
                            <div style="display: flex;align-items: center;margin-bottom: 10px;">
                                <span :style="local.lang == 'en'?'width: 200px;':'width: 80px;'"></span>
                                <div style="flex: 1;">
                                    <a-alert type="warning">
                                        <template #title>
                                            {{$t('pool.pool.5umbrnkht5g0')}}
                                        </template>
                                        {{ $t('pool.pool.5umbrnkht6w0') }}
                                    </a-alert>
                                </div>
                            </div>
                        </a-card>
                    </div>
                </a-form>
            </div>
        </a-modal>
        <!-- 修改全局配置 -->
        <a-modal width="600px" :mask-closable=false v-model:visible="configVisible" :on-before-ok="confighandleForm"
            @close="configonCloseForm">
            <template #title>
                {{ $t('pool.pool.5umbrnkht8o0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="configformRef" :rules="(configformRules as any)" :model="configform.data" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="24">
                            <a-form-item field="symbol_pool_trade" :label="$t('pool.pool.5umbrnkhta00')">
                                <a-select allow-clear v-model="configform.data.symbol_pool_trade" :placeholder="$t('pool.pool.5umbrnkholk0')">
                                    <a-option v-for="item in useEnums('config.pool.data')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div>
                        <a-card :style="{ width: '100%' }">
                            <div style="margin-bottom: 10px;">
                                {{$t('pool.pool.5umbrnkhtbg0')}}
                            </div>
                            <div style="margin-bottom: 10px;">
                                {{$t('pool.pool.5umbrnkhtd40')}}
                            </div>
                        </a-card>
                    </div>
                </a-form>
            </div>
        </a-modal>
        <!-- 导入劵池 -->
        <a-modal width="500px" :mask-closable=false v-model:visible="importVisible" :on-before-ok="importhandleForm"
            @close="importonCloseForm">
            <template #title>
                {{ $t('pool.pool.5umbrnkhteo0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="importformRef" :rules="(addForm.rule as any)" :model="addForm" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="24">
                            <a-form-item field="importList" :label="$t('pool.pool.5umbrnkhtgk0')">
                                <a-upload :limit="1" image-preview @before-upload="beforeUpload" :auto-upload="true"
                                    v-model:file-list="addForm.importList" :custom-request="(upload as any)">
                                </a-upload>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div>
                        <a-card :style="{ width: '100%' }">
                            <div style="margin-bottom: 10px;">
                                {{$t('pool.pool.5umbrnkhti40')}}
                                <a-link @click="download('1')">{{$t('pool.pool.5umbrnkhtjw0')}}</a-link>
                            </div>
                            <div style="margin-bottom: 10px;">
                                {{$t('pool.pool.5umbrnkhtlc0')}}
                                <a-link @click="download('2')">{{$t('pool.pool.5umbrnkhtmo0')}}</a-link>
                            </div>
                        </a-card>
                    </div>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
// @ts-ignore
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const local = useLocal()
//列表
const ChannelAllList = ref([])
const searchFormRef = ref()
const counterList: any = ref([])
const { t } = useI18n();
const searchCounterList: any = ref([])
const symbolList: any = ref([])
const searchInfoSymbolval: any = ref()
const tableData = reactive({
    list: [],
    count: 0,
    message: [],
    loading: false
})
const counterChannelScene: any = ref([])
const searchCounterChannelScene: any = ref([])
const searchInfo = reactive({
    show: false,
    data: {
        symbol: "",
        market: "",
        counter_channel_id: "",
        counter_channel_scene: "",
        page: 1,
        per_page: 20
    }
})
const getData = async () => {
    tableData.loading = true
    let symbolVal: any = ''
    if (searchInfo.data.symbol) {
        searchInfoSymbolval.value = searchInfo.data?.symbol
        symbolVal = searchInfo.data?.symbol?.split(',')[0]
    }
    const { code, data } = await apiTrs.trsSymbolPoolList({
        ...useFilter({ ...searchInfo.data, ...{ symbol: symbolVal } }),
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
    searchInfo.data.symbol = searchInfoSymbolval.value
}
const selectChange = (id: any, type: any) => {
    if (!id || !type) return
    form.value.counter_channel_scene = ""
    searchInfo.data.counter_channel_scene = ""
    if (type == '1') {
        let list = ChannelAllList.value.filter((item: any) => item.id == id)
        searchCounterChannelScene.value = list[0]
    }
    if (type == '2') {
        let list = ChannelAllList.value.filter((item: any) => item.id == id)
        counterChannelScene.value = list[0]
    }
}
const clearClick = (type: any) => {
    if (type == '1') {
        searchInfo.data.counter_channel_id = ''
        searchInfo.data.counter_channel_scene = ''
        searchCounterChannelScene.value = []
    }
    if (type == '2') {
        form.value.counter_channel_scene = '',
            form.value.counter_channel_id = '',
            counterChannelScene.value = []
    }
}
const symbolBtn = (val: any, type: any) => {
    if (type == '2') {
        form.value.symbol = val.symbol
        form.value.security_type = val.security_type
        let isShowMarket: any = 0
        useEnums('market.market').forEach((item: any) => {
            if (val.market == item.value) {
                isShowMarket++
            }
        })
        if (isShowMarket) {
            form.value.market = val.market
        } else {
            form.value.market = ''
            Message.info({ content: t('pool.pool.5umbrnkhtog0') })
        }
    }
}
const counterSearchInfo = reactive({
    show: false,
    data: {
        name: "",
        status: "1"
    }
})
const del = async (record: any) => {
    const { code } = await apiTrs.trsSymbolPoolDelete({ 'id': [record.id] })
    if (code != 1) return;
    getData();
}
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolSearch({ keyword: value })
    if (code != 1) return;
    symbolList.value = data.list.map((item: any) => {
        item.symbol = item.symbol + ',' + item.market
        item.title = item.name[local.lang] + '.' + item.text
        return item
    })
}
const counterData = async () => {
    const { code, data } = await apiTrs.counterChannelAll({
        ...useFilter(counterSearchInfo.data),
    })
    if (code != 1) return;
    ChannelAllList.value = data
    counterList.value = data
    searchCounterList.value = data
    let listval: any = []
    data.forEach((item: any) => {
        if (item?.scene_list?.length) {
            item?.scene_list.forEach((item2: any, index: any) => {
                listval.push({
                    '#': index + 1,
                    '通道ID': item.id,
                    '通道名称': item.name,
                    "通道标识": item.channel,
                    "交易方式": item2
                })
            })
        }
    })
    listval.forEach((item: any, index: any) => {
        item['#'] = index + 1
    })
    consult.value = listval
}
//列表
//修改全局配置
const configformRef = ref()
const configVisible = ref(false)
const configformRules = ref({
    symbol_pool_trade: [{ required: true, message: t('pool.pool.5umbrnkholk0') }],
})
const configform: any = reactive({
    detail: {},
    data: {
        symbol_pool_trade: 0
    },
})
const config = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group: 'trs'
    })
    form.loading = false
    if (code != 1) return;
    configform.detail = data
    configform.data.symbol_pool_trade = data.symbol_pool_trade ? '1' : '0'
}
const confighandleForm = async () => {
    const validate = await configformRef.value?.validate()
    if (validate) return;
    form.loading = true
    if (configform.data.symbol_pool_trade == '0') {
        configform.data.symbol_pool_trade = false
    }
    if (configform.data.symbol_pool_trade == '1') {
        configform.data.symbol_pool_trade = true
    }
    const { code, msg } = await apiAdmin.configUpdate({
        group: 'trs',
        data: {
            ...configform.detail,
            ...configform.data
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
    config()
}
const configonCloseForm = () => {
    // configform.data.symbol_pool_trade = ''
}
//修改全局配置
// 导入劵池
const importVisible = ref(false)
const importformRef = ref()
const consult: any = ref([])
let addForm: any = ref({
    importList: [],
    rule: {
        importList: [{ required: true, message: t('pool.pool.5umbrnkhtus0') }]
    }
})
const importhandleForm = async () => {
    const validate = await importformRef.value?.validate()
    if (validate) return false;
    let item_list: any = []
    let list = addForm.value.importList[0].response.slice(1)
    if (!list.length) {
        Message.info(t('pool.pool.5umbrnkhtwo0'))
        return false
    }
    let isShowMarket = 0
    list.forEach((item: any) => {
        useEnums('market.market').forEach((item2: any) => {
            if (item[0] == item2.value) {
                isShowMarket++
            }
        })
    })
    if (!isShowMarket) {
        Message.info(t('pool.pool.5umbrnkhtyo0'))
        return false
    }
    list.forEach((item: any) => {
        item_list.push({
            "market": item[0] || "",
            "security_type": "1",
            "symbol": item[1] ? String(item[1]) : "",
            counter_channel_id: item[2] || 0,
            "counter_channel_scene": item[4] || "",
            "total_num": item[5] || 0
        })
    })

    const { code } = await apiTrs.trsSymbolPoolCreate({
        data: {
            item_list
        }
    })
    if (code != 1) return false;
    getData();
    return true
}
const importonCloseForm = () => {
    addForm.value.importList = []
}
const addDataValidation = (worksheet: any, cellRef: any, validation: any) => {
    if (!worksheet['!validations']) {
        worksheet['!validations'] = [];
    }

    const validationType = { type: validation.type, operator: 'between' };
    const validationFormula = validation.formula1;

    worksheet['!validations'].push({ ref: cellRef, validationType, formula1: validationFormula });
}
const download = (type: any) => {
    let name: any, data: any;
    let mergeStart, mergeEnd;

    if (type == '1') {
        data = [
            { '所属市场': 'SZSE', '股票代码': '002310', '通道ID': '7', '通道标识': 'CGI', '交易方式': 'QFII', '配置股数': '10000' },
        ];
        name = t('pool.pool.5umbrnkhtjw0');
    }

    if (type == '2') {
        mergeStart = { r: 0, c: 0 };
        mergeEnd = { r: 0, c: 5 }; // 固定为A1 到 F1

        if (!consult.value) {
            consult.value = [];
        }
        data = consult.value;
        name = t('pool.pool.5umbrnkhtmo0');
    }
    const worksheetOptions:any = {
        header: Object.keys(data[0]), // 保留标题
        skipHeader: false, // 不跳过标题行
        origin: type == '2' ? 'A2' : 'A1', // 内容起始位置
    };
    const worksheet = XLSX.utils.json_to_sheet(data, worksheetOptions);

    if (mergeStart && mergeEnd) {
        const merges = [{ s: mergeStart, e: mergeEnd }];
        worksheet['!merges'] = merges;
    }
    if (type == '2') {
        // 在 A1 到 E1 的单元格范围内写入文本
        worksheet['A1'] = { t: 's', v: '以下为当前系统内可用的通道，请在券池导入模板中输入通道标识、交易方式' };
    }
    if (type == '1') {
        // 设置下拉选择框
        const markets = ['SZSE', 'SZ']; // 所属市场选项
        const range = XLSX.utils.decode_range(worksheet['!ref']); // 获取工作表范围
        for (let row = range.s.r + 1; row <= range.e.r; row++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: 0 }); // 所属市场列的单元格引用
            const validation = {
                type: 'list',
                prompt: t('pool.pool.5umbrnkhu1w0'),
                formula1: `${markets.join(',')}`,
            };
            addDataValidation(worksheet, cellRef, validation); // 应用数据验证
        }
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name);
};
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isXlsxFile = extension === 'xlsx';
        if (isXlsxFile) {
            resolve(true)
        } else {
            Message.info(t('pool.pool.5umbrnkhu3o0'))
            reject('cancel')
        }
    });
};
const upload = async (option: any) => {
    const { onError, onSuccess, fileItem } = option
    const file = fileItem.file
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        let str = jsonData[0]
        if (str.includes("所属市场") && str.includes("股票代码") && str.includes("股票代码") && str.includes("通道标识") && str.includes("交易方式") && str.includes("配置股数")) {
            addForm.value.symbolList = jsonData
            onSuccess(jsonData);
        } else {
            Message.info({ content: t('pool.pool.5umbrnkhu540') })
            onError()
        }
    };
    reader.readAsArrayBuffer(file);
}
// 导入劵池
// 新增/编辑
const recordValue = ref()
const formVisible = ref(false)
const formRef = ref()
const statusVisible: any = ref(1)
const selectOption = ref('1')
const selectData = ref([
    {
        'value': '1',
        "trans": {
            "zh-CN": t('pool.pool.5umbrnkhu6o0'),
            "tc": t('pool.pool.5umbrnkhu6o0'),
            "en": t('pool.pool.5umbrnkhu6o0')
        },
    },
    {
        'value': '2',
        "trans": {
            "zh-CN": t('pool.pool.5umbrnkhu880'),
            "tc": t('pool.pool.5umbrnkhu880'),
            "en": t('pool.pool.5umbrnkhu880')
        },
    }
])
const OrderInfo: any = ref(
    {
        position_num: "",
        entrust_num: "",
        balance: "",
        total_num: "",
    }
)
const formRules = ref({
    symbol: [{ required: true, message: t('pool.pool.5umbrnkhosg0') }],
    market: [{ required: true, message: t('pool.pool.5umbrnkholk0') }],
    counter_channel_id: [{ required: true, message: t('pool.pool.5umbrnkholk0') }],
    counter_channel_scene: [{ required: true, message: t('pool.pool.5umbrnkholk0') }],
    total_num: [{ required: true, message: t('pool.pool.5umbrnkhosg0') }],
})
const form: any = ref({
    symbol: "",
    market: "",
    counter_channel_id: "",
    counter_channel_scene: "",
    total_num: "",
    security_type: ""
})
const adjustUpload = (record: any) => {
    if (!record) {
        return
    }
    statusVisible.value = '2'
    recordValue.value = record
    formVisible.value = true
    OrderInfo.value.position_num = String(record.position_num)
    OrderInfo.value.entrust_num = String(record.entrust_num)
    OrderInfo.value.total_num = String(record.total_num)
    OrderInfo.value.balance = String(Number(record.total_num) - Number(OrderInfo.value.entrust_num) - Number(OrderInfo.value.position_num))
    selectOption.value = "1"
}
const balanceVal = (val1: any, val2: any, val3: any, val4: any, type: any) => {
    if (type == '1') {
        return String(Number(val1 || 0) - Number(val2 || 0) - Number(val3 || 0) + Number(val4))
    }
    if (type == '2') {
        return String(Number(val1 || 0) - Number(val2 || 0) - Number(val3 || 0) - Number(val4))
    }
}
const totalNumSelectChange = (val: any) => {
    if (!val) {
        return
    }
    if (val == '1' && form.value.total_num) {
        OrderInfo.value.balance = balanceVal(OrderInfo.value?.total_num, OrderInfo.value?.entrust_num, OrderInfo.value?.position_num, form.value.total_num, '1')
    }
    if (val == '2' && form.value.total_num) {
        OrderInfo.value.balance = balanceVal(OrderInfo.value?.total_num, OrderInfo.value?.entrust_num, OrderInfo.value?.position_num, form.value.total_num, '2')
    }
}
watch(() => [form.value.market, form.value.symbol, form.value.counter_channel_id, form.value.counter_channel_scene, form.value.total_num], (newval: any) => {
    if (newval[0] && newval[1] && newval[2] && newval[3]) {
        usePermission(['trsSymbolPoolOrderInfo']) && PoolOrderInfo()
        OrderInfo.value.balance = String(Number(newval[4] || 0) - Number(OrderInfo?.value.entrust_num || 0) - Number(OrderInfo.value?.position_num || 0))
        console.log('OrderInfo.value.balance', OrderInfo.value.balance, Number(newval[4]));

    }
    if (newval[4]) {
        if (selectOption.value == '1' && statusVisible.value == '2') {
            OrderInfo.value.balance = balanceVal(OrderInfo.value?.total_num, OrderInfo.value?.entrust_num, OrderInfo.value?.position_num, form.value.total_num, '1')
        }
        if (selectOption.value == '2' && statusVisible.value == '2') {
            OrderInfo.value.balance = balanceVal(OrderInfo.value?.total_num, OrderInfo.value?.entrust_num, OrderInfo.value?.position_num, form.value.total_num, '2')
        }
        if (statusVisible.value == '1') {
            OrderInfo.value.balance = String(Number(newval[4] || 0) - Number(OrderInfo.value?.entrust_num || 0) - Number(OrderInfo.value?.position_num || 0))
        }
    }
},
    { deep: true }
)
const PoolOrderInfo = async () => {
    let symbol = form.value?.symbol?.split(',')[0]
    let { market, counter_channel_id, counter_channel_scene, security_type } = form.value
    let params = {
        market,
        symbol,
        counter_channel_id,
        counter_channel_scene,
        security_type
    }
    const { code, data } = await apiTrs.trsSymbolPoolOrderInfo(params)
    if (code != 1) return;
    OrderInfo.value.entrust_num = String(data.entrust_num)
    OrderInfo.value.position_num = String(data.position_num)
}
const handleForm = async () => {
    const res = await formRef.value?.validate();
    if (res) return false
    let symbol: any = ''
    if (form.value?.symbol) {
        symbol = form.value?.symbol?.split(',')[0]
    }
    if (statusVisible.value == '1') {
        const { code } = await apiTrs.trsSymbolPoolCreate({
            data: {
                item_list: [
                    {
                        ...form.value,
                        ...{ symbol }
                    }
                ]
            }
        })
        if (code != 1) return false;
        getData();
        return true
    } else {
        let update_num: any
        update_num = selectOption.value == '2' ? -(form.value.total_num) : form.value.total_num
        const { code } = await apiTrs.trsSymbolPoolUpdate({
            data: {
                id: recordValue.value.id,
                update_num
            }
        })
        if (code != 1) return false;
        getData();
        return true
    }

}
const onCloseForm = () => {
    form.value = {
        symbol: "",
        market: "",
        counter_channel_id: "",
        counter_channel_scene: "",
        total_num: "",
        security_type: ""
    }
    OrderInfo.value =
    {
        position_num: "",
        entrust_num: "",
        balance: ""
    }
    formRef.value.resetFields()
}
// 新增/编辑
{
    usePermission(['StockSymbolPoolList']) && getData()
    usePermission(['StockSymbolPoolListChannelAll']) && counterData()
    config()
}
</script>
<style scoped>
:deep(.arco-select-view-single.arco-select-view-disabled) {
    color: #000606;
}
</style>