<template>
    <div>
        <a-card :loading="loading" v-permission="['trsAccountDetailRiskControlUpdate']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('riskControlLine.riskControlLine.5um8a9qna1s0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false; getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('riskControlLine.riskControlLine.5um8a9qnbvk0')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading"
                            :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('riskControlLine.riskControlLine.5um8a9qnc4g0')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('riskControlLine.riskControlLine.5um8a9qnc9k0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qncd40')">
                            
                                <a-tag size="small"
                                :color="form.data?.risk_control_status == 1 ? '#00b42a' : form.data?.risk_control_status == 2 ? '#ff7d00' : '#f53f3f'">
                                {{ useEnumsFormat('trs.account.risk_control_status', form.data?.risk_control_status) }}
                            </a-tag>
                            <a-link style="margin-left:15px" v-permission="['trsAccountDetailRiskControlRecord']"
                                @click="router.push({ name: 'trsRiskControlRecord', query: { trs_account: form.data?.account } })">{{$t('riskControlLine.riskControlLine.5um8a9qnchc0')}}</a-link>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="risk_control_calculate_type" :label="$t('riskControlLine.riskControlLine.5um8a9qnck40')">
                            <div v-if="!form.setup">
                                <a-tag>
                                    {{ useEnumsFormat('trs.account.risk_control_calculate_type',
                                        form.data.risk_control_calculate_type) }}
                                </a-tag>
                            </div>
                            <a-select v-else allow-clear v-model="form.data.risk_control_calculate_type"
                                :placeholder="$t('riskControlLine.riskControlLine.5um8a9qncmw0')">
                                <a-option v-for="item in useEnums('trs.account.risk_control_calculate_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="expire_is_close_position" :label="$t('riskControlLine.riskControlLine.5um8a9qncpw0')">
                            <div v-if="!form.setup">
                                <a-tag>
                                    {{ useEnumsFormat('trs.account.risk_control_position_type',
                                        form.data.expire_is_close_position) }}
                                </a-tag>
                            </div>
                            <a-select v-else allow-clear v-model="form.data.expire_is_close_position"
                                :placeholder="$t('riskControlLine.riskControlLine.5um8a9qncmw0')">
                                <a-option v-for="item in useEnums('trs.account.risk_control_position_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card style="margin-top: 20px;" v-permission="['trsAccountInvestmentScopeList']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('riskControlLine.riskControlLine.5um8a9qncss0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button type="primary" v-if="!editShow" @click="editShow = true">
                            {{$t('riskControlLine.riskControlLine.5um8a9qnc9k0')}}
                        </a-button>
                        <template v-else>
                            <a-button v-permission="['trsRiskControlCreate']" type="primary" @click="createInfo.show = true">
                                <template #icon>
                                    <icon-plus />
                                </template>
                                {{$t('riskControlLine.riskControlLine.5um8a9qncw40')}}
                            </a-button>
                            <a-button @click="editShow = false">
                                {{$t('riskControlLine.riskControlLine.5um8a9qnd000')}}
                            </a-button>
                        </template>
                    </a-space>
                </div>
            </template>
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
                        <a-table-column :title="$t('riskControlLine.riskControlLine.5um8a9qnd2o0')">
                            <template #cell="{ record }">
                                <div>
                                    {{ record.name[local.lang] }}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControlLine.riskControlLine.5um8a9qnd5k0')" >
                            <template #cell="{ record }">
                                <div>
                                    {{ record.loss_value }}%
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControlLine.riskControlLine.5um8a9qnd900')" >
                            <template #cell="{ record }">
                                <div v-if="record.trade_status == 2||record.trade_status == 3">
                                    <a-tag color="blue">{{ record.trade_status == '2' ? $t('riskControlLine.riskControlLine.5um8a9qndc80') : $t('riskControlLine.riskControlLine.5um8a9qndfc0') }}</a-tag>
                                </div>
                                <div v-else>
                                    {{$t('riskControlLine.riskControlLine.5um8a9qndic0')}}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControlLine.riskControlLine.5um8a9qndl40')">
                            <template #cell="{ record }">
                                <div v-if="record.is_cancel_order">
                                    <a-tag color="blue">
                                        {{$t('riskControlLine.riskControlLine.5um8a9qndp00')}}
                                    </a-tag>
                                </div>
                                <div v-else>
                                    {{$t('riskControlLine.riskControlLine.5um8a9qndic0')}}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControlLine.riskControlLine.5um8a9qnduw0')">
                            <template #cell="{ record }">
                                <div v-if="record.is_close_position">
                                    <a-tag color="blue">
                                        {{$t('riskControlLine.riskControlLine.5um8a9qndxc0')}}
                                    </a-tag>
                                </div>
                                <div v-else>
                                    {{$t('riskControlLine.riskControlLine.5um8a9qndic0')}}
                                </div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('riskControlLine.riskControlLine.5um8a9qne000')" :width="150"
                            v-if="$permission(['trsRiskControlUpdate', 'trsRiskControlDelete'])">
                            <template #cell="{ record }">
                                <a-space v-if="editShow">
                                    <a-link v-permission="['trsRiskControlUpdate']"
                                        @click="showUpdate(record)">{{$t('riskControlLine.riskControlLine.5um8a9qnc9k0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="$t('riskControlLine.riskControlLine.5um8a9qne2c0')">
                                        <a-link  v-permission="['trsRiskControlDelete']"
                                            status="danger">{{$t('riskControlLine.riskControlLine.5um8a9qne4s0')}}</a-link>
                                    </a-popconfirm>
                                </a-space>
                                <a-space v-else>
                                    {{$t('riskControlLine.riskControlLine.5um8a9qne6s0')}}
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <!-- <div class="pagination">
                <a-pagination size="small" @change="getInvestmentAcopeList" @page-size-change="getInvestmentAcopeList"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div> -->
        </a-card>
        <!-- 新增 -->
        <a-modal width="600px" @close="onCloseAdd" draggable v-model:visible="createInfo.show" :title="$t('riskControlLine.riskControlLine.5um8a9qncw40')"
            @cancel="createInfo.show = false" @before-ok="create">
            <a-form layout="vertical" ref="createFormRef" :model="addForm" :rules="(rules as any)">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="name.zh-CN" :label="$t('riskControlLine.riskControlLine.5um8a9qne8s0')">
                            <a-input v-model="addForm.name['zh-CN']" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qneaw0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="name.en" :label="$t('riskControlLine.riskControlLine.5um8a9qned00')">
                            <a-input v-model="addForm.name.en" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qnefc0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="name.tc" :label="$t('riskControlLine.riskControlLine.5um8a9qneho0')">
                            <a-input v-model="addForm.name.tc" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qnek00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="loss_value" :label="$t('riskControlLine.riskControlLine.5um8a9qnd5k0')">
                            <div style="width: 100%;">
                            <a-input-number hide-button v-model="addForm.loss_value" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qnd5k0')">
                                <template #suffix>
                                    %
                                </template>
                            </a-input-number>
                            <p style="margin-top:5px;font-size: 13px;">{{$t('riskControlLine.riskControlLine.5um8b1ncoho0')}}{{ addForm.loss_value }}%{{$t('riskControlLine.riskControlLine.5um8b1ncpe80')}}</p>
                        </div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qnd900')">
                            <a-checkbox-group :max="1" v-model="addForm.trade_status">
                                <a-checkbox value="2">{{$t('riskControlLine.riskControlLine.5um8a9qndc80')}}</a-checkbox>
                                <a-checkbox value="3">{{$t('riskControlLine.riskControlLine.5um8a9qndfc0')}}</a-checkbox>
                            </a-checkbox-group>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qndl40')">
                            <a-checkbox v-model="addForm.is_cancel_order">{{$t('riskControlLine.riskControlLine.5um8a9qndp00')}}</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qnduw0')">
                            <a-checkbox v-model="addForm.is_close_position">{{$t('riskControlLine.riskControlLine.5um8a9qndxc0')}}</a-checkbox>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
        <!-- 编辑 -->
        <a-modal width="600px" draggable @close="onCloseAdd" v-model:visible="updateInfo.show" :title="$t('riskControlLine.riskControlLine.5um8a9qnc9k0')"
            @cancel="updateInfo.show = false" @before-ok="update">
            <a-form layout="vertical" ref="updateFormRef" :model="addForm" :rules="(rules as any)">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="name.zh-CN" :label="$t('riskControlLine.riskControlLine.5um8a9qne8s0')">
                            <a-input v-model="addForm.name['zh-CN']" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qneaw0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="name.en" :label="$t('riskControlLine.riskControlLine.5um8a9qned00')">
                            <a-input v-model="addForm.name.en" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qnefc0')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="name.tc" :label="$t('riskControlLine.riskControlLine.5um8a9qneho0')">
                            <a-input v-model="addForm.name.tc" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qnek00')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item field="loss_value" :label="$t('riskControlLine.riskControlLine.5um8a9qnd5k0')">
                            <div style="width: 100%;">
                            <a-input-number hide-button v-model="addForm.loss_value" :placeholder="$t('riskControlLine.riskControlLine.5um8a9qnd5k0')">
                                <template #suffix>
                                    %
                                </template>
                            </a-input-number>
                            <p style="margin-top:5px;font-size: 13px;">{{$t('riskControlLine.riskControlLine.5um8b1ncoho0')}}{{ addForm.loss_value }}%{{$t('riskControlLine.riskControlLine.5um8b1ncpe80')}}</p>
                            </div>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qnd900')">
                            <a-checkbox-group :max="1" v-model="addForm.trade_status">
                                <a-checkbox value="2">{{$t('riskControlLine.riskControlLine.5um8a9qndc80')}}</a-checkbox>
                                <a-checkbox value="3">{{$t('riskControlLine.riskControlLine.5um8a9qndfc0')}}</a-checkbox>
                            </a-checkbox-group>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qndl40')">
                            <a-checkbox v-model="addForm.is_cancel_order">{{$t('riskControlLine.riskControlLine.5um8a9qndp00')}}</a-checkbox>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="12">
                        <a-form-item :label="$t('riskControlLine.riskControlLine.5um8a9qnduw0')">
                            <a-checkbox v-model="addForm.is_close_position">{{$t('riskControlLine.riskControlLine.5um8a9qndxc0')}}</a-checkbox>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
// const searchFormRef = ref()
const createFormRef = ref()
const updateFormRef = ref()
const loading = ref(false)
const createInfo: any = reactive({
    show: false,
    loading: false,
    symbolList: [],
    data: {
        market: '',
        security_type: '',
        symbol: '',
        investment_rate: 0,
        type: ''
    }
})
const updateInfo: any = reactive({
    show: false,
    loading: false,
    data: {
        id: '',
        market: '',
        security_type: '',
        symbol: '',
        investment_rate: 0,
        type: ''
    }
})
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    investmentScopeTemplate: [],
    data: {
        expire_is_close_position:'',
        risk_control_calculate_type: '',
        investment_scope_temp_id: ''
    }
})
const searchInfo = reactive({
    show: false,
    data: {
        symbol: '',
        type: '',
        market: '',
        page: 1,
        per_page: 20
    }
})
const tableData: any = reactive({
    list: [],
    count: 0,
    loading: false
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.accountUpdate({
        id: form.data.id,
        data: {
            expire_is_close_position:form.data.expire_is_close_position,
            risk_control_calculate_type: form.data.risk_control_calculate_type,
            investment_scope_temp_id: form.data.investment_scope_temp_id
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    form.setup = false
    getData()
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.accountInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    // form.data.warn_value = Number(data.warn_value)
    // form.data.close_value = Number(data.close_value)
}
const getInvestmentAcopeList = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.trsRiskControlList({
        ...useFilter({
            trs_account_id: route.params?.id,
            type: searchInfo.data.type ? searchInfo.data.type : null
        })
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.count = data.count
    tableData.list = data.list
}
const showUpdate = (record: any) => {
    addForm.value.name = { ...record.name }
    addForm.value.id = record.id
    addForm.value.loss_value = Number(record.loss_value)
    addForm.value.is_close_position = record.is_close_position == 1 ? true : false
    addForm.value.is_cancel_order = record.is_cancel_order == 1 ? true : false
    addForm.value.trade_status = record.trade_status == 2 ? ['2'] : record.trade_status == 3 ? ['3'] : []
    updateInfo.show = true
}
const create = async () => {
    const validate = await createFormRef.value?.validate()
    if (validate) return false;
    if (tableData.count > 0) {
        if (addForm.value.loss_value <= Number(tableData.list[tableData.count - 1].loss_value)) {
            Message.info(t('riskControlLine.riskControlLine.5um8a9qnem40'))
            return false
        }
    }
    createInfo.loading = true
    let obj = { ...addForm.value }
    if (tableData.count == 0) {
        obj.level = 1
    } else {
        obj.level =  tableData.list[tableData.count - 1].level+1
    }
    delete obj.id
    obj.is_close_position = obj.is_close_position ? 1 : 0
    obj.is_cancel_order = obj.is_cancel_order ? 1 : 0
    if (obj.trade_status?.length) {
        obj.trade_status = obj.trade_status[0]
    } else {
        obj.trade_status = 1
    }
    const { code, msg } = await apiTrs.trsRiskControlCreate({
        data: {
            ...obj,
            trs_account_id: route.params?.id,
        }
    })
    createInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    createInfo.show = false
    getInvestmentAcopeList()
}
const update = async () => {
    const validate = await updateFormRef.value?.validate()
    if (validate) return false;
    let index = tableData.list.findIndex((item: any) => item.id == addForm.value.id)
        if (index == 0 && tableData.list?.length > 1) {
            if (Number(tableData.list[1].loss_value) < addForm.value.loss_value) {
                Message.info(t('riskControlLine.riskControlLine.5um8a9qnep00'))
                return false
            }
        } else if (index == 0 && tableData.list?.length == 1) {
        } else {
            if (tableData.list[index + 1]) {
                if (Number(tableData.list[index - 1].loss_value) < addForm.value.loss_value && Number(tableData.list[index + 1].loss_value) > addForm.value.loss_value) {
                } else {
                    Message.info(t('riskControlLine.riskControlLine.5um8a9qnep00'))
                    return false
                }
            } else {
                if (Number(tableData.list[index - 1].loss_value) < addForm.value.loss_value) {

                } else {
                    Message.info(t('riskControlLine.riskControlLine.5um8a9qnep00'))
                    return false
                }
            }

        }
    let obj = { ...addForm.value }
    if (tableData.count == 0) {
        obj.level = 1
    } else {
        obj.level = tableData.count + 1
    }
    obj.is_close_position = obj.is_close_position ? 1 : 0
    obj.is_cancel_order = obj.is_cancel_order ? 1 : 0
    if (obj.trade_status?.length) {
        obj.trade_status = obj.trade_status[0]
    } else {
        obj.trade_status = 1
    }
    createInfo.loading = true
    const { code, msg } = await apiTrs.trsRiskControlUpdate({
        data: {
            ...obj,
            trs_account_id: route.params?.id,
        }
    })
    createInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    createFormRef.value?.resetFields()
    createInfo.show = false
    getInvestmentAcopeList()
}
const del = async (record: any) => {
    const { code, msg } = await apiTrs.trsRiskControlDelete({
        id: [record.id],
        trs_account_id: route.params?.id
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getInvestmentAcopeList()
}

const getInvestmentScopeTemplate = async () => {
    const { code, data } = await apiTrs.investmentScopeTemplateAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    form.investmentScopeTemplate = data?.length ? data : []
}
const editShow = ref(false)
const addForm: any = ref({
    name: {
        'zh-CN': '',
        'en': '',
        'tc': '',
    },
    level: '1',
    loss_value: 0,
    trade_status: [],
    is_close_position: false,
    is_cancel_order: false,
    id: ''
})
const rules = ref({
    loss_value: [{ required: true, message: t('riskControlLine.riskControlLine.5um8a9qner40') }],
    'name.zh-CN': [{ required: true, message: t('riskControlLine.riskControlLine.5um8a9qneaw0') }],
    'name.en': [{ required: true, message: t('riskControlLine.riskControlLine.5um8a9qnefc0') }],
    'name.tc': [{ required: true, message: t('riskControlLine.riskControlLine.5um8a9qnek00') }],
})
const onCloseAdd = () => {
    addForm.value = {
        name: {
            'zh-CN': '',
            'en': '',
            'tc': '',
        },
        level: '1',
        loss_value: 0,
        trade_status: [],
        is_close_position: false,
        is_cancel_order: false,
        id: ''
    }
    createFormRef.value.resetFields()
    updateFormRef.value.resetFields()
}

onMounted(() => {
    route.query?.setup && (form.setup = true)
})
{
    getData()
    getInvestmentScopeTemplate()
    getInvestmentAcopeList()
}
</script>