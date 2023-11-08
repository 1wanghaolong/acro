<template>
    <div>
        <a-card :loading="loading" v-permission="['trsAccountDetailInterestUpdate']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('interest.interest.5um883a01xc0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false; getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('interest.interest.5um883a02ng0')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading"
                            :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('interest.interest.5um883a02qk0')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('interest.interest.5um883a02t40')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical">
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('interest.interest.5um883a02vk0')">
                            <div v-if="!form.setup">
                                <a-tag>
                                    {{ useEnumsFormat('trs.account.interest_accrual_type', form.data.interest_accrual_type) }}
                                </a-tag>
                            </div>
                            <a-select v-else allow-clear v-model="form.data.interest_accrual_type" :placeholder="$t('interest.interest.5um883a02y40')">
                                <a-option v-for="item in useEnums('trs.account.interest_accrual_type')" :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="annual_interest_rate" :label="$t('interest.interest.5um883a030g0')">
                            <div v-if="!form.setup">{{ form.data.annual_interest_rate }}%</div>
                            <a-input-number v-else v-model="form.data.annual_interest_rate" :placeholder="$t('interest.interest.5um883a032k0')"
                                allow-clear>
                                <template #suffix>
                                    %
                                </template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('interest.interest.5um883a03540')">
                            <div v-if="!form.setup"><a-tag>{{
                                useEnumsFormat('trs.account.interest_round_type', form.data.interest_round_type)
                            }}</a-tag></div>
                            <a-select v-else allow-clear v-model="form.data.interest_round_type" :placeholder="$t('interest.interest.5um883a03740')">
                                <a-option v-for="item in useEnums('trs.account.interest_round_type')" :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="annual_interest_rate" :label="$t('interest.interest.5um883a039c0')">
                            <div v-if="!form.setup">{{ form.data.interest_round_precision }}</div>
                            <a-input-number v-else v-model="form.data.interest_round_precision" :placeholder="$t('interest.interest.5um883a03bc0')"
                                allow-clear>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('interest.interest.5um883a03d80')">
                            <div v-if="!form.setup && !viteItemName"><a-tag>{{
                                useEnumsFormat('trs.account.deduct_type', form.data.interest_deduct_type)
                            }}</a-tag></div>
                            <div v-if="!form.setup && viteItemName =='hx'">
                                <a-tag>{{
                                    useEnumsFormat('trs.account.hx_deduct_type', form.data.interest_deduct_type)
                                }}</a-tag>
                            </div>
                            <a-select v-if='form.setup && viteItemName =="hx"' 
                                v-model='form.data.interest_deduct_type'
                                :placeholder="$t('interest.interest.5um883a03f80')">
                                <a-option v-for="item in useEnums('trs.account.hx_deduct_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                            <a-select v-if='form.setup && !viteItemName'  
                                v-model='form.data.interest_deduct_type'
                                :placeholder="$t('interest.interest.5um883a03f80')">
                                <a-option v-for="item in useEnums('trs.account.deduct_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.interest_accrual_type != 1">
                        <a-form-item field="finance_interest_accrual_amount" :label="$t('interest.interest.5um883a03i00')">
                            <div v-if="!form.setup">{{ form.data.finance_interest_accrual_amount }}</div>
                            <a-input-number :disabled=true v-else v-model="form.data.finance_interest_accrual_amount"
                                :placeholder="$t('interest.interest.5um883a03ko0')" allow-clear>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="interest_deduct_account" :label="$t('interest.interest.5um883a03o00')">
                            <div v-if="!form.setup">{{ useEnumsFormat('trs.account.interest_deduct_account',
                                form.data.interest_deduct_account) }}</div>
                            <a-select :disabled=true v-else allow-clear v-model="form.data.interest_deduct_account"
                                :placeholder="$t('interest.interest.5um883a03q80')">
                                <a-option v-for="item in useEnums('trs.account.interest_deduct_account')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card style="margin-top: 20px;" v-permission="['trsAccountDetailInterestList']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('interest.interest.5um883a03sg0')}}
                    </a-space>
                </div>
            </template>
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="interest_accrual_type" :label="$t('interest.interest.5um883a02vk0')">
                                <a-select allow-clear v-model="searchInfo.data.interest_accrual_type" :placeholder="$t('interest.interest.5um883a03ug0')">
                                    <a-option v-for="item in useEnums('trs.account.interest_accrual_type')"
                                        :value="item.value">{{
                                            item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="interest_time" :label="$t('interest.interest.5um883a03x80')">
                                <a-range-picker v-model="searchInfo.data.interest_time" format="YYYY-MM-DD" />
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
                        {{ searchInfo.show ? $t('interest.interest.5um883a040s0') : $t('interest.interest.5um883a043g0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getInvestmentAcopeList()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('interest.interest.5um883a04640')}}
                    </a-button>
                    <a-button @click="getInvestmentAcopeList" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('interest.interest.5um883a047w0')}}
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
                        <a-table-column :title="$t('interest.interest.5um883a049k0')" :width="90">
                            <template #cell="{ record }">
                                <a-tag>{{ record.trs_account_info?.currency }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a04b40')" :width="100">
                            <template #cell="{ record }">
                                <div> {{
                                    IntAccount(record.interest_amount, record.interest_round_precision, record.interest_round_type)
                                }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a02vk0')" :width="local.lang=='en'?210:100">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('trs.account.interest_accrual_type', record.interest_accrual_type)
                                }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a04ck0')" :width="local.lang=='en'?140:100">
                            <template #cell="{ record }">
                                <a-tag >{{record?.interest_deduct_type ? useEnumsFormat('trs.account.public_deduct_type', record.interest_deduct_type) :'' }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a04e80')" :width="100">
                            <template #cell="{ record }">
                                <a-tag size="small" :color="record?.status == 1?'#00b42a':''">
                                    {{ useEnumsFormat('trs.account.hx_status', record?.status) }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a03i00')" :width="150">
                            <template #cell="{ record }">
                                <div>{{ record.calculate_amount }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a030g0')" :width="100">
                            <template #cell="{ record }">
                                <div>{{ record.annual_interest_rate }}%</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a04fw0')" :width="90">
                            <template #cell="{ record }">
                                <div>{{ record.interest_round_precision }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a03540')" :width="local.lang=='en'?140:100">
                            <template #cell="{ record }">
                                <a-tag>{{ useEnumsFormat('trs.account.interest_round_type', record.interest_round_type)
                                }}</a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('interest.interest.5um883a03x80')" :width="180">
                            <template #cell="{ record }">
                                <div>{{ dayjs.unix(record.interest_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </div>
            <div class="pagination">
                <a-pagination size="small" @change="getInvestmentAcopeList" @page-size-change="getInvestmentAcopeList"
                    v-model:current="searchInfo.data.page" v-model:page-size="searchInfo.data.per_page"
                    :total="tableData.count" show-total show-jumper show-page-size />
            </div>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useEnumsFormat, useEnums } from '@/hooks/enums'
const local = useLocal()
const route = useRoute()
const formRef = ref()
const { t } = useI18n();
const searchFormRef = ref()
const loading = ref(false)
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const form: any = reactive({
    show: false,
    loading: false,
    setup: false,
    investmentScopeTemplate: [],
    data: {
        interest_accrual_type:'',
        annual_interest_rate:0,
        interest_round_type:'',
        interest_round_precision:2,
        interest_deduct_type:"",
        finance_interest_accrual_amount:0,
        interest_deduct_account:""
    },
    rules:{
        interest_accrual_type:[{ required: true, message: t('interest.interest.5um883a02y40') }],
        annual_interest_rate:[{ required: true, message: t('interest.interest.5um883a04hc0') }],
        interest_round_type:[{ required: true, message: t('interest.interest.5um883a03740') }],
        interest_round_precision:[{ required: true, message: t('interest.interest.5um883a03bc0') }],
        interest_deduct_type:[{ required: true, message: t('interest.interest.5um883a03f80') }],
        finance_interest_accrual_amount:[{ required: true, message: t('interest.interest.5um883a03ko0') }],
        interest_deduct_account:[{ required: true, message: t('interest.interest.5um883a03q80') }],
    }
})
const searchInfo:any = reactive({
    show: false,
    data: {
        interest_accrual_type: '',
        interest_deduct_type:"",
        interest_time: [],
        page: 1,
        per_page: 20
    }
})
const tableData = reactive({
    list: [],
    count: 0,
    loading: false
})
// 定义一个函数，实现向上舍入(四舍五入)(向下舍入)并保留指定位数的小数
const roundToDecimal = (number: any, decimalPlaces: any, type: any) => {
    let factor: any;
    if (type == '1') {
        factor = Math.pow(10, decimalPlaces);
        return Math.ceil(number * factor) / factor;
    }
    if (type == '2') {
        factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
    }
    if (type == '3') {
        factor = Math.pow(10, decimalPlaces);
        return Math.floor(number * factor) / factor;
    }
}
const IntAccount = (val: any, digit: any, type: any) => {
    if (!val || !digit || !type) {
        return val
    }
    let value: any = roundToDecimal(val, digit, type)
    return value.toFixed(digit)
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiTrs.accountUpdate({
        id: form.data.id,
        data: {
            interest_accrual_type:form.data.interest_accrual_type,
            annual_interest_rate:form.data.annual_interest_rate,
            interest_round_type:form.data.interest_round_type,
            interest_round_precision:form.data.interest_round_precision,
            interest_deduct_type:form.data.interest_deduct_type,
            finance_interest_accrual_amount:form.data.finance_interest_accrual_amount,
            interest_deduct_account:form.data.interest_deduct_account
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
    form.data.interest_round_precision = Number(data.interest_round_precision)
    form.data.annual_interest_rate = Number(data.annual_interest_rate)
    form.data.finance_interest_accrual_amount = Number(data.finance_interest_accrual_amount)
    if (form.data.interest_deduct_type != 'daily_freeze_monthly_deduct' &&  viteItemName =='hx') {
        form.data.interest_deduct_type = ''
    }
}
const getInvestmentAcopeList = async () => {
    tableData.loading = true
    const { code, data } = await apiTrs.interestList({
        ...useFilter(searchInfo.data),
        ...useFilter({
            trs_account_id: route.params?.id
        })
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.count = data.count
    tableData.list = data.list
}
const getInvestmentScopeTemplate = async () => {
    const { code, data } = await apiTrs.investmentScopeTemplateAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    form.investmentScopeTemplate = data?.length ? data : []
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
<style  scoped>
:deep(.arco-input-wrapper .arco-input[disabled]) {
    -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-select-view-single.arco-select-view-disabled) {
    color: var(--color-text-1);
}</style>