<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps">
                <a-steps :current="current">
                    <a-step>{{$t('create.create.5um5fobmaos0')}}</a-step>
                    <a-step>{{$t('create.create.5umz5n79skk0')}}</a-step>
                    <a-step>{{$t('create.create.5umz5n79t9s0')}}</a-step>
                    <a-step>{{$t('create.create.5um8eulhgh00')}}</a-step>
                </a-steps>
            </div>
            <div v-if="current == 1">
                <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
                    :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                    <a-form-item field="name.zh-CN" :label="$t('create.create.5umz5n79tck0')">
                        <a-input v-model="form.data.name['zh-CN']" :placeholder="$t('create.create.5umz5n79tf40')" />
                    </a-form-item>
                    <a-form-item field="name.en" :label="$t('create.create.5umz5n79th40')">
                        <a-input v-model="form.data.name.en" :placeholder="$t('create.create.5umz5n79tjw0')" />
                    </a-form-item>
                    <a-form-item field="name.tc" :label="$t('create.create.5umz5n79tn00')">
                        <a-input v-model="form.data.name.tc" :placeholder="$t('create.create.5umz5n79tps0')" />
                    </a-form-item>
                    <a-form-item field="multiple_id" :label="$t('create.create.5umz5n79tro0')">
                        <a-select allow-clear v-model="form.data.multiple_id" :placeholder="$t('create.create.5um8eulhhb00')">
                            <a-option v-for="item in financeMultipleAll" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item field="market_type" :label="$t('create.create.5umz5n79tu80')">
                        <a-select scrollbar allow-clear v-model="form.data.market_type" :placeholder="$t('create.create.5umz5n79tu80')">
                            <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :label="$t('create.create.5um5fobmjvk0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }"
                            v-model="form.data.desc['zh-CN']" :placeholder="$t('create.create.5um5fobmjy00')" />
                    </a-form-item>
                    <a-form-item :label="$t('create.create.5um5fobmk0g0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.desc.en"
                            :placeholder="$t('create.create.5um5fobmk2w0')" />
                    </a-form-item>
                    <a-form-item :label="$t('create.create.5um5fobmk5g0')">
                        <a-textarea style="flex:1;" :auto-size="{ minRows: 3, maxRows: 5 }" v-model="form.data.desc.tc"
                            :placeholder="$t('create.create.5um5fobmk7k0')" />
                    </a-form-item>
                    <a-form-item>
                        <div style="display: flex;justify-content: flex-end;width: 100%;">
                            <a-space :size="18">
                                <a-button @click="resetField(1)">{{$t('create.create.5um8eulhi9c0')}}</a-button>
                                <a-button type="primary" html-type="submit">
                                    {{$t('create.create.5um8eulhif80')}}
                                </a-button>
                            </a-space>
                        </div>
                    </a-form-item>
                </a-form>
            </div>
            <div v-if="current == 2">
                <a-card style="margin-top: 20px;">
                    <div style="display: flex;align-items: center;">
                        <a-checkbox v-model="form.is_all_market">{{$t('create.create.5umz5n79u0g0')}}</a-checkbox>
                        <p style="margin:0 15px">{{$t('create.create.5umz5n79u340')}}</p>
                        <a-input-number :disabled="!form.is_all_market" hide-button style="width: 20%;"
                            v-model="form.investment_rate" :placeholder="$t('create.create.5um8eulhhjw0')">
                            <template #append>%</template>
                        </a-input-number>
                    </div>
                </a-card>
                <a-card v-if="!form.is_all_market" style="margin-top: 20px;">
                    <template #title>
                        <a-space :size="18">
                            <a-button type="primary" @click="addVisibleBtn(1, 1)">{{$t('create.create.5umz5n79u600')}}</a-button>
                            <a-button @click="download">
                                {{$t('create.create.5umz5n79u880')}}
                            </a-button>
                            <a-button @click="addVisibleBtn(3, 1)">
                                {{$t('create.create.5umz5n79uak0')}}
                            </a-button>
                        </a-space>
                    </template>
                    <div class="tableBox" style="height: 350px;">
                        <a-table :bordered="false" column-resizable :pagination="false"
                            :scroll="charge.list?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                            :data="charge.list" class="table">
                            <template #columns>
                                <a-table-column title="#" :width="50">
                                    <template #cell="{ rowIndex }">
                                        {{ rowIndex + 1 }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('create.create.5umz5n79ucw0')" data-index="symbol">
                                    <template #cell="{ record }">
                                        {{ typeof record.symbol == 'string' && record.symbol.indexOf(',') != -1 ? record.symbol?.split(',')[0] : record.symbol }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('create.create.5umz5n79tu80')" data-index="market"></a-table-column>
                                <!-- <a-table-column :title="'股票名称(中)'"  data-index="name.zh-CN"></a-table-column>
                            <a-table-column :title="$t('create.create.5umz5n79uew0')"  data-index="name.en"></a-table-column>
                            <a-table-column :title="$t('create.create.5umz5n79ugw0')"  data-index="name.tc"></a-table-column> -->
                                <a-table-column :title="$t('create.create.5umz5n79ujo0')" data-index="investment_rate">
                                    <template #cell="{ record }">
                                        {{ record.investment_rate }}%
                                    </template>
                                </a-table-column>
                                <a-table-column fixed="right" :title="$t('create.create.5um5fobmkvc0')" :width="150">
                                    <template #cell="{ record }">
                                        <a-space>
                                            <a-link @click="editBtn(record)" style="padding-left: 0;" type="text"
                                                size="small">
                                                {{ $t('create.create.5umz5n79us80') }}
                                            </a-link>
                                            <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('create.create.5umz709n8z80') }?` ">
                                                <a-link type="text" status="danger" size="small">
                                                    {{ $t('create.create.5um5fobmkxw0') }}
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
                <div style="display: flex;justify-content: flex-end;width: 100%;margin-top:15px;margin-bottom: 15px;">
                    <a-space :size="18">
                        <a-button type="primary" @click="current = 1">
                            {{$t('create.create.5um8eulhiq00')}}
                        </a-button>
                        <a-button type="primary" @click="current = 3">
                            {{$t('create.create.5um8eulhif80')}}
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div v-if="current == 3">
                <!-- <a-card style="margin-top: 20px;">
                    <div v-for="item in formMf" style="display: flex;align-items: center;margin: 15px 0;">
                        <template v-if="item.rule_type == 1">
                            <a-checkbox v-model="item.status"></a-checkbox>
                            <p style="margin:0 15px">{{$t('create.create.5umz5n79uvs0')}}</p>
                            <a-input-number :disabled="!item.status" hide-button style="width: 10%;"
                                v-model="item.rule_value" :placeholder="$t('create.create.5um8eulhhjw0')">
                                <template #append>%</template>
                            </a-input-number>
                        </template>
                        <template v-if="item.rule_type == 2">
                            <a-checkbox v-model="item.status"></a-checkbox>
                            <p style="margin:0 15px">{{$t('create.create.5umz5n79uxo0')}}</p>
                            <a-input-number :disabled="!item.status" hide-button style="width: 10%;"
                                v-model="item.rule_value" :placeholder="$t('create.create.5um8eulhhjw0')">
                                <template #append>%</template>
                            </a-input-number>
                        </template>
                        <template v-if="item.rule_type == 3">
                            <a-checkbox v-model="item.status"></a-checkbox>
                            <p style="margin:0 15px">{{$t('create.create.5umz5n79v0c0')}}</p>
                            <a-input-number :disabled="!item.status" hide-button style="width: 10%;"
                                v-model="item.rule_value" :placeholder="$t('create.create.5um8eulhhjw0')">
                                <template #append>%</template>
                            </a-input-number>
                        </template>
                        <template v-if="item.rule_type == 4">
                            <a-checkbox v-model="item.status"></a-checkbox>
                            <p style="margin:0 15px">{{$t('create.create.5umz5n79v4g0')}}</p>
                            <a-input-number :disabled="!item.status" hide-button style="width: 10%;"
                                v-model="item.rule_value" :placeholder="$t('create.create.5um8eulhhjw0')">
                            </a-input-number>
                            <span style="margin-left:15px">{{$t('create.create.5umz5n79v5w0')}}</span>
                        </template>
                    </div>
                </a-card> -->
                <a-card style="margin-top: 20px;">
                    <template #title>
                        <a-space :size="18">
                            <a-button type="primary" @click="addVisibleBtn(1, 2)">{{$t('create.create.5umz5n79v7g0')}}</a-button>
                            <a-button @click="download">
                                {{$t('create.create.5umz5n79u880')}}
                            </a-button>
                            <a-button @click="addVisibleBtn(3, 2)">
                                {{$t('create.create.5umz5n79uak0')}}
                            </a-button>
                        </a-space>
                    </template>
                    <div class="tableBox" style="height: 420px;">
                        <a-table :bordered="false" column-resizable :pagination="false"
                            :scroll="charge.noList?.length ? { x: '100%', y: '100%' } : undefined" size="small"
                            :data="charge.noList" class="table">
                            <template #columns>
                                <a-table-column title="#" :width="50">
                                    <template #cell="{ rowIndex }">
                                        {{ rowIndex + 1 }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('create.create.5umz5n79ucw0')" data-index="symbol">
                                    <template #cell="{ record }">
                                        {{ typeof record.symbol == 'string' && record.symbol.indexOf(',') != -1 ? record.symbol?.split(',')[0] : record.symbol }}
                                    </template>
                                </a-table-column>
                                <a-table-column :title="$t('create.create.5umz5n79tu80')" data-index="market"></a-table-column>
                                <!-- <a-table-column :title="'股票名称(中)'" data-index="name.zh-CN"></a-table-column>
                            <a-table-column :title="$t('create.create.5umz5n79uew0')" data-index="name.en"></a-table-column>
                            <a-table-column :title="$t('create.create.5umz5n79ugw0')" data-index="name.tc"></a-table-column> -->
                                <a-table-column fixed="right" :title="$t('create.create.5um5fobmkvc0')" :width="100">
                                    <template #cell="{ record }">
                                        <a-space>
                                            <a-popconfirm position="left" @ok="deleteBtn(record, 2)" :content="`${ $t('create.create.5umz709n8z80') }?` ">
                                                <a-link style="padding-left: 0;" type="text" status="danger" size="small">
                                                    {{ $t('create.create.5um5fobmkxw0') }}
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
                            :total="charge.nocount" show-total show-jumper show-page-size />
                    </div>
                </a-card>
                <div style="display: flex;justify-content: flex-end;width: 100%;margin-top:15px">
                    <a-space :size="18">
                        <a-button type="primary" @click=" current = 2">
                            {{$t('create.create.5um8eulhiq00')}}
                        </a-button>
                        <a-button type="primary" @click="savaBtn">
                            {{$t('create.create.5um8eulhiu00')}}
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div v-if="current == 4" style="height: 100%;display: flex;align-items: center;">
                <div style="width: 600px;margin: auto;">
                    <a-result status="success">
                        <template #subtitle>
                            <p style="margin-bottom: 15px;">{{$t('create.create.5umyjdmr7840')}}</p>

                        </template>
                        <template #extra>
                            <a-space style="margin-top: 30px;">
                                <a-button @click="resetField">{{$t('create.create.5um5fobml500')}}</a-button>
                                <a-button type='primary' @click="router.back()">{{$t('create.create.5um8eulhj7g0')}}</a-button>
                                <!-- <a-button
                                    @click="router.replace({ name: 'configTemplateInvestmentScopeDetail', params: { id: id } })">{{$t('create.create.5um8eulhjbk0')}}</a-button> -->
                            </a-space>
                        </template>
                    </a-result>
                </div>
            </div>
        </a-card>
        <a-modal :mask-closable=false v-model:visible="addVisible" :on-before-ok="handleAdd" @close="onCloseAdd">
            <template #title>
                <span v-if="visibleNoTitle == 1">
                    {{ visibleTitle == 2 ? $t('create.create.5umz5n79v9k0') : $t('create.create.5umz5n79vb40') }}
                </span>
                <span v-else>
                    {{ $t('create.create.5umz5n79vck0') }}
                </span>
            </template>
            <div style="display: flex;">
                <a-form layout="vertical" ref="formRefs" :model="addForm" :rules="(form.ruleCreate as any)">
                    <a-form-item v-if="visibleTitle != 3" field="symbol" :label="$t('create.create.5umz5n79ucw0')">
                        <a-select v-model:model-value="addForm.symbol" allow-search :placeholder="$t('create.create.5um8eulhgww0')"
                            @search="getSymbolList">
                            <a-option @click="symbolBtn(item)" v-for="item in (symbolList as any)" :value="item.symbol">
                                {{ item.title }}
                            </a-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="visibleNoTitle == 1" field="investment_rate" :label="$t('create.create.5umz5n79ujo0')">
                        <a-input-number hide-button style="width: 100%;" v-model="addForm.investment_rate"
                            :placeholder="$t('create.create.5um8eulhhjw0')">
                            <template #append>%</template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item v-if="visibleTitle == 3" allow-search field="symbolList" :label="$t('create.create.5umz5n79vf80')">
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
import { ref } from 'vue';
import { useEnums } from '@/hooks/enums'
import * as XLSX from 'xlsx';
// @ts-ignore
import { saveAs } from 'file-saver';
const local = useLocal()
const formRef = ref()
const formRefs = ref()
const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const current = ref(1)
const form: any = reactive({
    show: false,
    loading: false,
    data: {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        desc: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        market_type: '',
        multiple_id: ''

    },
    rules: {
        'name.zh-CN': [{ required: true, message: t('create.create.5umz5n79tf40') }],
        'name.en': [{ required: true, message: t('create.create.5umz5n79tps0') }],
        'name.tc': [{ required: true, message: t('create.create.5umz5n79tjw0') }],
        market_type: [{ required: true, message: t('create.create.5um8eulhhb00') }],
        'desc.zh-CN': [{ required: true, message: t('create.create.5um5fobmjy00') }],
        'desc.en': [{ required: true, message: t('create.create.5um5fobmk2w0') }],
        'desc.tc': [{ required: true, message: t('create.create.5um5fobmk7k0') }],
        'multiple_id': [{ required: true, message: t('create.create.5umz5n79vhs0') }],
    },
    ruleCreate: {
        symbol: [{ required: true, message: t('create.create.5umz5n79vnw0') }],
        investment_rate: [{ required: true, message: t('create.create.5umz5n79vps0') }],
        symbolList: [{ required: true, message: t('create.create.5umz5n79vu40') }]
    },
    is_all_market: false,
    investment_rate: 0,
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    current.value = 2
}
const charge: any = reactive({
    list: [],
    countList: [],
    noList: [],
    countnoList: [],
    count:0,
    nocount:0,
    data:{
        page: 1,
        per_page: 10
    },
    noData:{
        page: 1,
        per_page: 10
    }
})
const listData = (type:any) =>{
    if (type == '1') {
        charge.list = charge.countList.slice((charge.data.page -1) * charge.data.per_page, charge.data.per_page * charge.data.page) 
    }
    if (type == '2') {
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
const visibleTitle:any = ref(1)
const visibleNoTitle = ref(1)
const addVisible = ref(false)
let addForm: any = ref({
    symbol: '',
    symbolList: [],
    status: false,
    investment_rate: 0,
})
const addVisibleBtn = (num: any, noNum: any) => {
    visibleNoTitle.value = noNum
    visibleTitle.value = num
    addVisible.value = true
}
let isReplace = ref(0)
const handleAdd = async () => {
    const validate = await formRefs.value?.validate()
    if (validate) return false;
    if (visibleNoTitle.value == 2) {
        let obj = { ...addForm.value }
        let index = charge.countnoList.findIndex((item: any) => item.symbol == addForm.value.symbol)
        if (index != -1) {
            Message.warning(t('create.create.5umz5n79vw00'))
            return false
        }
        if (visibleTitle.value == 2) {
            let index = charge.countnoList.findIndex((item: any) => item.id == addForm.value.id)
            obj.symbol = symbolData.value.symbol
            charge.countnoList[index] = { ...symbolData.value, ...obj, type: 2 }
        } else if (visibleTitle.value == 1) {
            // addForm.value.id = Math.random()
            charge.countnoList.push({ ...symbolData.value, ...obj, id: Math.random(), type: 2 })
        } else if (visibleTitle.value == 3) {
            addForm.value.symbolList[0].response.forEach((item: any, index: number) => {
                if (index != 0 && item?.length) {
                    charge.countnoList.push({
                        market: item[0],
                        security_type: '1',
                        symbol: item[1],
                        investment_rate: addForm.value.investment_rate,
                        type: 2,
                        id: Math.random(),
                        name: {
                            'zh-CN': '',
                            'en': '',
                            'tc': '',
                        }
                    })
                }
            })
        }
        charge.nocount = charge.countnoList.length
    } else {
        let obj = { ...addForm.value }
        let index = charge.countList.findIndex((item: any) => item.symbol == addForm.value.symbol)
        if (index != -1 && isReplace.value == 0) {
            Message.warning(t('create.create.5umz5n79vxk0'))
            isReplace.value = 1
            return false
        }
        if (index != -1 && isReplace.value == 1) {
            obj.symbol = symbolData.value.symbol
            charge.countList[index] = { ...symbolData.value, ...obj }
            return true
        }
        if (visibleTitle.value == 2) {
            let index = charge.list.findIndex((item: any) => item.id == addForm.value.id)
            obj.symbol = symbolData.value.symbol
            charge.countList[index] = { ...symbolData.value, ...obj, type: 1 }
        } else if (visibleTitle.value == 1) {
            // addForm.value.id = Math.random()
            charge.countList.push({ ...symbolData.value, ...obj, id: Math.random(), type: 1 })
        } else if (visibleTitle.value == 3) {
            addForm.value.symbolList[0].response.forEach((item: any, index: number) => {
                if (index != 0 && item?.length) {
                    charge.countList.push({
                        market: item[0],
                        security_type: '1',
                        symbol: item[1],
                        investment_rate: addForm.value.investment_rate,
                        type: 1,
                        id: Math.random(),
                        name: {
                            'zh-CN': '',
                            'en': '',
                            'tc': '',
                        }
                    })
                }
            })
        }
        console.log('visibleTitle.value',visibleTitle.value);
        
        charge.count = charge.countList.length
    }
}
const editBtn = async (val: any) => {
    visibleTitle.value = 2
    visibleNoTitle.value = 1
    if (val.name[local.lang]) {
        addForm.value.symbol = typeof val.symbol == 'string' && val.symbol.indexOf(',') != -1 ? val.name[local.lang] + '.' + val.symbol.split(',')[0] + '.' + val.market : val.name[local.lang] + '.' + val.symbol + '.' + val.market 
    } else {
        addForm.value.symbol = typeof val.symbol == 'string' && val.symbol.indexOf(',') != -1 ? val.symbol.split(',')[0] + '.' + val.market : val.symbol + '.' + val.market
    }
    symbolData.value = val
    addForm.value.id = val.id
    addForm.value.investment_rate = Number(val.investment_rate)
    addVisible.value = true
}
watch(
    () => charge.count,
    (newval:any, oldval:any) => {
        if (newval != oldval) {
            listData('1')
        }
    }
);
watch(
    () => charge.nocount,
    (newval:any, oldval:any) => {
        if (newval != oldval) {
            listData('2')
        }
    }
);
const deleteBtn = async (val: any, num?: any) => {
    if (num == 2) {
        let index = charge.countnoList.findIndex((item: any) => item.id == val.id)
        charge.countnoList.splice(index, 1)
        charge.nocount = charge.countnoList.length
    } else {
        let index = charge.countList.findIndex((item: any) => item.id == val.id)
        charge.countList.splice(index, 1)
        charge.count = charge.countList.length
    }

}
const symbolData = ref()
const symbolBtn = (val: any) => {
    symbolData.value = val
}
const onCloseAdd = () => {
    addForm.value = {
        item_list: [],
        symbolList: [],
        investment_rate: 0,
    }
    isReplace.value = 0
    formRefs.value.resetFields()
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
            Message.info(t('create.create.5umz5n79vz40'))
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
            console.log('jsonData',jsonData);
            
            onSuccess(jsonData);
        } else {
            onError()
        }

    };
    reader.readAsArrayBuffer(file);
}
const id = ref()
const savaBtn = async () => {
    let param: any = {
        name: form.data.name,
        desc: form.data.desc,
        multiple_id: form.data.multiple_id,
        market_type: form.data.market_type,
        is_all_market: form.is_all_market ? 1 : 0,
        investment_rate: form.investment_rate,
        item_list: [],
        // rule_list:[],
    }
    let arr = [...charge.countList, ...charge.countnoList]
    arr.forEach((item: any) => {
        param.item_list.push({
            market: item.market,
            security_type: '1',
            symbol: item.symbol,
            investment_rate: item.investment_rate,
            type: item.type
        })
    })
    // formMf.value.forEach((item:any)=>{
    //     param.rule_list.push({
    //         rule_type:item.rule_type,
    //         rule_value:item.rule_value,
    //         status:item.status?1:0,
    //     })
    // })
    // investmentScopeTemplateRuleCreate
    if (param.item_list?.length) {
        param.item_list.forEach((item: any) => {
            item.symbol = typeof item.symbol == 'string' && item.symbol.indexOf(',') != -1 ? item.symbol.split(',')[0] + '' : item.symbol + ""
        })
    }
    const { code, data } = await apiTrs.investmentScopeTemplateCreate({ data: param })
    if (code != 1) return;
    id.value = data.template_id
    current.value = 4
}

const resetField = (num?: any) => {
    form.data = {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        desc: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        market_type: '',
        multiple_id: ''
    }
    form.investment_rate = 0
    form.is_all_market = false
    charge.list = []
    charge.countList = []
    charge.noList = []
    charge.countnoList = []
    charge.count = 0
    charge.nocount = 0
    charge.data = {
        page: 1,
        per_page: 10
    }
    charge.noData = {
        page: 1,
        per_page: 10
    }
    formMf.value = [
        {
            rule_type: 1,
            rule_value: 0,
            status: false,
        },
        {
            rule_type: 2,
            rule_value: 0,
            status: false,
        },
        {
            rule_type: 3,
            rule_value: 0,
            status: false,
        },
        {
            rule_type: 4,
            rule_value: 0,
            status: false,
        }
    ]
    if (num == 1) {
        formRef.value.resetFields()
    }
    formRefs.value.resetFields()
    current.value = 1

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
                'zh-CN': item.multiple + t('create.create.5umz5n79w0s0'),
                'en': item.multiple + 'x',
                'tc': item.multiple + t('create.create.5umz5n79w0s0'),
            }
        })
    })
}
getfinanceMultipleAll()

//黑名单部分民锋
const formMf = ref([
    {
        rule_type: 1,
        rule_value: 0,
        status: false,
    },
    {
        rule_type: 2,
        rule_value: 0,
        status: false,
    },
    {
        rule_type: 3,
        rule_value: 0,
        status: false,
    },
    {
        rule_type: 4,
        rule_value: 0,
        status: false,
    }

])
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

</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 20px;
}
</style>