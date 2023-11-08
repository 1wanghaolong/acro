<template>
  <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
    :style="{ maxWidth: (form.data.direction as any) == 1?'600px':'900px', margin: 'auto' }" @submit="submit">
    <a-row>
      <a-col :xs="24">
        <a-form-item>
          <div style="width: 100%;">
            <a-space direction="vertical" fill>
              <a-alert v-if="(form.data.direction as any) == 1" :show-icon="false"
                type="error">{{$t('create.allocation.5umca8gs4ww0')}}</a-alert>
              <a-alert v-if="(form.data.direction as any) == 2" type="success">{{$t('create.allocation.5umca8gs5k00')}}</a-alert>
              <a-alert :show-icon="false" v-if="form.data.trs_assount_currency != form.data.symbol_currency">{{$t('create.allocation.5umdnmhma1o0')}}{{
                form.data.trs_assount_currency }}，{{$t('create.allocation.5umdnmhmak00')}}{{ form.data.symbol_currency }}，{{$t('create.allocation.5umdnmhmao80')}}</a-alert>
            </a-space>
          </div>
        </a-form-item>
      </a-col>
      <template v-if="(form.data.direction as any) == 1">
        <a-col :xs="24">
          <a-form-item field="counter_channel_list[0].counter_channel_account_id" :label="$t('create.allocation.5umca8gs5o00')"
            :rules="[{ required: true, message: $t('create.allocation.5umca8gs5qc0') }]">
            <a-select @change="changeAccount" v-model="form.data.counter_channel_list[0].counter_channel_account_id"
              :placeholder="$t('create.allocation.5umca8gs5qc0')">
              <a-option v-for="item in (form.counterChannelAccount as any)" :value="item.id">{{
                item.name }}</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24">
          <a-form-item field="counter_channel_list[0].counter_channel_scene" :label="$t('create.allocation.5umca8gs5so0')"
            :rules="[{ required: true, message: $t('create.allocation.5umca8gs5v40') }]">
            <a-select allow-clear v-model="form.data.counter_channel_list[0].counter_channel_scene" :placeholder="$t('create.allocation.5umca8gs5v40')">
              <a-option
                v-for="item in (form.counterChannelAccount as any)?.find((i: any) => i.id == form.data.counter_channel_list[0].counter_channel_account_id)?.scene_list"
                :value="item.counter_channel_scene">
                {{ useEnumsFormat('market.order.counter_channel_scene', item.counter_channel_scene) }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24"
          v-if="!dayjs.unix(form.data.deal_time).isToday() && form.data.trs_assount_currency != form.data.symbol_currency">
          <a-form-item field="counter_channel_list[0].settlement_exchange_rate" :label="$t('create.allocation.5umca8gs5ww0')"
            :rules="[{ required: true, message: $t('create.allocation.5umca8gs5yo0') }]">
            <div style="width: 100%;">
              <a-space direction="vertical" fill>
                <a-input-number v-model="form.data.counter_channel_list[0].settlement_exchange_rate">
                  <template #suffix>
                    {{ form.data.symbol_currency }}
                    <icon-arrow-right />
                    {{ form.data.trs_assount_currency }}
                  </template>
                </a-input-number>
                <a-tag>{{$t('create.allocation.5umdnmhmar80')}}：{{ dayjs.unix(form.data.deal_time).format('YYYY/MM/DD') }}，{{$t('create.allocation.5umdnmhmauc0')}}</a-tag>
              </a-space>
            </div>
          </a-form-item>
        </a-col>
        <a-col :xs="24" v-if="dayjs.unix(form.data.deal_time).isToday() && form.data.trs_assount_currency != form.data.symbol_currency">
          <a-form-item :label="$t('create.allocation.5umca8gs60g0')">
            <div style="width: 100%;">
              <a-space direction="vertical" fill>
                <a-input-number :hide-button="true" readonly v-model="form.exchange_rate">
                  <template #suffix>
                    {{ form.data.symbol_currency }}
                    <icon-arrow-right />
                    {{ form.data.trs_assount_currency }}
                  </template>
                </a-input-number>
                <a-tag>{{$t('create.allocation.5umdnmhmar80')}}：{{ dayjs.unix(form.data.deal_time).format('YYYY/MM/DD') }}，{{$t('create.allocation.5umdnmhmaxg0')}}{{Number(form.data.direction) == 1? $t('create.allocation.5umdnmhmb000') : $t('create.allocation.5umdnmhmb2k0') }}{{$t('create.allocation.5umdnmhmce40')}}</a-tag>
              </a-space>
            </div>
          </a-form-item>
        </a-col>
      </template>
      <div style="width: 100%;height: 300px;" v-if="(form.data.direction as any) == 2">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="form.loading"
          :scroll="form.positionList?.length ? { x: '100%', y: '100%' } : undefined" size="small"
          :data="form.positionList" class="table">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('create.allocation.5umca8gs5o00')">
              <template #cell="{ record }">
                {{ record.counter_channel_account_info?.name }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('create.allocation.5umca8gs5so0')">
              <template #cell="{ record }">
                  {{ useEnumsFormat('market.order.counter_channel_scene',record.counter_channel_scene) }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('create.allocation.5umca8gs6280')">
              <template #cell="{ record }">
                  {{ record.enable_num }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('create.allocation.5umca8gs6480')">
              <template #cell="{ record }">
                  {{ record?.sell_num }}
              </template>
            </a-table-column>
            <a-table-column v-if="form.data.trs_assount_currency != form.data.symbol_currency" :title="!dayjs.unix(form.data.deal_time).isToday()? $t('create.allocation.5umca8gs5ww0') : $t('create.allocation.5umca8gs60g0') " :width="200">
              <template #cell="{ rowIndex }">
                <a-input-number v-if="form.data.counter_channel_list?.[rowIndex] && refresh" :hide-button="dayjs.unix(form.data.deal_time).isToday()" :readonly="dayjs.unix(form.data.deal_time).isToday()" v-model="form.data.counter_channel_list[rowIndex].settlement_exchange_rate">
                  <template #suffix>
                    {{ form.data.symbol_currency }}
                    <icon-arrow-right />
                    {{ form.data.trs_assount_currency }}
                  </template>
                </a-input-number>
              </template>
            </a-table-column>
          </template>
          <template #footer>
            <div style="display: flex;justify-content: flex-end;">
              <a-tag v-if="!dayjs.unix(form.data.deal_time).isToday()">{{$t('create.allocation.5umdnmhmar80')}}：{{ dayjs.unix(form.data.deal_time).format('YYYY/MM/DD') }}，{{$t('create.allocation.5umdnmhmauc0')}}</a-tag>
              <a-tag v-else>{{$t('create.allocation.5umdnmhmar80')}}：{{ dayjs.unix(form.data.deal_time).format('YYYY/MM/DD') }}，{{'尚未结算'}}，{{'将以预估汇率'}}{{Number(form.data.direction) == 1?'扣除':'新增'}}{{'可用购买力'}}</a-tag>
            </div>
          </template>
        </a-table>
      </div>
    </a-row>
    <a-form-item>
      <div style="display: flex;justify-content: flex-end;width: 100%;">
        <a-space :size="18">
          <a-button @click="step(-1)">
            {{$t('create.allocation.5umca8gs66w0')}}
          </a-button>
          <a-button type="primary" :loading="form.loading" :disabled="form.loading" html-type="submit">
            <template #icon>
                <icon-check />
            </template>
            {{$t('create.allocation.5umca8gs6ec0')}}
          </a-button>
        </a-space>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { useEnumsFormat } from '@/hooks/enums'
dayjs.extend(isToday)
const formRef = ref()
const { t } = useI18n();
const refresh = ref(true)
const props = defineProps({
  data: Object,
  current: Number
})
const emit = defineEmits(['update:current', 'update:data']);
const form:any = reactive({
  show: false,
  loading: false,
  counterChannelAccount: [],
  positionList: [],
  exchange_rate: 0,
  data: {
    trs_account_id: '',
    trs_assount_currency: '',
    symbol_currency: '',
    market: '',
    security_type: '',
    lot_size:"",
    symbol: '',
    trade_price: 0,
    trade_num: 0,
    trade_type: 1,
    expire_type:1,
    direction: '',
    price_type: '',
    deal_price: 0,
    deal_num: 0,
    trade_time: 0,
    deal_time: 0,
    reason: "",
    counter_channel_list: [{
      counter_channel_id: '',
      counter_channel_account_id: '',
      counter_channel_scene: '',
      settlement_exchange_rate: 0
    }]
  },
  rules: {
    market_type: [{ required: true, message: t('create.allocation.5umca8gs6gk0') }],
    investment_scope_temp_id: [{ required: true, message: t('create.allocation.5umca8gs6j00') }],
    counter_channel_account_scene_temp_id: [{ required: true, message: t('create.allocation.5umca8gs6ko0') }],
  }
})
const step = (type: number) => {
  if (type == -1) return emit('update:current', Number(props.current) - 1)
  emit('update:current', Number(props.current) + 1)
}
const submit = async () => {
  const validate = await formRef.value?.validate()
  if (validate) return;
  const formData = cloneDeep(form.data)
  delete formData.trs_assount_currency
  delete formData.symbol_currency
  formData.trade_time = Number(formData.trade_time)
  formData.deal_time = Number(formData.deal_time)
  form.loading = true
  const { code } = await apiTrs.orderCreate({
    ...formData
  })
  form.loading = false
  if (code != 1) return;
  emit('update:current', Number(props.current) + 1)
}
const getCounterChannelAccountAll = async () => {
  const { code, data } = await apiTrs.counterChannelAccountList({
    trs_account_id:form.data.trs_account_id
  })
  if (code != 1) return;
  form.counterChannelAccount = data?.length ? data : []
}
const getExchangeRateInfo = async (counter_channel_id:any) => {
  const { code, data } = await apiTrs.counterChannelExchangeRateInfo({
    counter_channel_id,
    report_date:dayjs.unix(form.data.deal_time).format('YYYY-MM-DD')
  })
  if (code != 1) return 0;
  if (data?.report_time) {
    return Number(data?.exchange_rate_list?.find((item: any) => item.from_currency == form.data.symbol_currency && item.to_currency == form.data.trs_assount_currency)?.exchange_rate || 0)
  }else{
    return form.exchange_rate || 0
  }
}
const getData = async () => {
  if (!form.data.trs_account_id || !form.data.market || !form.data.security_type || !form.data.symbol) return;
  form.loading = true
  const { code, data } = await apiTrs.orderClosePositionItemList({
    trs_account_id: form.data.trs_account_id,
    market: form.data.market,
    security_type: form.data.security_type,
    symbol: form.data.symbol
  })
  form.loading = false
  if (code != 1) return;
  if(!data?.length) return;
  form.loading = true
  const arr = await Promise.all(data.map((item:any)=>getExchangeRateInfo(item.counter_channel_id)))
  form.loading = false
  form.data.counter_channel_list = data.map((item:any,index:any)=>{
    return {
      counter_channel_id: item.counter_channel_id,
      counter_channel_account_id:item.counter_channel_account_id,
      counter_channel_scene: item.counter_channel_scene,
      settlement_exchange_rate:Number(arr[index])
    }
  })
  let num = Number(form.data.deal_num)
  let arrData = cloneDeep(data)
  let all2:any = data.reduce((sum:any, e:any) => sum + Number(parseInt(''+(Number(e.enable_num || 0) / Number(form.data.lot_size)))) * form.data.lot_size, 0)
  arrData = arrData.map((item:any) => { 
    item.round_num  = all2 >= form.data.deal_num ? Number(parseInt(''+(Number(item.enable_num || 0) / Number(form.data.lot_size)))) * form.data.lot_size : item.enable_num
    return item
  })
  form.positionList = arrData?.length ? arrData.map((item:any)=>{
    if(num>=item.round_num && form.data.price_type != '7'){
      item.sell_num = item.round_num
      num -= item.round_num
    }else if(num>= Number(item.enable_num % form.data.lot_size) && form.data.price_type == '7'){
      item.sell_num = Number(item.enable_num % form.data.lot_size)
      num -= item.sell_num
    }else if(num == 0){
      item.sell_num = 0
    }else{
      item.sell_num = num
      num = 0
    }
    return item
  }) : []
}
const changeAccount = () => {
  form.data.counter_channel_list[0].counter_channel_id = (form.counterChannelAccount as any)?.find((item: any) => item.id == form.data.counter_channel_list[0].counter_channel_account_id)?.counter_channel_id
  form.data.counter_channel_list[0].counter_channel_scene = ''
  getCounterChannelExchangeRateInfo()
}
const getCounterChannelExchangeRateInfo = async () => {
  const { code, data } = await apiTrs.counterChannelExchangeRateInfo({
    counter_channel_id: (form.counterChannelAccount as any)?.find((item: any) => item.id == form.data.counter_channel_list[0].counter_channel_account_id)?.counter_channel_id,
    report_date: dayjs.unix(form.data.deal_time).format('YYYY-MM-DD')
  })
  if (code != 1) return;
  if (data?.report_time) {
    form.data.counter_channel_list[0].settlement_exchange_rate = Number(data?.exchange_rate_list?.find((item: any) => item.from_currency == form.data.symbol_currency && item.to_currency == form.data.trs_assount_currency)?.exchange_rate || 0)
  }
}
const getExchangeRate = async () => {
  form.loading = true
  const { code, data } = await apiOtc.exchangeRateList(useFilter({
    is_latest: 1
  }))
  form.loading = false
  if (code != 1) return;
  if (data.list?.length) {
    form.data.counter_channel_list[0].settlement_exchange_rate = Number(data?.list[0]?.exchange_rate_list?.find((item: any) => item.from_currency == form.data.symbol_currency && item.to_currency == form.data.trs_assount_currency)?.exchange_rate || 0)
    form.exchange_rate = Number(data?.list[0]?.exchange_rate_list?.find((item: any) => item.from_currency == form.data.symbol_currency && item.to_currency == form.data.trs_assount_currency)?.exchange_rate || 0)
  }
  Number(form.data.direction) == 2 && getData()
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
  getCounterChannelAccountAll()
})
{
  getExchangeRate()
}
</script>