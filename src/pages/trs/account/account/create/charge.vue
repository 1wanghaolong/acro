<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-form-item field="interest_accrual_type" :label="$t('create.charge.5um7x31vmrk0')">
            <a-select v-model="form.data.interest_accrual_type" :placeholder="$t('create.charge.5um7x31vo3c0')">
                <a-option v-for="item in useEnums('trs.account.interest_accrual_type')" :value="item.value">
                    {{ item.trans[local.lang] }}
                </a-option>
            </a-select>
        </a-form-item>
        <a-form-item v-if="form.data.interest_accrual_type == 2" field="finance_interest_accrual_amount" :label="$t('create.charge.5um7x31vo6k0')" :rules="[{ required: true, message: '请选择计息金额' }]">
            <a-input-number :disabled='true' v-model="form.data.finance_interest_accrual_amount" :placeholder="$t('create.charge.5um7x31vo9g0')" allow-clear>
                <template #suffix>
                    {{form.data.currency}}
                </template>
            </a-input-number>
        </a-form-item>
        <a-form-item :label="$t('create.charge.5um7x31vobg0')" required>
            <a-select 
                v-if='viteItemName == "hx"'
                v-model='form.data.interest_deduct_type'
                :placeholder="$t('create.charge.5um7x31vodo0')">
                <a-option v-for="item in useEnums('trs.account.hx_deduct_type')"
                    :value="item.value">
                    {{ item.trans[local.lang] }}
                </a-option>
            </a-select>
            <a-select 
                v-else
                v-model='form.data.interest_deduct_type'
                :placeholder="$t('create.charge.5um7x31vodo0')">
                <a-option v-for="item in useEnums('trs.account.deduct_type')"
                    :value="item.value">
                    {{ item.trans[local.lang] }}
                </a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="annual_interest_rate" :label="$t('create.charge.5um7x31vofg0')">
            <a-input-number v-model="form.data.annual_interest_rate" :placeholder="$t('create.charge.5um7x31voi40')" allow-clear>
                <template #suffix>
                    %
                </template>
            </a-input-number>
        </a-form-item>
        <a-form-item field="interest_round_precision" :label="$t('create.charge.5um7x31vok00')">
            <a-input-number :min="0" v-model="form.data.interest_round_precision" :placeholder="$t('create.charge.5um7x31vomg0')" />
        </a-form-item>
        <a-form-item field="interest_round_type" :label="$t('create.charge.5um7x31voo80')">
            <a-select allow-clear v-model="form.data.interest_round_type" :placeholder="$t('create.charge.5um7x31voqk0')">
                <a-option v-for="item in useEnums('trs.account.interest_round_type')" :value="item.value">
                    {{ item.trans[local.lang] }}
                </a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="interest_deduct_account" :label="$t('create.charge.5um7x31vosw0')">
            <a-select allow-clear v-model="form.data.interest_deduct_account" :placeholder="$t('create.charge.5um7x31vovs0')">
                <a-option v-for="item in useEnums('trs.account.interest_deduct_account')" :value="item.value">
                    {{ item.trans[local.lang] }}
                </a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="charge_package_id" :label="$t('create.charge.5um7x31voxw0')">
            <a-select v-model="form.data.charge_package_id" :placeholder="$t('create.charge.5um7x31vozs0')">
                <a-option v-for="item in (form.accountChargePackage as any)" :value="item.id">
                    {{ item.name }}
                </a-option>
            </a-select>
        </a-form-item>
        
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
                <a-space :size="18">
                    <a-button @click="step(-1)">
                        {{$t('create.charge.5um7x31vp1w0')}}
                    </a-button>
                    <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
                        <template #icon>
                            <icon-check />
                        </template>
                        {{$t('create.charge.5um7x31vp3o0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const route = useRoute()
const formRef = ref()
const { t } = useI18n();
const props = defineProps({
    data:Object,
    current:Number
})
const viteItemName = import.meta.env.VITE_ITEM_NAME || ""
const emit = defineEmits(['update:current','update:data']);
const form = reactive({
    show: false,
    loading: false,
    config:{},
    accountChargePackage:[],
    data: {
        asset_account_id: '',
        charge_package_id: '',
        currency: '',
        total_cash: 0,
        total_finance: 0,
        investment_scope_temp_id: '',
        interest_accrual_type: 1,
        annual_interest_rate: 0,
        interest_round_type: 2,
        interest_deduct_account:'',
        interest_round_precision: 2,
        interest_deduct_type:"",
        open_time: '',
        expire_time: '',
        finance_interest_accrual_amount:0,
        counter_channel_account_scene_temp_id: '',
        risk_control_calculate_type: 1,
        warn_value: 30,
        close_value: 60,
        market_type: '',
        agreement_name: '',
        agreement_url: [],
        risk_control_list: [],
        expire_is_close_position: 1
    },
    rules: {
        interest_accrual_type: [{ required: true, message: t('create.charge.5um7x31vo3c0') }],
        annual_interest_rate: [{ required: true, message: t('create.charge.5um7x31voi40') }],
        interest_round_precision: [{ required: true, message: t('create.charge.5um7x31vp640') }],
        interest_round_type: [{ required: true, message: t('create.charge.5um7x31vp800') }],
        interest_deduct_account: [{ required: true, message: t('create.charge.5um7x31vovs0') }],
        charge_package_id:[{ required: true, message: t('create.charge.5um7x31vozs0') }]
    }
})
const step = (type:number) => {
    if(type == -1) return emit('update:current',Number(props.current)-1)
    emit('update:current',Number(props.current)+1)
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    let obj = JSON.parse(JSON.stringify(form.data))
    obj.risk_control_list.forEach((item:any)=>{
        item.is_close_position = item.is_close_position?1:0
        item.is_cancel_order = item.is_cancel_order?1:0
        if(item.trade_status?.length){
            item.trade_status = item.trade_status[0]
        }else{
            item.trade_status = 1
        }
    })
    delete obj.close_value
    delete obj.warn_value
    let data = cloneDeep(obj)
    if(route.query?.apply_id){
        data.apply_id = route.query?.apply_id
    }
    const { code } = await apiTrs.accountCreate({
        data:{
            ...data,
            agreement_url:form.data.agreement_url.map((item:any)=>item.response?.url)?.join(),
            operator_id:local.userInfo?.id || 1,
        }
    })
    if (code != 1) return;
    emit('update:current',Number(props.current)+1)
}
const getAccountChargePackageAll = async () => {
    const { code, data } = await apiTrs.accountChargePackageAll(useFilter({
        status:1
    }))
    if (code != 1) return;
    form.accountChargePackage = data?.length?data:[]
}
const getConfig = async () => {
    const { code, data } = await apiAdmin.configList({
        group:'trs'
    })
    if (code != 1) return;
    form.config = data
    form.data.finance_interest_accrual_amount = Number(form.data.total_finance)-Number(form.data.total_cash)
    // if(data.finance_interest_rate.interest_accrual_type == "1"){
    // }else{
    //     form.data.finance_interest_accrual_amount = Number(form.data.total_finance)-Number(form.data.total_cash)
    // }
    form.data.interest_round_precision = Number(data.finance_interest_rate.interest_round_precision)
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
    getConfig()
})
{
    getAccountChargePackageAll()
}
</script>
<style  scoped>
    :deep(.arco-input-wrapper .arco-input[disabled]){
        -webkit-text-fill-color: var(--color-text-1);
    }
</style>