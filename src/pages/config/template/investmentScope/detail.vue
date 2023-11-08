<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('investmentScope.detail.5umz2vztby40')}}
                        </a-space>
                        <a-space :size="18">
                            <a-button v-if="dataAll.setup" @click="dataAll.setup = false; getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('investmentScope.detail.5umz2vztcqo0')}}
                            </a-button>
                            <a-button v-if="dataAll.setup" @click="submit" type="primary" :loading="dataAll.loading"
                                :disabled="dataAll.loading">
                                <template #icon>
                                    <icon-save />
                                </template>
                                {{$t('investmentScope.detail.5umz2vztcvw0')}}
                            </a-button>
                            <a-button v-permission="['configTemplateInvestmentScopeUpdate']" v-if="!dataAll.setup"
                                @click="dataAll.setup = true" type="primary">
                                <template #icon>
                                    <icon-edit />
                                </template>
                                {{$t('investmentScope.detail.5umz2vztczg0')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="dataAll.data" :rules="dataAll.setup ? (dataAll.rules as any) : {}"
                    auto-label-width layout="vertical" @submit="submit">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameZh" :label="$t('investmentScope.detail.5umz2vztd1o0')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameZh" :placeholder="$t('investmentScope.detail.5umz2vztd5c0')" />
                                <div v-else>{{ dataAll.data.nameZh }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameEn" :label="$t('investmentScope.detail.5umz2vztddk0')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameEn" :placeholder="$t('investmentScope.detail.5umz2vztdg00')" />
                                <div v-else>{{ dataAll.data.nameEn }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="nameTc" :label="$t('investmentScope.detail.5umz2vztdic0')">
                                <a-input v-if="dataAll.setup" v-model="dataAll.data.nameTc" :placeholder="$t('investmentScope.detail.5umz2vztdks0')" />
                                <div v-else>{{ dataAll.data.nameTc }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('investmentScope.detail.5umz2vztdn00')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descZh" :placeholder="$t('investmentScope.detail.5umz2vztdp00')" />
                                <div v-else>{{ dataAll.data.descZh }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('investmentScope.detail.5umz2vztdr00')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descEn" :placeholder="$t('investmentScope.detail.5umz2vztdss0')" />
                                <div v-else>{{ dataAll.data.descEn }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item :label="$t('investmentScope.detail.5umz2vztdw00')">
                                <a-textarea v-if="dataAll.setup" style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                                    v-model="dataAll.data.descTc" :placeholder="$t('investmentScope.detail.5umz2vztdxw0')" />
                                <div v-else>{{ dataAll.data.descTc }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="multiple_id" :label="$t('investmentScope.detail.5umz2vzte0w0')">
                                <a-select v-if="dataAll.setup" allow-clear v-model="dataAll.data.multiple_id"
                                    :placeholder="$t('investmentScope.detail.5umz2vzte3c0')">
                                    <a-option v-for="item in financeMultipleAll" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                                <div v-else>{{
                                    financeMultipleAll.find((item: any) => item.value ==
                                        dataAll.data.multiple_id)?.trans[local.lang] }}
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="market_type" :label="$t('investmentScope.detail.5umz2vzte5o0')">
                                <a-select v-if="dataAll.setup" allow-clear v-model="dataAll.data.market_type"
                                    :placeholder="$t('investmentScope.detail.5umz2vzte3c0')">
                                    <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                                <div v-else>
                                    {{ useEnumsFormat('market.market_type', dataAll.data.market_type) }}
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="is_all_market" :label="$t('investmentScope.detail.5umz2vzte7w0')">
                                <a-select v-if="dataAll.setup" allow-clear v-model="dataAll.data.is_all_market"
                                    :placeholder="$t('investmentScope.detail.5umz2vzte3c0')">
                                    <a-option v-for="item in useEnums('config.template.investmentScope.type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                                <div v-else>
                                    {{ useEnumsFormat('config.template.investmentScope.type', dataAll.data.is_all_market) }}
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col v-if="dataAll.data.is_all_market == 1" :xs="24" :sm="12" :md="8" :xl="8">
                            <a-form-item field="investment_rate" :label="$t('investmentScope.detail.5umz2vztec00')">
                                <a-input-number v-if="dataAll.setup" hide-button style="width: 100%;"
                                    v-model="dataAll.data.investment_rate" :placeholder="$t('investmentScope.detail.5umz2vztee40')">
                                    <template #append>%</template>
                                </a-input-number>
                                <div v-else>
                                    {{ dataAll.data.investment_rate }}%
                                </div>
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </a-card>
            <div v-if="$permission(['configTemplateInvestmentScopeItemList'])">
                <a-card v-if="dataAll.isAllMarket != 1" style="margin-top: 20px;">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('investmentScope.detail.5umz2vzteg00')}}
                            </a-space>
                            <a-space :size="18">
                                <a-button v-permission="['configInvestmentScopeTemplateitemCreate']" type="primary"
                                    @click="addVisibleBtn(1, 1)">{{$t('investmentScope.detail.5umz2vztehw0')}}</a-button>
                                <a-button @click="download">
                                    {{$t('investmentScope.detail.5umz2vztejc0')}}
                                </a-button>
                                <a-button v-permission="['configInvestmentScopeTemplateitemCreateBatch']"
                                    @click="addVisibleBtn(3, 1)">
                                    {{$t('investmentScope.detail.5umz2vztel00')}}
                                </a-button>
                            </a-space>
                        </div>
                    </template>
                    <div class="tableBox" style="height: 300px;">
                        <a-table :bordered="false" column-resizable :pagination="false"
                            :scroll="charge.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                            :data="charge.list" class="table">
                            <template #columns>
                                <a-table-column title="#" :width="50">
                                    <template #cell="{ rowIndex }">
                                        {{ rowIndex + 1 }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vztems0')" :width="100" data-index="symbol">
                                    <template #cell="{ record }">
                                        {{ typeof record.symbol == 'string' && record.symbol.indexOf(',') != -1 ? record.symbol?.split(',')[0] : record.symbol }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzte5o0')" :width="100" data-index="market"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzteok0')" :width="100" data-index="name"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzteq00')" :width="100" data-index="currency"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzterg0')" :width="100" data-index="lot_size"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vztet40')" :width="100" data-index="tick_size"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vztevg0')" :width="100" data-index="investment_rate">
                                    <template #cell="{ record }">
                                        {{ record.investment_rate }}%
                                    </template>
                                </a-table-column>
                                <a-table-column
                                    v-if="$permission(['configInvestmentScopeTemplateitemUpdate', 'configInvestmentScopeTemplateitemDelete'])"
                                    fixed="right" :title="$t('investmentScope.detail.5umz2vztexo0')" :width="110">
                                    <template #cell="{ record }">
                                        <a-space>
                                            <a-link v-permission="['configInvestmentScopeTemplateitemUpdate']"
                                                style="padding-left: 0;" type="text" @click="editBtn(record)" size="small">
                                                {{ $t('investmentScope.detail.5umz2vztczg0') }}
                                            </a-link>
                                            <a-popconfirm position="left" @ok="deleteBtn(record)" :content="$t('problem.problem.5ukdvvdbjrg0')">
                                                <a-link v-permission="['configInvestmentScopeTemplateitemDelete']"
                                                    type="text" status="danger" size="small">
                                                    {{ $t('investmentScope.detail.5umz2vztezg0') }}
                                                </a-link>
                                            </a-popconfirm>
                                        </a-space>
                                    </template>
                                </a-table-column>
                            </template>
                        </a-table>
                    </div>
                    <div class="pagination">
                        <a-pagination size="small" @change="changeget" @page-size-change="changegetPageSize"
                            v-model:current="charge.data.page" v-model:page-size="charge.data.per_page"
                            :total="charge.count" show-total show-jumper show-page-size />
                    </div>
                </a-card>
                <!-- <a-card style="margin-top: 20px;">
                <div v-for="item in formMf" style="display: flex;align-items: center;margin: 15px 0;">
                    <template v-if="item.rule_type == 1">
                        <a-checkbox :disabled="!editDisabled" v-model="item.status"></a-checkbox>
                        <p style="margin-left: 15px;">{{$t('investmentScope.detail.5umz2vztf0w0')}}</p><span>{{ item.rule_value }}%</span>
                    </template>
                    <template v-if="item.rule_type == 2">
                        <a-checkbox :disabled="!editDisabled" v-model="item.status"></a-checkbox>
                        <p style="margin-left: 15px;">{{$t('investmentScope.detail.5umz2vztf2s0')}}</p>
                        <span>{{ item.rule_value }}%</span>
                    </template>
                    <template v-if="item.rule_type == 3">
                        <a-checkbox :disabled="!editDisabled" v-model="item.status"></a-checkbox>
                        <p style="margin-left: 15px;">{{$t('investmentScope.detail.5umz2vztf4s0')}}</p>
                        <span>{{ item.rule_value }}%</span>
                    </template>
                    <template v-if="item.rule_type == 4">
                        <a-checkbox :disabled="!editDisabled" v-model="item.status"></a-checkbox>
                        <p style="margin-left: 15px;">{{$t('investmentScope.detail.5umz2vztf6g0')}}</p>
                        <span>{{ item.rule_value }}{{
                            dataAll.data.market_type == 'US' ? $t('investmentScope.detail.5umz2vztf800') : dataAll.data.market_type == 'HKEX' ? $t('investmentScope.detail.5umz2vztf9c0') : $t('investmentScope.detail.5umz2vztfas0')
                        }}</span>
                        <span>{{$t('investmentScope.detail.5umz2vztfcc0')}}</span>
                    </template>
                </div>
                <a-button v-if="!editDisabled" @click="editDisabled = true" type="primary">{{$t('investmentScope.detail.5umz2vztczg0')}}</a-button>
                <template v-else>
                    <a-button @click="editDisabled = false, getinvestmentScopeTemplateRuleAll()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('investmentScope.detail.5umz2vztcqo0')}}
                    </a-button>
                    <a-button @click="saveBtn" style="margin-left:15px" type="primary">
                        <template #icon>
                            <icon-save />
                        </template>
                        {{$t('investmentScope.detail.5umz2vztcvw0')}}
                    </a-button>
                </template>
            </a-card> -->
                <a-card style="margin-top: 20px;margin-bottom: 20px;">
                    <template #title>
                        <div style="display: flex;justify-content: space-between;">
                            <a-space :size="18">
                                {{$t('investmentScope.detail.5umz2vztfe00')}}
                            </a-space>
                            <a-space :size="18">
                                <a-button v-permission="['configInvestmentScopeTemplateitemCreateNo']" type="primary"
                                    @click="addVisibleBtn(1, 2)">{{$t('investmentScope.detail.5umz2vztffw0')}}</a-button>
                                <a-button @click="download">
                                    {{$t('investmentScope.detail.5umz2vztejc0')}}
                                </a-button>
                                <a-button v-permission="['configInvestmentScopeTemplateitemCreateBatchNo']"
                                    @click="addVisibleBtn(3, 2)">
                                    {{$t('investmentScope.detail.5umz2vztel00')}}
                                </a-button>
                            </a-space>
                        </div>
                    </template>
                    <div class="tableBox" style="height: 300px;">
                        <a-table :bordered="false" column-resizable :pagination="false"
                            :scroll="charge.noList?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                            :data="charge.noList" class="table">
                            <template #columns>
                                <a-table-column title="#" :width="50">
                                    <template #cell="{ rowIndex }">
                                        {{ rowIndex + 1 }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vztems0')" data-index="symbol">
                                    <template #cell="{ record }">
                                        {{ typeof record.symbol == 'string' && record.symbol.indexOf(',') != -1 ? record.symbol?.split(',')[0] : record.symbol }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzte5o0')" data-index="market"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzteok0')" data-index="name"></a-table-column>
                                <a-table-column :title="$t('investmentScope.detail.5umz2vzteq00')" data-index="currency"></a-table-column>
                                <!-- <a-table-column :title="'每手股数'" :width="100" data-index="lot_size"></a-table-column>
                        <a-table-column :title="$t('investmentScope.detail.5umz2vztet40')" :width="100" data-index="tick_size"></a-table-column>
                        <a-table-column :title="$t('investmentScope.detail.5umz2vztevg0')" :width="100" data-index="investment_rate"></a-table-column> -->
                                <a-table-column v-if="$permission(['configInvestmentScopeTemplateitemDeleteNo'])"
                                    fixed="right" :title="$t('investmentScope.detail.5umz2vztexo0')" :width="120">
                                    <template #cell="{ record }">
                                        <a-space>
                                            <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('investmentScope.detail.5umz44jz3ao0') }?` ">
                                                <a-link v-permission="['configInvestmentScopeTemplateitemDeleteNo']"
                                                    style="padding-left: 0;" type="text" status="danger" size="small">
                                                    {{ $t('investmentScope.detail.5umz2vztezg0') }}
                                                </a-link>
                                            </a-popconfirm>
                                        </a-space>
                                    </template>
                                </a-table-column>
                            </template>
                        </a-table>
                    </div>
                    <div class="pagination">
                        <a-pagination size="small" @change="nochangeget" @page-size-change="nochangegetPageSize"
                            v-model:current="charge.noData.page" v-model:page-size="charge.noData.per_page"
                            :total="charge.noCount" show-total show-jumper show-page-size />
                    </div>
                </a-card>
            </div>

        </a-card>
        <a-modal :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd" @close="onCloseAdd">
            <template #title>
                <span v-if="visibleNoTitle == 1">
                    {{ visibleTitle == 2 ? $t('investmentScope.detail.5umz2vztfiw0') : $t('investmentScope.detail.5umz2vztfkg0') }}
                </span>
                <span v-else>
                    {{ $t('investmentScope.detail.5umz2vztfls0') }}
                </span>
            </template>
            <div style="display: flex;">
                <a-form ref="formRefs" :model="addForm" :rules="(dataAll.ruleCreate as any)" layout="vertical">
                    <a-form-item v-if="visibleTitle != 3" field="symbol" :label="$t('investmentScope.detail.5umz2vztems0')">
                        <a-select v-model:model-value="addForm.symbol" allow-search :placeholder="$t('investmentScope.detail.5umz2vztfn40')"
                            @search="getSymbolList">
                            <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.symbol">
                                {{ item.title }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="visibleNoTitle == 1" field="investment_rate" :label="$t('investmentScope.detail.5umz2vztevg0')">
                        <a-input-number hide-button style="width: 100%;" v-model="addForm.investment_rate"
                            :placeholder="$t('investmentScope.detail.5umz2vztee40')">
                            <template #append>%</template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item v-if="visibleTitle == 3" allow-search field="symbolList" :label="$t('investmentScope.detail.5umz2vztfok0')">
                        <a-upload draggable :limit="1" image-preview @before-upload="beforeUpload" :auto-upload="true"
                            v-model:file-list="addForm.symbolList" :custom-request="(upload as any)">
                        </a-upload>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
// @ts-ignore
import { saveAs } from 'file-saver';
// import dayjs from 'dayjs'
// // @ts-ignore
// import excel from '@/assets/excel/investment-scope-symbol-template.xlsx'
import * as XLSX from 'xlsx';
const local = useLocal()
const route = useRoute()
const { t } = useI18n();
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const dataAll: any = reactive({
    info: {},
    data: {
        nameZh: '',
        nameEn: '',
        nameTc: '',
        descZh: '',
        descEn: '',
        descTc: '',
        multiple_id: '',
        market_type: '',
        investment_rate: 0,
        is_all_market: 0
    },
    isAllMarket: 0,
    setup: false,
    loading: false,
    rules: {
        nameZh: [{ required: true, message: t('investmentScope.detail.5umz2vztfps0') }],
        nameEn: [{ required: true, message: t('investmentScope.detail.5umz2vztfrc0') }],
        nameTc: [{ required: true, message: t('investmentScope.detail.5umz2vztftc0') }],
        descZh: [{ required: true, message: t('investmentScope.detail.5umz2vztdp00') }],
        descEn: [{ required: true, message: t('investmentScope.detail.5umz2vztdss0') }],
        descTc: [{ required: true, message: t('investmentScope.detail.5umz2vztdxw0') }],
        multiple_id: [{ required: true, message: t('investmentScope.detail.5umz2vzte3c0') }],
        investment_rate: [{ required: true, message: t('investmentScope.detail.5umz2vztee40') }],
        is_all_market: [{ required: true, message: t('investmentScope.detail.5umz2vzte3c0') }],
        market_type: [{ required: true, message: t('investmentScope.detail.5umz2vzte3c0') }],
    },
    ruleCreate: {
        symbol: [{ required: true, message: t('investmentScope.detail.5umz2vztfwk0') }],
        investment_rate: [{ required: true, message: t('investmentScope.detail.5umz2vztfxw0') }],
        symbolList: [{ required: true, message: t('investmentScope.detail.5umz2vztfzs0') }]
    }
})
const charge: any = reactive({
    list: [],
    countList: [],
    noList: [],
    countnoList: [],
    loading: false,
    data: {
        page: 1,
        per_page: 20,
        investment_scope_temp_id: route.params?.id
    },
    noData: {
        page: 1,
        per_page: 20,
        investment_scope_temp_id: route.params?.id
    },
    count: 0,
    noCount: 0,
})
const listData = (type:any,val?:any) =>{
    if (type == '1') {
        if (val == 'add') {
            charge.data.page = 1
        }
        charge.list = charge.countList.slice((charge.data.page -1) * charge.data.per_page, charge.data.per_page * charge.data.page) 
    }
    if (type == '2') {
        if (val == 'add') {
            charge.noData.page = 1
        }
        charge.noList = charge.countnoList.slice((charge.noData.page -1) * charge.noData.per_page, charge.noData.per_page * charge.noData.page) 
    }
}
const changeget = (current: number) =>{
   charge.data.page = current
   listData('1')
}
const changegetPageSize = (pageSize: number) =>{
    charge.data.per_page = pageSize
    listData('1')
}
const nochangeget = (current: number) =>{
   charge.noData.page = current
   listData('2')
}
const nochangegetPageSize = (pageSize: number) =>{
    charge.noData.per_page = pageSize
    listData('2')
}
const getData = async () => {
    await getfinanceMultipleAll()
    loading.value = true
    const { code, data } = await apiTrs.investmentScopeTemplateInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    dataAll.info = data
    dataAll.data.nameZh = data.name['zh-CN']
    dataAll.data.nameEn = data.name['en']
    dataAll.data.nameTc = data.name['tc']
    dataAll.data.descZh = data.desc['zh-CN']
    dataAll.data.descEn = data.desc['en']
    dataAll.data.descTc = data.desc['tc']
    dataAll.data.multiple_id = data.multiple_id ? data.multiple_id : ''
    dataAll.data.market_type = data.market_type
    dataAll.data.is_all_market = data.is_all_market
    dataAll.isAllMarket = data.is_all_market
    dataAll.data.investment_rate = Number(data.investment_rate)
}
const getChargeList = async (type?:any) => {
    charge.loading = true
    let parms = {
        page: !type ? charge.data.page : charge.noData.page,
        per_page: !type ? charge.data.per_page : charge.noData.per_page,
        investment_scope_temp_id: route.params?.id
    }
    const { code, data } = await apiTrs.investmentScopeTemplateitemList({
        ...useFilter(parms)
    })
    charge.loading = false
    if (code != 1) return;
    if (data?.list) {
        countAll(data.count,type)
    }
}
const countAll = async (totle:any,type?:any) =>{
    if (!totle) {
        charge.list = []
        charge.countList = []
        charge.noList = []
        charge.countnoList = []
        charge.count = 0
        charge.noCount = 0
        return
    }
    let parms = {
        page: 1,
        per_page: totle,
        investment_scope_temp_id: route.params?.id
    }
    const { code, data } = await apiTrs.investmentScopeTemplateitemList({
        ...useFilter(parms)
    })
    if (code != 1) return;
    let list:any = [] , noList:any = []
    if (data?.list) {
        data.list.forEach((item:any) =>{
            if (item.type == '1') {
                list.push(item) 
            }
            if (item.type == '2') {
                noList.push(item) 
            }
        })
        charge.countList = list
        charge.countnoList = noList
        charge.count = list.length
        charge.noCount = noList.length
        if (visibleTitle.value == '2') {
            listData('1')
            listData('2')
            return
        }
        listData('1',type)
        listData('2',type)
    }
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let params = {
        name: {
            'zh-CN': dataAll.data.nameZh,
            'en': dataAll.data.nameEn,
            'tc': dataAll.data.nameTc,
        },
        desc: {
            'zh-CN': dataAll.data.descZh,
            'en': dataAll.data.descEn,
            'tc': dataAll.data.descTc,
        },
        id: route.params?.id,
        market_type: dataAll.data.market_type,
        investment_rate: dataAll.data.investment_rate,
        is_all_market: dataAll.data.is_all_market,
        multiple_id: dataAll.data.multiple_id,
    }
    const { code } = await apiTrs.investmentScopeTemplateUpdate({
        data: params
    })
    if (code != 1) return;
    dataAll.setup = false
    getData()
}

const deleteBtn = async (val: any) => {
    const res: any = await apiTrs.investmentScopeTemplateitemDelete({
        id: val.id + '',
    });
    if (res.code != 1) return
    getChargeList()
}
let addForm: any = ref({
    symbol: '',
    symbolList: [],
    investment_rate: 0,
    template_id: route.params?.id
})
const visibleTitle:any = ref(1)
const visibleNoTitle = ref(1)
const addVisible = ref(false)
const addVisibleBtn = (num: any, noNum: any) => {
    visibleTitle.value = num
    visibleNoTitle.value = noNum
    addVisible.value = true
}
const symbolData = ref()
const symbolBtn = (val: any) => {
    symbolData.value = val
}
const editBtn = async (val: any) => {
    visibleTitle.value = 2
    visibleNoTitle.value = 1
    addForm.value.symbol = val.name + '.' + val.symbol + '.' + val.market
    symbolData.value = val
    addForm.value.id = val.id
    addForm.value.investment_rate = Number(val.investment_rate)
    addVisible.value = true
}
const formRefs = ref()
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    addForm.value.template_id = route.params?.id
    if (addForm.value.id) {
        let params = {
            id: addForm.value.id,
            market: symbolData.value.market,
            security_type: symbolData.value.security_type,
            symbol: symbolData.value.symbol.split(',')[0] + '',
            investment_rate: addForm.value.investment_rate,
        }
        const res: any = await apiTrs.investmentScopeTemplateitemUpdate({
            data: params
        });
        if (res.code != 1) return false
    } else {
        let params: any = {
            template_id: Number(addForm.value.template_id),
            item_list: []
        }
        if (visibleTitle.value == 3) {
            params.item_list = []
            addForm.value.symbolList[0].response.forEach((item: any, index: number) => {
                if (index != 0 && item?.length) {
                    params.item_list.push({
                        market: item[0],
                        security_type: '1',
                        symbol: item[1],
                        investment_rate: addForm.value.investment_rate,
                        type: visibleNoTitle.value,
                    })
                }
            })
        } else {
            params.item_list.push(
                {
                    market: symbolData.value.market,
                    security_type: symbolData.value.security_type,
                    symbol: symbolData.value.symbol,
                    investment_rate: addForm.value.investment_rate,
                    type: visibleNoTitle.value,
                }
            )
        }
        if (params.item_list?.length) {
            params.item_list.forEach((item: any) => {
                item.symbol = typeof item.symbol == 'string' && item.symbol.indexOf(',') != -1 ? item.symbol.split(',')[0] + '' : item.symbol + ""
            })
        }
        const res: any = await apiTrs.investmentScopeTemplateitemCreate({
            data: params
        });
        if (res.code != 1) return false
    }
    getChargeList('add')
}
const onCloseAdd = () => {
    addForm.value = {
        item_list: [],
        symbolList: [],
        investment_rate: 0,
        template_id: route.params?.id
    }
    formRefs.value.resetFields()
}

// 全部杠杆
const financeMultipleAll: any = ref([])
const getfinanceMultipleAll = async () => {
    financeMultipleAll.value = []
    const { code, data } = await apiTrs.financeMultipleAll();
    if (code != 1) return;
    data.forEach((item: any) => {
        financeMultipleAll.value.push({
            value: item.id,
            trans: {
                'zh-CN': item.multiple + t('investmentScope.detail.5umz2vztg1k0'),
                'en': item.multiple + 'x',
                'tc': item.multiple + t('investmentScope.detail.5umz2vztg1k0'),
            }
        })
    })
}
const symbolList = ref([])
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolSearch({ keyword: value })
    if (code != 1) return;
    symbolList.value = data.list.map((item: any) => {
        item.symbol = item.symbol + ',' + item.market
        item.title = item.name[local.lang] + '.' + item.text
        return item
    })
}
const beforeUpload = (file: any): any => {
    return new Promise((resolve, reject) => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isXlsxFile = extension === 'xlsx';
        if (isXlsxFile) {
            resolve(true)
        } else {
            Message.info(t('investmentScope.detail.5umz2vztg340'))
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
        let str = jsonData[0].join(',')
        if (str.includes("Market") || str.includes("Symbol")) {
            addForm.value.symbolList = jsonData
            onSuccess(jsonData);
        } else {
            onError()
        }

    };
    reader.readAsArrayBuffer(file);
}
const download = () => {
    const data = [
        { '市场/Market': 'HKEX', '股票代码/Symbol': '00700' },
        { '市场/Market': 'US', '股票代码/Symbol': 'AAPL' },
        { '市场/Market': 'SZSE', '股票代码/Symbol': '000001' },
        { '市场/Market': 'SSE', '股票代码/Symbol': '600001' },
    ];

    // 将数据转转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 创建一个新的工作簿
    const workbook = XLSX.utils.book_new();

    // 将工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 将工作簿写出为一个Blob对象
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // 保存文件
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'investment-scope-symbol-template.xlsx');
}
//黑名单部分民锋
// const editDisabled = ref(false)
// const formMf = ref([
//     {
//         rule_type: 1,
//         rule_value: 0,
//         status: false,
//     },
//     {
//         rule_type: 2,
//         rule_value: 0,
//         status: false,
//     },
//     {
//         rule_type: 3,
//         rule_value: 0,
//         status: false,
//     },
//     {
//         rule_type: 4,
//         rule_value: 0,
//         status: false,
//     }

// ])
// 全部黑名单
// const getinvestmentScopeTemplateRuleAll = async () => {
//     formMf.value = []
//     const { code, data } = await apiTrs.investmentScopeTemplateRuleAll(
//         {'filter[investment_scope_temp_id]':route.params?.id}
//     );
//     if (code != 1) return;
//     data.forEach((item: any) => {
//         item.status = item.status == 0 ? false : true
//     })
//     formMf.value = data
// }
// getinvestmentScopeTemplateRuleAll()
// const saveBtn = async () => {
//     let arr: any = []
//     formMf.value.forEach((item: any) => {
//         arr.push({ ...item, status: item.status ? 1 : 0 })
//     })
//     let params = {
//         template_id: route.params?.id,
//         rule_list: arr
//     }

//     const { code } = await apiTrs.investmentScopeTemplateRuleUpdate({ data: params });
//     if (code != 1) return;
//     Message.success({ content: '修改成功' })
//     getinvestmentScopeTemplateRuleAll()
//     editDisabled.value = false
// }
{
    getChargeList()
    getData()
}


</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
</style>