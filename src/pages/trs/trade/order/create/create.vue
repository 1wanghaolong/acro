<template>
    <div class="wrap">
        <Breadcrumb />
        <a-card class="generalCard">
            <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
            <div class="steps">
                <a-steps :current="current">
                    <a-step>{{$t('create.create.5umcbsu00bs0')}}</a-step>
                    <a-step>{{$t('create.create.5umcbsu019s0')}}</a-step>
                    <a-step>{{$t('create.create.5um8eulhgh00')}}</a-step>
                </a-steps>
            </div>
            <info v-model:data="form.data" v-model:current="current" v-if="current == 1 && refresh"></info>
            <allocation v-model:data="form.data" v-model:current="current" v-if="current == 2 && refresh"></allocation>
            <success v-model:data="form.data" v-model:current="current" v-show="current == 3 && refresh"></success>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
// import dayjs from 'dayjs'
import info from './info.vue'
import allocation from './allocation.vue'
import success from './success.vue'
const route = useRoute()
const router = useRouter()
const current = ref(1)
const refresh = ref(true)
const form = reactive({
    show: false,
    loading: false,
    data: {
        trs_account_id: '',
        trs_assount_currency:'',
        symbol_currency:'',
        market: '',
        security_type: '',
        symbol: '',
        trade_price: 0,
        trade_num: 0,
        trade_type: 1,
        expire_type:1,
        direction: '',
        price_type: '',
        deal_price: 0,
        deal_num: 0,
        trade_time: '',
        deal_time: '',
        reason: "",
        counter_channel_list: [{
            counter_channel_id:'',
            counter_channel_account_id:'',
            counter_channel_scene:'',
            settlement_exchange_rate: 0
        }]
    }
})

// const getData = async () => {
//     const { code, data } = await apiTrs.accountApplyInfo({
//         apply_id: route.query?.apply_id
//     })
//     if (code != 1) return;
    
//     // 让子组件重新载入数据
//     refresh.value = false
//     nextTick(()=>{
//         refresh.value = true
//     })
// }
// {
//     route.query?.apply_id && getData()
// }
</script>
<style lang="less" scoped>
.steps {
    width: 800px;
    margin: 20px auto 0;
}
</style>