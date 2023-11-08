<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <!-- <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('financeMultiple.financeMultiple.5umz9vlzltg0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('financeMultiple.financeMultiple.5umz9vlzmf00')">
                                    <a-option v-for="item in useEnums('market.market_type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form> -->
            </div>
            <div class="buttonBox">
                <a-space :size="18"></a-space>

                <a-space :size="18">
                    <a-button v-permission="['configFinanceMultipleCreate']" @click="visibleBtn(1)" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('financeMultiple.financeMultiple.5umz9vlzml80')}}
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
                        <a-table-column :title="$t('financeMultiple.financeMultiple.5umz9vlzmqs0')" data-index="multiple">
                            <template #cell="{ record }">
                                {{ record.multiple }}{{ $t('financeMultiple.financeMultiple.5umz9vlzmvs0') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('financeMultiple.financeMultiple.5umz9vlzn0w0')" data-index="trade_interest"></a-table-column>
                        <a-table-column :title="$t('financeMultiple.financeMultiple.5umz9vlzn7c0')" data-index="finance_interest"></a-table-column>
                        <a-table-column :title="$t('financeMultiple.financeMultiple.5umz9vlzncw0')" data-index="risk_control_temp_info.name"></a-table-column>
                        <a-table-column :title="$t('financeMultiple.financeMultiple.5umz9vlzno00')" data-index="investment_scope_temp_info.name"></a-table-column>
                        <a-table-column :title="$t('financeMultiple.financeMultiple.5umz9vlzltg0')" :width="80">
                            <template #cell="{ record }">
                                <span v-if="$permission(['configFinanceMultipleUpdateStatus'])">
                                    <a-switch size="small" @change="handleChangeIntercept(record)" v-model="record.status"
                                        :checked-value="1" :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('otc.package.charge.status', record.status) }}
                                </span>
                            </template>

                        </a-table-column>
                        <a-table-column v-if="$permission(['configFinanceMultipleUpdate', 'configFinanceMultipleDelete'])"
                            fixed="right" :title="$t('financeMultiple.financeMultiple.5umz9vlznsw0')" :width="150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['configFinanceMultipleUpdate']" @click="visibleBtn(2, record)"
                                        style="padding-left: 0;" type="text" size="small">
                                        {{ $t('financeMultiple.financeMultiple.5umz9vlznzc0') }}
                                    </a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('financeMultiple.financeMultiple.5umzayxisvk0') }?` ">
                                        <a-button v-permission="['configFinanceMultipleDelete']" type="text" status="danger"
                                            size="small">
                                            {{ $t('financeMultiple.financeMultiple.5umz9vlzo4o0') }}
                                        </a-button>
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
        <a-modal :width="local.lang =='en'?'850px':'600px'" :mask-closable=false v-model:visible="formVisible" :on-before-ok="handleForm"
            @close="onCloseForm">
            <template #title>
                {{ statusVisible == 1 ? $t('financeMultiple.financeMultiple.5umz9vlzo9o0') : $t('financeMultiple.financeMultiple.5umz9vlzoeg0') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRef" :rules="(formRules as any)" :model="form" layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="multiple" :label="$t('financeMultiple.financeMultiple.5umz9vlzmqs0')">
                                <a-input-number hide-button style="width: 100%;" v-model="form.multiple" :placeholder="$t('financeMultiple.financeMultiple.5umz9vlzojc0')">
                                    <template #append>{{$t('financeMultiple.financeMultiple.5umz9vlzmvs0')}}</template>
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="trade_interest" :label="$t('financeMultiple.financeMultiple.5umz9vlzn0w0')">
                                <a-input-number hide-button style="width: 100%;" v-model="form.trade_interest"
                                    :placeholder="$t('financeMultiple.financeMultiple.5umz9vlzojc0')">
                                    <template #append>{{$t('financeMultiple.financeMultiple.5umz9vlzmvs0')}}</template>
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item field="finance_interest" :label="$t('financeMultiple.financeMultiple.5umz9vlzn7c0')">
                                <a-input-number hide-button style="width: 100%;" v-model="form.finance_interest"
                                    :placeholder="$t('financeMultiple.financeMultiple.5umz9vlzojc0')">
                                    <template #append>{{$t('financeMultiple.financeMultiple.5umz9vlzmvs0')}}</template>
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('financeMultiple.financeMultiple.5umz9vlzncw0')">
                                <a-select v-model="form.risk_control_temp_id" :placeholder="$t('financeMultiple.financeMultiple.5umz9vlzmf00')">
                                    <a-option v-for="items of controlTemplateList" :value="items.id" :label="items.name" />
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('financeMultiple.financeMultiple.5umz9vlzno00')">
                                <a-select allow-clear v-model="form.investment_scope_temp_id" :placeholder="$t('financeMultiple.financeMultiple.5umz9vlzmf00')">
                                    <a-option v-for="items of investmentScopeTemplateAll" :value="items.id"
                                        :label="items.name" />
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="12">
                            <a-form-item :label="$t('financeMultiple.financeMultiple.5umz9vlzoqo0')">
                                <a-switch :disabled='switchDisabled' :checked-value="1" :unchecked-value="0" v-model="form.status" />
                            </a-form-item>
                        </a-col>
                    </a-row>

                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
import { useEnumsFormat } from '@/hooks/enums'
// import dayjs from 'dayjs'
const local = useLocal()
// const router = useRouter()
// const searchFormRef = ref()
const { t } = useI18n();
const switchDisabled:any = ref(true)
const searchInfo = reactive({
    show: false,
    data: {
        market: '',
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
    const { code, data } = await apiTrs.financeMultipleList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiTrs.financeMultipleUpdate({
        data: {
            id: val.id,
            status: val.status
        }
    })
    if (code != 1) {
        val.status = val.status == 0 ? 1 : 0
        return
    };
    Message.success({
        content: t('financeMultiple.financeMultiple.5umz9vlzovs0'),
    })
    getData();
}
// 删除交易对手明细
const deleteBtn = async (val: any) => {
    const { code } = await apiTrs.financeMultipleDelete({ 'id': [val.id] })
    if (code != 1) return;
    getData();
}
const formVisible = ref(false)
const statusVisible = ref(1)
const formRef = ref()
const formRules = ref({
    multiple: [{ required: true, message: t('financeMultiple.financeMultiple.5umz9vlzojc0') }],
    finance_interest: [{ required: true, message: t('financeMultiple.financeMultiple.5umz9vlzojc0') }],
    trade_interest: [{ required: true, message: t('financeMultiple.financeMultiple.5umz9vlzojc0') }],
    investment_scope_temp_id: [{ required: true, message: t('financeMultiple.financeMultiple.5umz9vlzmf00') }],
    risk_control_temp_id: [{ required: true, message: t('financeMultiple.financeMultiple.5umz9vlzmf00') }],
})
const form: any = ref({
    multiple: 0,
    status: 0,
    finance_interest: 0,
    trade_interest: 0,
    investment_scope_temp_id: '',
    risk_control_temp_id: ''
})
const visibleBtn = (num: any, val?: any) => {
    statusVisible.value = num
    if (num == 2) {
        const { trade_interest, investment_scope_temp_id, finance_interest, risk_control_temp_id, status, multiple } = val
        form.value.trade_interest = Number(trade_interest)
        form.value.multiple = Number(multiple)
        form.value.investment_scope_temp_id = investment_scope_temp_id == 0 ? '' : investment_scope_temp_id
        form.value.risk_control_temp_id = risk_control_temp_id == 0 ? '' : risk_control_temp_id
        form.value.status = status
        form.value.id = val.id
        form.value.finance_interest = Number(finance_interest)
    }
    formVisible.value = true
}
const handleForm = async () => {
    const res = await formRef.value?.validate();
    if (res) return false
    let param = { ...form.value }
    param.risk_control_temp_id = param.risk_control_temp_id || 0
    param.investment_scope_temp_id = param.investment_scope_temp_id || 0
    if (param.id) {
        const { code } = await apiTrs.financeMultipleUpdate({
            data: param
        })
        if (code != 1) return false;
        getData();
        return true
    } else {
        const { code } = await apiTrs.financeMultipleCreate({
            data: param
        })
        if (code != 1) return false;
        getData();
        return true
    }

}
watch(
    () => form.value,
    (neeVal) => {
        if (neeVal.investment_scope_temp_id && neeVal.risk_control_temp_id) {
            switchDisabled.value = false
        }else{
            switchDisabled.value = true
            form.value.status = 0
        }
    },
    {
        deep:true
    }
);
const onCloseForm = () => {
    form.value = {
        multiple: 0,
        status: 1,
        finance_interest: 0,
        trade_interest: 0,
        investment_scope_temp_id: '',
        risk_control_temp_id: ''
    }
    formRef.value.resetFields()
}
const controlTemplateList: any = ref([])
const getControlTemplateList = async () => {
    const { code, data } = await apiTrs.riskControlTemplateList({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    controlTemplateList.value = data.list
}
getControlTemplateList()
const investmentScopeTemplateAll: any = ref([])
const getInvestmentScopeTemplateAll = async () => {
    const { code, data } = await apiTrs.investmentScopeTemplateAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    investmentScopeTemplateAll.value = data
}
getInvestmentScopeTemplateAll()

{
    getData()
}

</script>
<style scoped>
.arco-switch[disabled]{
    background-color: var(--color-fill-2);
}
</style>