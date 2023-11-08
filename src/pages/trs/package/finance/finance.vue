<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard" style="padding-top:20px">
            <a-form ref="formRef" :model="form.data" :rules="form.rules" layout="vertical"
                :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
                <a-form-item field="trade_annual_interest_rate" :label="$t('finance.finance.5umywvjqlc80')">
                        <div style="width: 100%;">
                            <a-input-number hide-button style="width: 100%;" v-model="form.data.trade_annual_interest_rate"
                                :placeholder="$t('finance.finance.5um87h5qgu80')">
                                <template #append>%</template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item field="finance_annual_interest_rate" :label="$t('finance.finance.5umywvjqly80')">
                        <div style="width: 100%;">
                            <a-input-number hide-button style="width: 100%;" v-model="form.data.finance_annual_interest_rate"
                                :placeholder="$t('finance.finance.5um87h5qgu80')">
                                <template #append>%</template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item field="interest_round_precision" :label="$t('finance.finance.5umywvjqm3g0')">
                        <div style="width: 100%;">
                            <a-input-number hide-button style="width: 100%;" v-model="form.data.interest_round_precision"
                                :placeholder="$t('finance.finance.5um87h5qgu80')">
                                <template #append>{{$t('finance.finance.5umywvjqm6g0')}}</template>
                            </a-input-number>
                        </div>
                    </a-form-item>
                    <a-form-item field="interest_round_type" :label="$t('finance.finance.5umywvjqm900')">
                        <a-select v-model="form.data.interest_round_type" :placeholder="$t('finance.finance.5um87h5qg880')">
                            <a-option v-for="item in useEnums('otc.package.charge.create.round_type')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item>
                    <!-- <a-form-item field="interest_accrual_type" label="融资计息金额">
                        <a-select v-model="form.data.interest_accrual_type" :placeholder="$t('finance.finance.5um87h5qg880')">
                            <a-option v-for="item in useEnums('trs.package.finance.financingInterest')"
                                :value="item.value">{{
                                    item.trans[local.lang] }}</a-option>
                        </a-select>
                    </a-form-item> -->
                <a-form-item v-permission="['trsConfigUpdate']">
                    <div style="display: flex;justify-content: flex-end;width: 100%;">
                        <a-space :size="18">
                            <a-button @click="getData()">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                {{$t('finance.finance.5umywvjqmc00')}}
                            </a-button>
                            <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                                <template #icon>
                                    <icon-check />
                                </template>
                                {{$t('finance.finance.5umywvjqmes0')}}
                            </a-button>
                        </a-space>
                    </div>
                </a-form-item>
            </a-form>

        </a-card>
    </div>
</template>

<script lang="ts" setup>
const local = useLocal()
import { useEnums } from '@/hooks/enums'
const formRef = ref()
const { t } = useI18n();
const form:any = reactive({
    loading: false,
    detail:{},
    data: {
        trade_annual_interest_rate: 5,
        finance_annual_interest_rate: 5,
        interest_round_precision: 2,
        interest_round_type: 2,
        // interest_accrual_type: 1
    },
    rules:{
        trade_annual_interest_rate: [{ required: true, message: t('finance.finance.5umywvjqmhk0') }],
        finance_annual_interest_rate: [{ required: true, message: t('finance.finance.5umywvjqmoo0') }],
        interest_round_precision: [{ required: true, message: t('finance.finance.5umywvjqmr80') }],
        interest_round_type: [{ required: true, message: t('finance.finance.5umywvjqmu80') }],
        // interest_accrual_type: [{ required: true, message: '请选择融资计息方式' }],
    }
})
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    form.loading = true
    const { code, msg } = await apiAdmin.configUpdate({
        group:'trs',
        data: {
            ...form.detail,
            finance_interest_rate:{
                ...form.data,
            }
        }
    })
    form.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const getData = async () => {
    form.loading = true
    const { code, data } = await apiAdmin.configList({
        group:'trs'
    })
    form.loading = false
    if (code != 1) return;
    form.detail = data
    for(let key in form.data){
        form.data[key] = Number(data.finance_interest_rate[key])
    }
}
{
    getData()
}
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 0;
}
</style>