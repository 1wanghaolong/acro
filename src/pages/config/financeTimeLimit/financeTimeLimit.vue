<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
                <!-- <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
                    <a-row :gutter="16">>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item field="status" :label="$t('financeTimeLimit.financeTimeLimit.5umzbdj828o0')">
                                <a-select allow-clear v-model="searchInfo.data.market" :placeholder="$t('financeTimeLimit.financeTimeLimit.5umzbdj82z40')">
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
                    <a-button v-permission="['configFinanceTimeLimitCreate']" @click="visibleBtn(1)" type="primary">
                        <template #icon>
                            <icon-plus />
                        </template>
                        {{$t('financeTimeLimit.financeTimeLimit.5umzbdj83680')}}
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
                        <a-table-column :title="$t('financeTimeLimit.financeTimeLimit.5umzbdj83eo0')" data-index="time_limit">
                            <template #cell="{ record }">
                                {{ record.time_limit }}{{ $t('financeTimeLimit.financeTimeLimit.5umzbdj83jw0') }}
                            </template>
                        </a-table-column>
                        <a-table-column :title="$t('financeTimeLimit.financeTimeLimit.5umzbdj83ow0')" data-index="trade_interest"></a-table-column>
                        <a-table-column :title="$t('financeTimeLimit.financeTimeLimit.5umzbdj83t80')" data-index="finance_interest"></a-table-column>
                        <a-table-column :title="$t('financeTimeLimit.financeTimeLimit.5umzbdj828o0')" :width="80">
                            <template #cell="{ record }">
                                <span v-if="$permission(['configFinanceTimeLimitUpdateStatus'])">
                                    <a-switch size="small" @change="handleChangeIntercept(record)" v-model="record.status"
                                        :checked-value="1" :unchecked-value="0">
                                    </a-switch>
                                </span>
                                <span v-else>
                                    {{ useEnumsFormat('otc.package.charge.status', record.status) }}
                                </span>
                            </template>
                        </a-table-column>
                        <a-table-column v-if="$permission(['configFinanceTimeLimitUpdate', 'configFinanceTimeLimitDelete'])"
                            fixed="right" :title="$t('financeTimeLimit.financeTimeLimit.5umzbdj83xg0')" :width="150">
                            <template #cell="{ record }">
                                <a-space>
                                    <a-link v-permission="['configFinanceTimeLimitUpdate']" @click="visibleBtn(2, record)"
                                        style="padding-left: 0;" type="text" size="small">
                                        {{ $t('financeTimeLimit.financeTimeLimit.5umzbdj841s0') }}
                                    </a-link>
                                    <a-popconfirm position="left" @ok="deleteBtn(record)" :content="`${ $t('financeTimeLimit.financeTimeLimit.5umzcf5euqs0') }?` ">
                                        <a-button v-permission="['configFinanceTimeLimitDelete']" type="text"
                                            status="danger" size="small">
                                            {{ $t('financeTimeLimit.financeTimeLimit.5umzbdj84680') }}
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
        <a-modal :mask-closable=false v-model:visible="formVisible" :on-before-ok="handleForm" @close="onCloseForm">
            <template #title>
                {{ statusVisible == 1 ? $t('financeTimeLimit.financeTimeLimit.5umzbdj84as0') : $t('financeTimeLimit.financeTimeLimit.5umzbdj84g00') }}
            </template>
            <div style="display: flex;">
                <a-form ref="formRef" :rules="(formRules as any)" :model="form" layout="vertical">
                    <a-form-item field="time_limit" :label="$t('financeTimeLimit.financeTimeLimit.5umzbdj83eo0')">
                        <a-input-number hide-button style="width: 100%;" v-model="form.time_limit" :placeholder="$t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0')">
                            <template #append>{{$t('financeTimeLimit.financeTimeLimit.5umzbdj84s00')}}</template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="trade_interest" :label="$t('financeTimeLimit.financeTimeLimit.5umzbdj83ow0')">
                        <a-input-number hide-button style="width: 100%;" v-model="form.trade_interest" :placeholder="$t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0')">
                            <template #append>{{$t('financeTimeLimit.financeTimeLimit.5umzbdj84yg0')}}</template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item field="finance_interest" :label="$t('financeTimeLimit.financeTimeLimit.5umzbdj83t80')">
                        <a-input-number hide-button style="width: 100%;" v-model="form.finance_interest" :placeholder="$t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0')">
                            <template #append>{{$t('financeTimeLimit.financeTimeLimit.5umzbdj84yg0')}}</template>
                        </a-input-number>
                    </a-form-item>
                    <a-form-item :label="$t('financeTimeLimit.financeTimeLimit.5umzbdj85380')">
                        <a-switch :checked-value="1" :unchecked-value="0" v-model="form.status" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>

<script lang="ts" setup>
// import { apiWealthPositionList, apiWealthOptionsProductAll } from '@/api'
import { useEnumsFormat } from '@/hooks/enums'
// import dayjs from 'dayjs'
// const local = useLocal()
// const router = useRouter()
// const searchFormRef = ref()
const { t } = useI18n();
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
    const { code, data } = await apiTrs.financeTimeLimitList({
        ...useFilter(param)
    })
    tableData.loading = false
    if (code != 1) return;
    tableData.list = data?.list || []
    tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {
    const { code } = await apiTrs.financeTimeLimitUpdate({
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
        content: t('financeTimeLimit.financeTimeLimit.5umzbdj857k0'),
    })
    getData();
}
// 删除交易对手明细
const deleteBtn = async (val: any) => {
    const { code } = await apiTrs.financeTimeLimitDelete({ 'id': [val.id] })
    if (code != 1) return;
    getData();
}
const formVisible = ref(false)
const statusVisible = ref(1)
const formRef = ref()
const formRules = ref({
    multiple: [{ required: true, message: t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0') }],
    time_limit: [{ required: true, message: t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0') }],
    finance_interest: [{ required: true, message: t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0') }],
    trade_interest: [{ required: true, message: t('financeTimeLimit.financeTimeLimit.5umzbdj84nk0') }],
    investment_scope_temp_id: [{ required: true, message: t('financeTimeLimit.financeTimeLimit.5umzbdj82z40') }],
    risk_control_temp_id: [{ required: true, message: t('financeTimeLimit.financeTimeLimit.5umzbdj82z40') }],
})
const form: any = ref({
    time_limit: 0,
    status: 1,
    finance_interest: 0,
    trade_interest: 0,
})
const visibleBtn = (num: any, val?: any) => {
    statusVisible.value = num
    if (num == 2) {
        const { trade_interest, finance_interest, status, time_limit } = val
        form.value.trade_interest = Number(trade_interest)
        form.value.time_limit = Number(time_limit)
        form.value.status = status
        form.value.id = val.id
        form.value.finance_interest = Number(finance_interest)
    }
    formVisible.value = true
}
const handleForm = async () => {
    const res = await formRef.value?.validate();
    if (res) return false
    if (form.value.id) {
        const { code } = await apiTrs.financeTimeLimitUpdate({
            data: form.value
        })
        if (code != 1) return false;
        getData();
        return true
    } else {
        const { code } = await apiTrs.financeTimeLimitCreate({
            data: form.value
        })
        if (code != 1) return false;
        getData();
        return true
    }

}
const onCloseForm = () => {
    form.value = {
        time_limit: 0,
        status: 1,
        finance_interest: 0,
        trade_interest: 0,
    }
    formRef.value.resetFields()
}

{
    getData()
}

</script>