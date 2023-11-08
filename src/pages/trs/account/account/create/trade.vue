<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-form-item field="market_type" :label="$t('create.trade.5um7ziep40o0')">
            <a-select allow-clear v-model="form.data.market_type" :placeholder="$t('create.trade.5um7ziep5500')">
                <a-option v-for="item in useEnums('market.market_type')" :value="item.value">
                    {{ item.trans[local.lang] }}
                </a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="investment_scope_temp_id" :label="$t('create.trade.5um7ziep58c0')">
            <a-select allow-clear v-model="form.data.investment_scope_temp_id" :placeholder="$t('create.trade.5um7ziep5ao0')">
                <a-option v-for="item in (form.investmentScopeTemplate as any)" :value="item.id">
                    {{ item.name }}
                </a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="counter_channel_account_scene_temp_id" :label="$t('create.trade.5um7ziep5cw0')">
            <a-select allow-clear v-model="form.data.counter_channel_account_scene_temp_id" :placeholder="$t('create.trade.5um7ziep5fk0')">
                <a-option v-for="item in (form.counterChannelAccountSceneTemplate as any)" :value="item.id">
                    {{ item.name }}
                </a-option>
            </a-select>
        </a-form-item>
       
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
                <a-space :size="18">
                    <a-button @click="step(-1)">
                        {{$t('create.trade.5um7ziep5hw0')}}
                    </a-button>
                    <a-button type="primary" html-type="submit">
                        {{$t('create.trade.5um7ziep5k80')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const formRef = ref()
const { t } = useI18n();
const props = defineProps({
    data:Object,
    current:Number
})
const emit = defineEmits(['update:current','update:data']);
const form = reactive({
    show: false,
    loading: false,
    investmentScopeTemplate:[],
    counterChannelAccountSceneTemplate:[],
    data: {
        asset_account_id: '',
        charge_package_id: '',
        currency: '',
        total_cash: 0,
        total_finance: 0,
        investment_scope_temp_id: '',
        interest_accrual_type: 1,
        interest_round_type: 2,
        interest_round_precision: 2,
        open_time: '',
        expire_time: '',
        finance_interest_accrual_amount:0,
        counter_channel_account_scene_temp_id: '',
        risk_control_calculate_type: 1,
        warn_value: 30,
        close_value: 60,
        market_type: '',
        agreement_name: '',
        agreement_url: []
    },
    rules: {
        market_type: [{ required: true, message: t('create.trade.5um7ziep5mc0') }],
        investment_scope_temp_id: [{ required: true, message: t('create.trade.5um7ziep5ao0') }],
        counter_channel_account_scene_temp_id: [{ required: true, message: t('create.trade.5um7ziep5oo0') }],
    }
})
const step = (type:number) => {
    if(type == -1) return emit('update:current',Number(props.current)-1)
    emit('update:current',Number(props.current)+1)
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    emit('update:current',Number(props.current)+1)
}
const getInvestmentScopeTemplate = async () => {
    const { code, data } = await apiTrs.investmentScopeTemplateAll({
        ...useFilter({ status: 1 })
    })
    if (code != 1) return;
    form.investmentScopeTemplate = data?.length?data:[]
}
const getCounterChannelAccountSceneTemplateAll = async () => {
    const { code, data } = await apiTrs.counterChannelAccountSceneTemplateAll(useFilter({
        status:1
    }))
    if (code != 1) return;
    form.counterChannelAccountSceneTemplate = data?.length?data:[]
}

const watchData = watch(()=>form.data,(data)=>{
    emit('update:data',{...props.data,...data})
},{
    deep:true
})
onBeforeUnmount(()=>{
    watchData && watchData()
})
onMounted(()=>{
    form.data = { ...form.data,...props.data }
})
{
    getInvestmentScopeTemplate()
    getCounterChannelAccountSceneTemplateAll()
}
</script>