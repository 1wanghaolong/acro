<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <a-card :loading="loading">
                <template #title>
                    <div style="display: flex;justify-content: space-between;">
                        <a-space :size="18">
                            {{$t('contract.detail.5umx30odvrs0')}}
                        </a-space>
                        <a-space :size="18" v-permission="['trsSettlementContractSettlement']">
                            <a-button v-if="form.data?.settlement_status == 1" @click="settlement.show = true;" type="primary" :loading="form.loading" :disabled="form.loading">
                                {{$t('contract.detail.5umx30odwf40')}}
                            </a-button>
                        </a-space>
                    </div>
                </template>
                <a-form ref="formRef" :model="form.data" auto-label-width layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="`TRS${ $t('contract.detail.5umx30odwjc0') }`">
                                {{ form.data?.trs_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwlo0')">
                                {{ form.data?.asset_account_info?.account }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwng0')">
                                <div>{{ form.data?.asset_account_info?.real_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwpg0')">
                                <div>{{ form.data?.asset_account_info?.english_name }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwrw0')">
                                <div>{{ form.data?.trs_account_info?.currency }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwto0')">
                                <div>{{ form.data?.trs_account_info?.total_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwvk0')">
                                <div>{{ form.data?.trs_account_info?.total_assure_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odwxs0')">
                                <div>{{ form.data?.trs_account_info?.total_finance }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odx000')">
                                {{ dayjs.unix(form.data?.trs_account_info?.open_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odx3c0')">
                                {{ dayjs.unix(form.data?.trs_account_info?.expire_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odx5c0')">
                                <a-tag size="small" :color="form.data?.settlement_status == 2?'#00b42a':form.data?.settlement_status == 1?'#ff7d00':'#f53f3f'">
                                    {{ useEnumsFormat('trs.account.settlement_status',form.data?.settlement_status) }}
                                </a-tag>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data.settlement_time">
                            <a-form-item :label="$t('contract.detail.5umx30odx7k0')">
                                {{ dayjs.unix(form.data.settlement_time).format('YYYY-MM-DD HH:mm:ss') }}
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.settlement_status == 1">
                            <a-form-item :label="$t('contract.detail.5umx30odx9s0')">
                                <div>{{ form.data?.trs_account_info?.total_asset }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6">
                            <a-form-item :label="$t('contract.detail.5umx30odxbk0')">
                                <div v-if="form.data?.settlement_status == 2">{{ Number(form.data?.settlement_interest) < 0 ? (-Number(form.data?.settlement_interest)).toFixed(4) : Number(form.data?.settlement_interest).toFixed(4)  }}</div>
                                <div v-else>{{ Number(form.data?.trs_account_info.receivable_interest)   }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if='viteItemName =="hx"'>
                            <a-form-item :label="$t('contract.detail.5umx30odxdo0')">
                                <div>{{ Number(form.data?.trs_account_info?.wait_deduct_interest) }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.settlement_status == 1">
                            <a-form-item :label="$t('contract.detail.5umx30odxfs0')">
                                <div>{{ Number(form.data?.trs_account_info?.total_profit) > 0 ? `+${form.data?.trs_account_info?.total_profit}` : form.data?.trs_account_info?.total_profit }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.settlement_status != 1">
                            <a-form-item :label="$t('contract.detail.5umx30odxhw0')">
                                <div>{{ form.data?.trs_account_info?.total_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.settlement_status != 1">
                            <a-form-item :label="$t('contract.detail.5umx30odxk00')">
                                <div>{{ form.data?.settlement_assure_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.settlement_status != 1">
                            <a-form-item :label="$t('contract.detail.5umx30odxn40')">
                                <div>{{ form.data?.trs_account_info?.withdraw_amount }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="form.data?.settlement_status != 1">
                            <a-form-item :label="$t('contract.detail.5umx30odxow0')">
                                <div>{{ form.data?.trs_account_info?.withdraw_fee }}</div>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-card>
        <!-- 合约结算 -->
        <a-modal v-model:visible="settlement.show" :width="local.lang == 'en'?700:600" :title="$t('contract.detail.5umx30odxqo0')" @cancel="settlement.show = false" @before-ok="submit">
            <a-form ref="settlementFormRef" layout="vertical" :model="settlement.data" auto-label-width>
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="12">
                            <a-form-item :label="$t('contract.detail.5umx30odxsc0')" :rules="[{required:true,message:$t('contract.detail.5umx30odxu80')}]">
                                <a-input-number @change="numberChange" v-model="settlement.data.settlement_profit" :placeholder="$t('contract.detail.5umx30odxu80')" />
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12">
                            <a-form-item :label="$t('contract.detail.5umx30odxwc0')" :rules="[{required:true,message:$t('contract.detail.5umx30odxy00')}]">
                                <a-input-number @change="numberChange" :max="0" v-model="settlement.data.settlement_interest" :placeholder="$t('contract.detail.5umx30odxy00')">
                                    <template #prefix>
                                        <a-tooltip :content="$t('contract.detail.5umx30odxzo0')">
                                            <icon-info-circle />
                                        </a-tooltip>
                                    </template>
                                </a-input-number>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="$t('contract.detail.5umx30odwrw0')">
                                <div>{{ form.data?.trs_account_info?.currency }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="$t('contract.detail.5umx30ody100')">
                                <div>
                                    {{ Number(form.data?.trs_account_info?.total_cash) == 0 ? '': '-' }}{{ form.data?.trs_account_info?.total_cash }}
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="$t('contract.detail.5umx30ody2s0')">
                                <div>
                                    {{ usableCash > 0 ?'+'+usableCash:usableCash < 0 ?'-'+usableCash:usableCash }}
                                </div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="$t('contract.detail.5umx30ody4g0')">
                                <div>{{ form.data?.trs_account_info?.total_assure_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="`TRS${$t('contract.detail.5umx5g3320g0')}`">
                                <div>{{ form.data?.trs_account_info?.total_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="`TRS${$t('contract.detail.5umx5g332ig0')}`">
                                <div>{{ form.data?.trs_account_info?.total_assure_cash }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="`TRS${$t('contract.detail.5umx5g332lo0') }`">
                                <div>{{ form.data?.trs_account_info?.total_finance }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="`TRS${$t('contract.detail.5umx5g332pk0')}`">
                                <div>{{ form.data?.trs_account_info?.total_asset }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="`TRS${$t('contract.detail.5umx5g332rs0')}`">
                                <div>{{ form.data?.trs_account_info?.receivable_interest }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8" v-if='viteItemName == "hx"'>
                            <a-form-item :label="`TRS${$t('contract.detail.5umx5g332ug0')}`">
                                <div>{{ form.data?.trs_account_info?.wait_deduct_interest }}</div>
                            </a-form-item>
                        </a-col>
                        <a-col :xs="24" :sm="12" :md="8">
                            <a-form-item :label="$t('contract.detail.5umx30odxfs0')">
                                <div>{{ Number(form.data?.trs_account_info?.total_profit) > 0 ? `+${form.data?.trs_account_info?.total_profit}`:form.data?.trs_account_info?.total_profit }}</div>
                            </a-form-item>
                        </a-col>
                    </a-row>
            </a-form>
        </a-modal>
    </div>
    
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const { t } = useI18n();
const settlementFormRef = ref()
const usableCash = ref()
const loading = ref(false)
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const form:any = reactive({
    show: false,
    loading: false,
    setup: false,
    data: {},
    rules: {
        real_name: [{ required: true, message: t('contract.detail.5umx30ody5s0') }],
        english_name: [{ required: true, message: t('contract.detail.5umx30ody7k0') }],
        email: [{ required: true, message: t('contract.detail.5umx30ody9c0') }, { type: 'email', message: t('contract.detail.5umx30odyao0') }]
    }
})
const settlement:any = reactive({
    loading:false,
    show:false,
    data:{
        settlement_profit:0,
        settlement_interest:0
    }
})
const submit = async () => {
    const validate = await settlementFormRef.value?.validate()
    if (validate) return false;
    settlement.loading = true
    const { code, msg } = await apiTrs.settlement({
        id:form.data.id,
        data:{
            operator_id:local.userInfo?.id || 1,
            ...settlement.data
        }
    })
    settlement.loading = false
    if (code != 1) return;
    Message.success({ content: msg })
    getData()
}
const numberChange = () =>{
  usableCash.value = 0
  let freezeCash = parseFloat(form.data?.trs_account_info?.total_cash || 0) //解冻资金
  let settlementProfit = parseFloat(settlement.data?.settlement_profit || 0)  // 账户盈亏
  let settlementInterest = parseFloat(settlement.data?.settlement_interest || 0) * -1  // 账户应扣利息
  let receivableInterest = parseFloat(form.data?.trs_account_info?.receivable_interest || 0)   // 账户已扣利息
  let wait_deduct_interest = Number(form.data?.trs_account_info?.wait_deduct_interest) >= 0 ? parseFloat(form.data?.trs_account_info?.wait_deduct_interest || 0) : parseFloat(form.data?.trs_account_info?.wait_deduct_interest || 0) * -1  // 账户待扣利息
  let usableCashVal = (freezeCash + settlementProfit-wait_deduct_interest-(receivableInterest + wait_deduct_interest - settlementInterest)).toFixed(4)
  usableCash.value =  (Number(usableCashVal)+Number(usableCash.value)).toFixed(4)
}
const getData = async () => {
    loading.value = true
    const { code, data } = await apiTrs.settlementInfo({
        id: route.params?.id
    })
    loading.value = false
    if (code != 1) return;
    form.data = data
    settlement.data.settlement_profit = Number(data.trs_account_info.total_profit)
    settlement.data.settlement_interest -= (Number(data.trs_account_info.receivable_interest) + Number(data.trs_account_info?.wait_deduct_interest || 0))
    numberChange()
}
{
    getData()
}

</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
    color: var(--color-text-3);
}
</style>