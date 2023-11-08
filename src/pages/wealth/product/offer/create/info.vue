<template>
    <a-form style="padding-top: 20px;" ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-form-item field="options_product_id" :label="$t('offer.info.5umx6c7qc840')">
            <a-select v-model="form.data.options_product_id" @change="selectChange($event)">
                <a-option :value="item.id" v-for="item in TypeAllData">{{ item.product_name }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="status" :label="$t('offer.info.5umx6c7qdqg0')">
            <a-switch v-model="form.data.status" :checked-value="1" :unchecked-value="0" />
        </a-form-item>
        <a-form-item field="end_time" :label="$t('offer.info.5umx6c7qdxg0')">
            <a-switch v-model="longTerm" :checked-value="1" :unchecked-value="0" />
            <div style="margin-left: 5px;">{{$t('offer.info.5umx6c7qe280')}}</div>
            <a-date-picker v-if="longTerm == '0'"  style="margin-left: 20px;flex: 1;" v-model="form.data.end_time" show-time value-format="YYYY-MM-DD HH:mm:ss"
             />
        </a-form-item>
        <a-form-item field="market" :label="$t('offer.info.5umx6c7qe780')">
            <a-select allow-clear v-model="form.data.market" :placeholder="$t('offer.info.5umx6c7qec40')">
                <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                    item.trans[local.lang] }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="symbol" :label="$t('offer.info.5umx6c7qek00')">
            <a-input v-model="form.data.symbol" :placeholder="$t('offer.info.5umx6c7qep00')">
            </a-input>
        </a-form-item>
        <!-- <a-form-item field="security_type" label='证券类型'>
            <a-select allow-clear v-model="form.data.security_type" :placeholder="$t('offer.info.5umx6c7qec40')">
                <a-option v-for="item in useEnums('market.security_type')" :value="item.value">{{
                    item.trans[local.lang] }}</a-option>
            </a-select>
        </a-form-item> -->
        <a-form-item field="currency" :label="$t('offer.info.5umx6c7qev40')">
            <a-select  v-model="form.data.currency">
                <a-option  :value="item.value" v-for="item in useEnums('currency')">{{
                    item.trans[local.lang] }}</a-option>
            </a-select>
        </a-form-item>
        <a-form-item field="period" :label="$t('offer.info.5umx6c7qezc0')" :rules="[{ required: true, message: $t('offer.info.5umx7i0vgas0') }]">
            <a-select v-model="form.data.period" :placeholder="$t('offer.info.5umx6c7qec40')">
                <a-option v-for="item of form.data.periodEnum" :value="item.value" :label="item.name" />
            </a-select>
        </a-form-item>
        <a-form-item field="nominal_principal" :label="$t('offer.info.5umx6c7qf4o0')">
            <div style="display: flex;flex-direction: column;width: 100%;">
                <a-input v-model="form.data.nominal_principal" :placeholder="$t('offer.info.5umx6c7qep00') "/>
                <div style="padding-top: 10px;">
                    {{$t('offer.info.5umx7i0vh7o0')}}：{{ form.data.nominal_principal_min }}{{$t('offer.info.5umx7i0vhgg0')}} ,            
                    {{$t('offer.info.5umx7i0vhd00')}}：{{ form.data.nominal_principal_step }}{{$t('offer.info.5umx7i0vhgg0')}}
                </div>
            </div>
        </a-form-item>
        <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
                <a-space :size="18">
                    <a-button type="primary" html-type="submit">
                        {{$t('offer.info.5umx6c7qfac0')}}
                    </a-button>
                </a-space>
            </div>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs';
const { t } = useI18n();
const local = useLocal()
const props = defineProps({
    data: Object,
    current: Number
})
const formRef: any = ref(null)
const TypeAllData: any = ref([])
const longTerm: any = ref(0)
const form:any = ref({
    show: false,
    loading: false,
    accountList: [],
    data: {
        options_product_id: "",
        market: "",
        symbol: "",
        period: "",
        currency:"",
        periodEnum:[],
        start_time2: "",
        end_time: "",
        start_time: "",
        status:"",
        nominal_principal_min:"",
        nominal_principal_step:""
    },
    rules: {
        'options_product_id': [{ required: true, message: t('offer.info.5umx6c7qffc0') }],
        'market': [{ required: true, message: t('offer.info.5umx6c7qfnc0') }],
        'symbol': [{ required: true, message: t('offer.info.5umx6c7qft80') }],
        'currency': [{ required: true, message: t('offer.info.5umx6c7qfyk0') }],
        'nominal_principal': [{ required: true, message: t('offer.info.5umx6c7qg2k0') }],
        // 'security_type': [{ required: true, message: '请选择市场类型' }],
    }
})
const emit = defineEmits(['update:current', 'update:data']);
const allData = ref({
    status: "",
    product_name: ""
})
const selectChange = (value:any) =>{
   if (!value) {
    return
   }
   form.value.data = {}
   let list = TypeAllData.value.find((item:any) => item.id == value)
   form.value.data = list
   form.value.data.options_product_id = value
   form.value.data.periodEnum = []
   form.value.data.start_time2 = dayjs.unix(form.value.data.create_time).format('YYYY-MM-DD')
   if (list.period) {
    let riList = list.period.split(',')
    riList.forEach((item:any)=>{
        form.value.data.periodEnum.push({
            name:item + t('offer.info.5umx6c7qg8g0'),
            value:item
        })
    })
    form.value.data.period = ""
   }
   getData()
}
const submit = async () => {
    const validate = await formRef.value?.validate()
    if (validate) return;
    if (!form.value.data.symbol) {
        Message.info({ content: t('offer.info.5umx6c7qft80') })
        return
    }
    if (!longTerm.value && !form.value.data.end_time) {
        Message.info({ content: t('offer.info.5umx6c7qgeo0') })
        return
    }
    if (longTerm.value) {
        form.value.data.end_time = 0
        form.value.data.start_time = 0
    }else{
        form.value.data.start_time = form.value.data.start_time2
    }
    emit('update:current', Number(props.current) + 1)
}
const ProductAllData = async () => {
    const { code, data } = await apiWealth.apiWealthOptionsProductAll({
        ...useFilter(allData.value)
    })
    if (code != 1) return;
    TypeAllData.value = data.list
}
const watchData = watch(() => form.value.data, (data) => {
    emit('update:data', { ...props.data, ...data })
}, {
    deep: true
})
onBeforeUnmount(() => {
    watchData && watchData()
})
const getData = async () => {
    const { code, data } = await apiWealth.wealthOptionsProductInfo({
        id: form.value.data.id
    })
    if (code != 1) return;
    form.value.data.framework_params = data.framework_params
    form.value.data.quote_params = data.quote_params
    form.value.data.nominal_principal_step = data.nominal_principal_step
    form.value.data.nominal_principal_min = data.nominal_principal_min
}
onMounted(() => {
    form.value.data = { ...form.value.data, ...props.data }
    if (form.value.data.end_time == 0 &&form.value.data.start_time == 0) {
        longTerm.value = 1
    }
    ProductAllData()
})

</script>