<template>
    <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-row :gutter="16">
            <a-col :xs="24" :sm="12">
                <a-form-item field="trs_account_id" :label="`TRS${ $t('create.info.5umcbyexoqw0') }`">
                    <a-select :loading="form.accountLoading" @change="changeAccount" allow-search v-model:model-value="form.data.trs_account_id" :placeholder="$t('create.info.5um7xwky6wg0')"
                        :options="form.accountList" :field-names="{ value: 'id', label: 'account' }"
                        @search="getAccountList" :filter-option="true" :show-extra-options="false" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="symbol" :label="$t('create.info.5umcbyexpjc0')">
                    <a-select :loading="form.symbolLoading" @change="changeSymbol" allow-search v-model:model-value="form.data.instrument" :placeholder="$t('create.info.5umcbyexpo40')"
                            @search="getSymbolList">
                            <template #label>
                                {{form.data.symbol}}
                            </template>
                        <a-option v-for="item in (form.symbolList as any)"
                            :value="item.instrument">
                            {{ item.title }}
                        </a-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="price_type" :label="$t('create.info.5umcbyexpr00')">
                    <a-select allow-clear v-model="form.data.price_type" :placeholder="$t('create.info.5umcbyexptk0')">
                        <a-option v-for="item in form.orderBefore?.config?.allow_price_type_list" :value="item.price_type">
                            {{ useEnumsFormat('market.order.price_type',item.price_type) }}
                        </a-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="direction" :label="$t('create.info.5umcbyexq0g0')">
                    <a-select @change="getCalculateCharge" allow-clear v-model="form.data.direction" :placeholder="$t('create.info.5umcbyexptk0')">
                        <a-option v-for="item in form.orderBefore?.config?.allow_price_type_list?.find((item:any)=>item.price_type == form.data.price_type)?.allow_direction_list" :value="item.direction">
                            {{ useEnumsFormat('market.order.direction',item.direction) }}
                        </a-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="trade_price" :label="$t('create.info.5umcbyexq2o0')">
                    <a-input-number @change="getCalculateCharge" v-model="form.data.trade_price" :placeholder="$t('create.info.5umcbyexq4s0')">
                        <template #suffix>
                            {{ form.symbolList?.find((item:any)=>item.symbol == form.data.symbol)?.currency }}
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="deal_price" :label="$t('create.info.5umcbyexq7c0')">
                    <a-input-number v-model="form.data.deal_price" :placeholder="$t('create.info.5umcbyexq9o0')">
                        <template #suffix>
                            {{ form.symbolList?.find((item:any)=>item.symbol == form.data.symbol)?.currency }}
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="deal_num" :label="$t('create.info.5umcbyexqc40')">
                    <a-input-number @change="form.data.trade_num = form.data.deal_num;getCalculateCharge()" v-model="form.data.deal_num" :placeholder="$t('create.info.5umcbyexqec0')" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="trade_time" :label="$t('create.info.5umcbyexqgk0')">
                    <a-date-picker @change="form.data.deal_time = form.data.trade_time" show-time value-format="X" style="width: 100%;" v-model="form.data.trade_time" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="deal_time" :label="$t('create.info.5umcbyexqio0')">
                    <a-date-picker show-time value-format="X" style="width: 100%;" v-model="form.data.deal_time" />
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item :label="$t('create.info.5umcbyexqko0')">
                    <a-input-number :hide-button="true" readonly v-model="form.charge.broker_fee">
                        <template #suffix>
                            {{ form.symbolList?.find((item:any)=>item.symbol == form.data.symbol)?.currency }}
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item :label="$t('create.info.5umcbyexqoc0')">
                    <a-input-number :hide-button="true" readonly v-model="form.charge.person_fee">
                        <template #suffix>
                            {{ form.symbolList?.find((item:any)=>item.symbol == form.data.symbol)?.currency }}
                        </template>
                    </a-input-number>
                </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12">
                <a-form-item field="reason" :label="$t('create.info.5umcbyexqqc0')">
                    <a-input v-model="form.data.reason" :placeholder="$t('create.info.5umcbyexqs80')"/>
                </a-form-item>
            </a-col>
        </a-row>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
                <a-space :size="18">
                    <a-button @click="formRef?.resetFields()">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        {{$t('create.info.5umcbyexqu80')}}
                    </a-button>
                    <a-button :disabled="form.loading" :loading="form.loading" type="primary" html-type="submit">
                        {{$t('create.info.5um7xwky7sc0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnumsFormat,useMarketFormat } from '@/hooks/enums'
const local = useLocal()
const props = defineProps({
    data: Object,
    current: Number
})
const { t } = useI18n();
const emit = defineEmits(['update:current', 'update:data']);
const formRef = ref()
const form:any = reactive({
    show: false,
    loading: false,
    accountList: [],
    accountLoading:false,
    symbolList:[],
    symbolLoading:false,
    orderBefore:{},
    charge:{
        broker_fee:0,
        person_fee:0,
    },
    data: {
        instrument:'',
        trs_account_id: '',
        trs_assount_currency:'',
        symbol_currency:'',
        market: '',
        security_type: '',
        symbol: '',
        lot_size:"",
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
    },
    rules: {
        trs_account_id: [{ required: true, message: t('create.info.5umcbyexqw00') }],
        symbol: [{ required: true, message: t('create.info.5umcbyexqzk0') }],
        direction: [{ required: true, message: t('create.info.5umcbyexr1k0') }],
        price_type: [{ required: true, message: t('create.info.5umcbyexptk0') }],
        trade_price: [{ required: true, message: t('create.info.5umcbyexq4s0') },useRules.moreThanZero(t('create.info.5umcbyexr3g0'))],
        deal_price: [{ required: true, message: t('create.info.5umcbyexr4w0') },useRules.moreThanZero(t('create.info.5umcbyexr6g0'))],
        deal_num: [{ required: true, message: t('create.info.5umcbyexqec0') },useRules.moreThanZero(t('create.info.5umcbyexr800'))],
        trade_time: [{ required: true, message: t('create.info.5umcbyexr9s0') },useRules.lessThanNow(t('create.info.5umcbyexrb40'))],
        deal_time: [{ required: true, message: t('create.info.5umcbyexrcs0') },{
            validator: (value:any, cb:any) => {
                return new Promise(resolve => {
                    if(Number(value)<Number(form.data.trade_time)){
                        cb(t('create.info.5umcbyexre80'))
                    }
                    resolve('')
                })
            }
        }],
    }
})
const getAccountList = async (value: string) => {
    form.accountLoading = true
    const { code, data } = await apiTrs.accountList(useFilter({
        trs_account: value,
        // status: 1
    }))
    form.accountLoading = false
    if (code != 1) return;
    form.accountList = data.list
}
const getSymbolList = async (value:string) => {
    form.symbolLoading = true
    const { code, data } = await apiMarket.symbolSearch({keyword:value})
    form.symbolLoading = false
    if (code != 1) return;
    form.symbolList = data.list.map((item:any)=>{
        item.title = item.name[local.lang] + '.' + item.text
        item.instrument = `${item.market}|${item.security_type}|${item.symbol}`
        return item
    })

}
const getAccountDetail = async (id: string) => {
    const { code, data } = await apiTrs.accountInfo({
        id
    })
    if (code != 1) return;
    form.accountList = (data && [data])
}
const changeAccount = () => {
    form.data.trs_assount_currency = form.accountList?.find((item:any)=>item.id == form.data.trs_account_id)?.currency
    getOrderBefore()
}
const changeSymbol = () => {
    const stock = form.symbolList?.find((item:any)=>item.instrument == form.data.instrument)
    form.data.security_type = stock?.security_type || ''
    form.data.market = stock?.market || ''
    form.data.symbol = stock?.symbol || ''
    form.data.symbol_currency = stock?.currency || ''
    form.data.price_type = ''
    form.data.direction = ''
    form.data.lot_size = stock.lot_size
    getOrderBefore()
}
const getOrderBefore = async () => {
    if(!form.data.trs_account_id || !form.data.symbol) return;
    const { code, data } = await apiTrs.orderCreateBefore({
        market:form.data.market,
        symbol:form.data.symbol,
        security_type:form.data.security_type,
        trs_account_id:form.data.trs_account_id
    })
    if (code != 1) return;
    form.orderBefore = data
}
const getCalculateCharge = async () => {
    if(!form.data.trs_account_id || !form.data.symbol || !form.data.symbol || !form.data.trade_price || !form.data.direction){
        form.charge.broker_fee = 0
        form.charge.person_fee = 0
        return
    }
    const { code, data } = await apiTrs.orderCalculateCharge({
        ...form.data
    })
    if (code != 1) return;
    form.charge = data
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    const account = form.accountList.find((item:any)=>item.id == form.data.trs_account_id)
    if(!useMarketFormat(account.market_type,2).includes(form.data.market)) return Message.warning(t('create.info.5umcbyexrfc0'));
    if(form.data.direction == 2) {
        form.loading = true
        const { code, data } = await apiTrs.orderClosePositionItemList({
            trs_account_id: form.data.trs_account_id,
            market: form.data.market,
            security_type: form.data.security_type,
            symbol: form.data.symbol
        })
        form.loading = false
        if (code != 1) return;
        if(!data?.length) return Message.warning(t('create.info.5umcbyexrgs0'));
        if(form.data.price_type == '7' && Number(form.data.deal_num) >= Number(form.data.lot_size)) return Message.warning(`${t('create.info.5umcd2cee0k0')}`);
        let all = data.reduce((sum:any, e:any) => sum + Number(e.enable_num || 0), 0)
        let all2 = data.reduce((sum:any, e:any) => sum + Number(e.enable_num || 0) % form.data.lot_size, 0)  //获取碎股单的倍数
        if(form.data.price_type == '7' && (Number(all2) < Number(form.data.deal_num)) ) return Message.warning(t('create.info.5umcbyexri40'));
        if(form.data.price_type != '7' && (Number(form.data.deal_num % form.data.lot_size) != 0) ) return Message.warning(`${t('create.info.5umcdefdas80')}${form.data.lot_size}${t('create.info.5umcdefdc4k0')}`);
        if(form.data.deal_num>all) return Message.warning(t('create.info.5umcbyexrjk0'));
    }
    emit('update:current', Number(props.current) + 1)
}
const watchData = watch(() => form.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
onBeforeUnmount(() => {
    watchData && watchData()
})
onMounted(() => {
    form.data = { ...form.data, ...props.data }
    form.data.symbol && getSymbolList(form.data.symbol)
    form.data.trs_account_id && getAccountDetail(form.data.trs_account_id)
    getCalculateCharge()
    getOrderBefore()
})

</script>