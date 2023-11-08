<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps" :style='local.lang =="en"?"width: 950px;":""'>
                <a-steps :current="current">
                    <a-step>{{$t('create.create.5um7xhpb5j00')}}</a-step>
                    <a-step>{{$t('create.create.5um7xhpb63c0')}}</a-step>
                    <a-step>{{$t('create.create.5um7xhpb66s0')}}</a-step>
                    <a-step>{{$t('create.create.5um7xhpb6980')}}</a-step>
                    <a-step>{{$t('create.create.5um7xhpb6b40')}}</a-step>
                </a-steps>
            </div>
            <info v-model:data="form.data" v-model:current="current" v-if="current == 1 && refresh"></info>
            <trade v-model:data="form.data" v-model:current="current" v-if="current == 2 && refresh"></trade>
            <risk v-model:data="form.data" v-model:current="current" v-if="current == 3 && refresh"></risk>
            <charge v-model:data="form.data" v-model:current="current" v-if="current == 4 && refresh"></charge>
            <success v-model:data="form.data" v-model:current="current" v-show="current == 5 && refresh"></success>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import info from './info.vue'
import trade from './trade.vue'
import risk from './risk.vue'
import charge from './charge.vue'
import success from './success.vue'
const route = useRoute()
const router = useRouter()
const current = ref(1)
const local = useLocal()
const refresh = ref(true)
const form:any = reactive({
    show: false,
    loading: false,
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
        interest_round_precision: 2,
        interest_deduct_type:"",
        open_time: '',
        expire_time: '',
        finance_interest_accrual_amount: 0,
        counter_channel_account_scene_temp_id: '',
        risk_control_calculate_type: 1,
        warn_value: 30,
        close_value: 60,
        market_type: '',
        risk_control_list:[],
        interest_deduct_account:''
    }
})

const getData = async () => {
    const { code, data } = await apiTrs.accountApplyInfo({
        apply_id: route.query?.apply_id
    })
    if (code != 1) return;
    form.data.asset_account_id = data.asset_account_id
    form.data.currency = data.currency
    form.data.total_cash = Number(data.total_cash)
    form.data.total_finance = Number(data.total_finance)
    form.data.open_time = dayjs().format('YYYY-MM-DD')
    form.data.expire_time = dayjs().add(data.time_limit, 'month').format('YYYY-MM-DD')
    form.data.market_type = data.market_type
    form.data.investment_scope_temp_id = data.investment_scope_temp_id
    form.data.warn_value = Number(data.warn_value)
    form.data.close_value = Number(data.close_value)
    form.data.annual_interest_rate = Number(data.annual_interest_rate)
    form.data.interest_accrual_type = data.interest_accrual_type
    form.data.risk_control_list = [
    {
        name: {
            'zh-CN': '预警线',
            'en': 'Warning line',
            'tc': '預警線',
        },
        level: 1,
        loss_value: form.data.warn_value,
        trade_status: ['2'],
        is_close_position: false,
        is_cancel_order: false,
        id:Math.random()
    },
    {
        name: {
            'zh-CN': '平仓线',
            'en': 'Liquidation line',
            'tc': '平倉線',
        },
        level: 2,
        loss_value: form.data.close_value,
        trade_status: ['3'],
        is_close_position: true,
        is_cancel_order: true,
        id:Math.random()
    }
    ]
    // 让子组件重新载入数据
    refresh.value = false
    nextTick(()=>{
        refresh.value = true
    })
}
{
    route.query?.apply_id && getData()
}
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 30px;
}
</style>