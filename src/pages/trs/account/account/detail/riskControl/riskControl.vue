<template>
    <div>
        <a-card :loading="loading" v-permission="['trsAccountDetailInvestControlUpdate']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('riskControl.riskControl.5um89q86gws0')}}
                    </a-space>
                    <a-space :size="18">
                        <a-button v-if="form.setup" @click="form.setup = false; getData()">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            {{$t('riskControl.riskControl.5um89q86hl40')}}
                        </a-button>
                        <a-button v-if="form.setup" @click="submit" type="primary" :loading="form.loading"
                            :disabled="form.loading">
                            <template #icon>
                                <icon-save />
                            </template>
                            {{$t('riskControl.riskControl.5um89q86hpk0')}}
                        </a-button>
                        <a-button v-if="!form.setup" @click="form.setup = true" type="primary">
                            <template #icon>
                                <icon-edit />
                            </template>
                            {{$t('riskControl.riskControl.5um89q86hsc0')}}
                        </a-button>
                    </a-space>
                </div>
            </template>
            <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" auto-label-width layout="vertical">
                <a-row :gutter="16">
                    <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item :label="$t('riskControl.riskControl.5um89q86huo0')">
                            <a-tag size="small" :color="form.data?.risk_control_status == 1?'#00b42a':form.data?.risk_control_status == 2?'#ff7d00':'#f53f3f'">
                                {{ useEnumsFormat('trs.account.risk_control_status', form.data?.risk_control_status) }}
                            </a-tag>
                            <a-link v-permission="['trsAccountDetailRiskControlRecord']" @click="router.push({ name: 'trsRiskControlRecord', query: { trs_account: form.data?.account } })">{{$t('riskControl.riskControl.5um89q86hxs0')}}</a-link>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="warn_value" :label="$t('riskControl.riskControl.5um89q86i7k0')">
                            <div v-if="!form.setup">{{ form.data.warn_value }}%</div>
                            <a-input-number v-else v-model="form.data.warn_value" :placeholder="$t('riskControl.riskControl.5um89q86ia80')" allow-clear>
                                <template #suffix>
                                    %
                                </template>
                            </a-input-number>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="close_value" :label="$t('riskControl.riskControl.5um89q86ics0')">
                            <div v-if="!form.setup">{{ form.data.close_value }}%</div>
                            <a-input-number v-else v-model="form.data.close_value" :placeholder="$t('riskControl.riskControl.5um89q86ies0')" allow-clear>
                                <template #suffix>
                                    %
                                </template>
                            </a-input-number>
                        </a-form-item>
                    </a-col> -->
                    <!-- <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="risk_control_calculate_type" :label="$t('riskControl.riskControl.5um89q86ih80')">
                            <div v-if="!form.setup">
                                <a-tag>
                            {{useEnumsFormat('trs.account.risk_control_calculate_type', form.data.risk_control_calculate_type)}}
                                </a-tag>
                            </div>
                            <a-select v-else allow-clear v-model="form.data.risk_control_calculate_type"
                                :placeholder="$t('riskControl.riskControl.5um89q86ijc0')">
                                <a-option v-for="item in useEnums('trs.account.risk_control_calculate_type')"
                                    :value="item.value">
                                    {{ item.trans[local.lang] }}
                                </a-option>
                            </a-select>
                        </a-form-item>
                    </a-col> -->
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                        <a-form-item field="investment_scope_temp_id" :label="$t('riskControl.riskControl.5um89q86im40')">
                            <div v-if="!form.setup">{{ form.data?.investment_scope_temp_info?.name }}</div>
                            <a-select v-else allow-clear v-model="form.data.investment_scope_temp_id"
                                :placeholder="$t('riskControl.riskControl.5um89q86ipg0')">
                                <a-option v-for="item in (form.investmentScopeTemplate as any)" :value="item.id">
                                    {{ item.name }}
                                </a-option>
                            </a-select>
                            <a-link style="margin-left:15px" v-if="!form.setup"
                                v-permission="['configTemplateInvestmentScopeDetail']"
                                @click="router.push({ name: 'configTemplateInvestmentScopeDetail', params: { id: form.data.investment_scope_temp_id } })">{{$t('riskControl.riskControl.5um89q86iso0')}}</a-link>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-card>
        <a-card style="margin-top: 20px;" v-permission="['trsAccountInvestmentScopeList']">
            <template #title>
                <div style="display: flex;justify-content: space-between;">
                    <a-space :size="18">
                        {{$t('riskControl.riskControl.5um89q86ix40')}}
                    </a-space>
                </div>
            </template>
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="symbol" :label="$t('riskControl.riskControl.5um89q86j3w0')">
                                <a-input v-model="searchInfo.data.symbol" :placeholder="$t('riskControl.riskControl.5um89q86j7c0')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="type" :label="$t('riskControl.riskControl.5um89q86jao0')">
                                <a-select allow-clear v-model="searchInfo.data.type" :placeholder="$t('riskControl.riskControl.5um89q86jdw0')">
                                    <a-option v-for="item in useEnums('trs.account.symbol.type')" :value="item.value">{{
                                        item.trans[local.lang] }}</a-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="market" :label="$t('riskControl.riskControl.5um89q86jis0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('riskControl.riskControl.5um89q86jdw0')">
                                    <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
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
                        {{ searchInfo.show ? $t('riskControl.riskControl.5um89q86jkg0') : $t('riskControl.riskControl.5um89q86jmk0') }}
                    </a-button>
                    <a-button @click="searchFormRef?.resetFields(), getInvestmentAcopeList()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('riskControl.riskControl.5um89q86joc0')}}
                    </a-button>
                    <a-button @click="getInvestmentAcopeList" type="primary">
                        <template #icon>
                            <icon-search />
                        </template>
                        {{$t('riskControl.riskControl.5um89q86jpw0')}}
                    </a-button>
                </a-space>
                <a-space :size="18">
                    <a-button type="primary" @click="createInfo.show = true">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('riskControl.riskControl.5um89q86jrg0')}}
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
                        <a-table-column :title="$t('riskControl.riskControl.5um89q86j3w0')">
                            <template #cell="{ record }">
                                <div>{{ record.name }}</div>
                                <div>{{ record.market }} {{ record.symbol }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.riskControl.5um89q86jao0')">
                            <template #cell="{ record }">
                                <div>{{ useEnumsFormat('trs.account.symbol.type', record.type) }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('riskControl.riskControl.5um89q86jtc0')">
                            <template #cell="{ record }">
                                <div>{{ record.investment_rate }}</div>
                            </template>
                        </a-table-column>
                        <a-table-column fixed="right" :title="$t('riskControl.riskControl.5um89q86juo0')" :width="150"
                            v-if="$permission(['trsAccountInvestmentScopeUpdate', 'trsAccountInvestmentScopeDelete'])">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['trsAccountInvestmentScopeUpdate']"
                                        @click="showUpdate(record)">{{$t('riskControl.riskControl.5um89q86hsc0')}}</a-link>
                                    <a-popconfirm position="left" @ok="del(record)" :content="$t('riskControl.riskControl.5um89q86jwc0')">
                                        <a-link v-permission="['trsAccountInvestmentScopeDelete']"
                                            status="danger">{{$t('riskControl.riskControl.5um89q86jxw0')}}</a-link>
                                    </a-popconfirm>
                                </a-space>
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
        <!-- 新增 -->
        <a-modal draggable v-model:visible="createInfo.show" :title="$t('riskControl.riskControl.5um89q86jrg0')" @cancel="createInfo.show = false"
            @before-ok="create">
            <a-form ref="createFormRef" :model="createInfo.data" layout="vertical">
                <a-form-item field="symbol" :label="$t('riskControl.riskControl.5um89q86k080')" :rules="[{ required: true, message: $t('riskControl.riskControl.5unxirgyuvw0') }]">
                    <a-select v-model:model-value="createInfo.data.symbol" allow-search :placeholder="$t('riskControl.riskControl.5um89q86k2c0')"
                        @search="getSymbolList">
                        <a-option v-for="item in (createInfo.symbolList as any)" :value="item.symbol">
                            {{ item.title }}
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="type" :label="$t('riskControl.riskControl.5um89q86jao0')" :rules="[{ required: true, message: $t('riskControl.riskControl.5um89q86k440') }]">
                    <a-select allow-clear v-model="createInfo.data.type" :placeholder="$t('riskControl.riskControl.5um89q86k440')">
                        <a-option v-for="item in useEnums('trs.account.symbol.type')" :value="item.value">
                            {{ item.trans[local.lang] }}
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item v-if="createInfo.data.type == 1" field="investment_rate" :label="$t('riskControl.riskControl.5um89q86k5s0')"
                    :rules="[{ required: true, message: $t('riskControl.riskControl.5um89q86k800') }]">
                    <a-input-number v-model="createInfo.data.investment_rate" :placeholder="$t('riskControl.riskControl.5um89q86k800')">
                        <template #suffix>
                            %
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 编辑 -->
        <a-modal draggable v-model:visible="updateInfo.show" :title="$t('riskControl.riskControl.5um89q86hsc0')" @cancel="updateInfo.show = false"
            @before-ok="update">
            <a-form ref="updateFormRef" :model="updateInfo.data" layout="vertical">
                <a-form-item field="market" :label="$t('riskControl.riskControl.5um89q86jis0')">
                    <div>{{ useEnumsFormat('market.market', updateInfo.data.market) }}</div>
                </a-form-item>
                <a-form-item field="security_type" :label="$t('riskControl.riskControl.5um89q86k9c0')">
                    <div>{{ useEnumsFormat('market.security_type', updateInfo.data.security_type) }}</div>
                </a-form-item>
                <a-form-item field="symbol" :label="$t('riskControl.riskControl.5um89q86j3w0')">
                    <div>{{ updateInfo.data.symbol }}</div>
                </a-form-item>
                <a-form-item field="type" :label="$t('riskControl.riskControl.5um89q86jao0')" :rules="[{ required: true, message: $t('riskControl.riskControl.5um89q86k440') }]">
                    <a-select allow-clear v-model="updateInfo.data.type" :placeholder="$t('riskControl.riskControl.5um89q86k440')">
                        <a-option v-for="item in useEnums('trs.account.symbol.type')" :value="item.value">
                            {{ item.trans[local.lang] }}
                        </a-option>
                    </a-select>
                </a-form-item>
                <a-form-item field="investment_rate" :label="$t('riskControl.riskControl.5um89q86k5s0')" :rules="[{ required: true, message: $t('riskControl.riskControl.5um89q86k800') }]">
                    <a-input-number v-model="updateInfo.data.investment_rate" :placeholder="$t('riskControl.riskControl.5um89q86k800')">
                        <template #suffix>
                            %
                        </template>
                    </a-input-number>
                </a-form-item>
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
const searchFormRef = ref()
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
        // warn_value: 0,
        // close_value: 0,
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
const tableData = reactive({
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
            // warn_value: form.data.warn_value,
            // close_value: form.data.close_value,
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
    const { code, data } = await apiTrs.investmentAcopeList({
        ...useFilter(searchInfo.data),
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
    for (let key in updateInfo.data) {
        if (key == 'investment_rate') {
            updateInfo.data.investment_rate = Number(record.investment_rate)
        } else {
            updateInfo.data[key] = record[key]
        }
    }
    updateInfo.show = true
}
const create = async () => {
    const validate = await createFormRef.value?.validate()
    if (validate) return false;
    if (createInfo.data.type == 1 && !createInfo.data.investment_rate) {
        Message.info({ content: t('riskControl.riskControl.5um89q86kb40') })
        return false
    }
    createInfo.loading = true
    const { code, msg } = await apiTrs.investmentAcopeCreate({
        data: {
            ...createInfo.data,
            trs_account_id: route.params?.id,
            security_type: createInfo.symbolList?.find((item: any) => item.symbol == createInfo.data.symbol)?.security_type,
            market: createInfo.symbolList?.find((item: any) => item.symbol == createInfo.data.symbol)?.market,
        }
    })
    createInfo.loading = false
    if (code != 1) return false;
    Message.success({ content: msg })
    createFormRef.value?.resetFields()
    createInfo.show = false
    getInvestmentAcopeList()
}
const update = async () => {
    const validate = await updateFormRef.value?.validate()
    if (validate) return false;
    createInfo.loading = true
    const { code, msg } = await apiTrs.investmentAcopeUpdate({
        data: {
            ...updateInfo.data,
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
    const { code, msg } = await apiTrs.investmentAcopeDelete({
        id: [record.id]
    })
    if (code != 1) return false;
    Message.success({ content: msg })
    getInvestmentAcopeList()
}
const getSymbolList = async (value: string) => {
    const { code, data } = await apiMarket.symbolSearch({ keyword: value })
    if (code != 1) return;
    createInfo.symbolList = data.list.map((item: any) => {
        item.title = item.name[local.lang] + '.' + item.text
        return item
    })
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