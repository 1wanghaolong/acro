<template>
  <div class="offerIndex">
    <a-card :loading="loading">
      <template #title>
        <div style="display: flex;justify-content: space-between;">
          <a-space :size="18">
            {{$t('offer.index.5umwzg54wfc0')}}
          </a-space>
          <a-space :size="18">
            <a-button v-if="!form.setup" @click="submit" type="primary" :loading="loading" :disabled="loading">
              <template #icon>
                <icon-save />
              </template>
              {{$t('offer.index.5umwzg5532o0')}}
            </a-button>
            <a-button v-permission="['wealthproductofferDetailIndexEdit']" v-if="form.setup" @click="form.setup = false"
              type="primary">
              <template #icon>
                <icon-edit />
              </template>
              {{$t('offer.index.5umwzg556w80')}}
            </a-button>
          </a-space>
        </div>
      </template>
      <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical"
        :style="{ maxWidth: '600px', margin: 'auto' }" @submit="submit">
        <a-form-item field="options_product_id" :label="$t('offer.index.5umwzg557ao0')">
          <a-select :disabled="form.setup" v-model="form.data.options_product_id" @change="selectChange($event)">
            <a-option :value="item.id" v-for="item in TypeAllData">{{ item.product_name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="status" :label="$t('offer.index.5umwzg557kg0')">
          <a-switch :disabled="form.setup" v-model="form.data.status" :checked-value="1" :unchecked-value="0" />
        </a-form-item>
        <a-form-item field="end_time" :label="$t('offer.index.5umwzg557u80')">
          <a-switch :disabled="form.setup" v-model="longTerm" :checked-value="1" :unchecked-value="0" />
          <div style="margin-left: 5px;">{{$t('offer.index.5umwzg558480')}}</div>
          <a-date-picker :disabled="form.setup" v-if="longTerm == '0'" style="margin-left: 20px;flex: 1;"
            v-model="form.data.end_time" show-time value-format="YYYY-MM-DD HH:mm:ss" />
        </a-form-item>
        <a-form-item field="market" :label="$t('offer.index.5umwzg558uo0')">
          <a-select :disabled="form.setup" allow-clear v-model="form.data.market" :placeholder="$t('offer.index.5umwzg55afs0')">
            <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
              item.trans[local.lang] }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="symbol" :label="$t('offer.index.5umwzg55asw0')">
          <a-input :disabled="form.setup" v-model="form.data.symbol" :placeholder="$t('offer.index.5umwzg55azw0')">
          </a-input>
        </a-form-item>
        <!-- <a-form-item field="security_type" label='证券类型'>
          <a-select :disabled="form.setup" allow-clear v-model="form.data.security_type" :placeholder="$t('offer.index.5umwzg55afs0')">
            <a-option v-for="item in useEnums('market.security_type')" :value="item.value">{{
              item.trans[local.lang] }}</a-option>
          </a-select>
        </a-form-item> -->
        <a-form-item field="currency" :label="$t('offer.index.5umwzg55b6s0')">
          <a-select :disabled="form.setup" v-model="form.data.currency">
            <a-option :value="item.value" v-for="item in useEnums('currency')">{{
              item.trans[local.lang] }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item :disabled="form.setup" field="period" :label="$t('offer.index.5umwzg55bcc0')" :rules="[{ required: true, message: $t('offer.index.5umx0mssox40') }]">
          <a-select v-model="form.data.period" :placeholder="$t('offer.index.5umwzg55afs0')">
            <a-option v-for="item of form.data.periodEnum" :value="item.value" :label="item.name" />
          </a-select>
        </a-form-item>
        <a-form-item :disabled="form.setup" field="nominal_principal" :label="$t('offer.index.5umwzg55bhw0')">
          <div style="display: flex;flex-direction: column;width: 100%;">
            <a-input v-model="form.data.nominal_principal" :placeholder="$t('offer.index.5umwzg55azw0')" />
            <div style="padding-top: 10px;">
              {{$t('offer.index.5umx0mssq2s0')}}：{{ form.data.options_product_info?.nominal_principal_min || form.data.nominal_principal_min }}{{$t('offer.index.5umx0mssqec0')}} ,
              {{$t('offer.index.5umx0mssq9g0')}}:{{ form.data.options_product_info?.nominal_principal_step || form.data.nominal_principal_step
              }}{{$t('offer.index.5umx0mssqec0')}}
            </div>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
  
<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs';
const { t } = useI18n();
const route = useRoute()
const local = useLocal()
const loading: any = ref(false)
const longTerm: any = ref(0)
const TypeAllData: any = ref([])
const allData = ref({
  status: "1",
  product_name: ""
})
const form: any = ref({
  show: false,
  loading: false,
  setup: true,
  accountList: [],
  data: {
    options_product_id: "",
    market: "",
    symbol: "",
    period: "",
    currency: [],
    periodEnum: [],
    end_time: "",
    start_time: "",
    status: "",
    nominal_principal: "",
    params_content: [],
    security_type: "1"
  },
  rules: {
    'options_product_id': [{ required: true, message: t('offer.index.5umwzg55bmw0') }],
    'market': [{ required: true, message: t('offer.index.5umwzg55brk0') }],
    'symbol': [{ required: true, message: t('offer.index.5umwzg55bx80') }],
    'currency': [{ required: true, message: t('offer.index.5umwzg55c2w0') }],
    'nominal_principal': [{ required: true, message: t('offer.index.5umwzg55c840') }],
    // 'security_type': [{ required: true, message: '请选择市场类型' }],
  }
})
const formRef: any = ref(null)
const submit = async () => {
  const validate = await formRef.value?.validate()
  if (validate) return;
  let { options_product_id, currency, period, market, security_type, symbol, nominal_principal, status, end_time } = form.value.data
  if (longTerm.value == '0' && !end_time) {
    Message.info({ content: t('offer.index.5umwzg55cdc0') })
    return
  }
  let params_list: any = [], arrList: any = []
  if (form.value.data.quote_params.length || form.value.data.framework_params.length) {
    if (form.value.data.quote_params.length && form.value.data.framework_params.length) {
      arrList = [...form.value.data.framework_params, ...form.value.data.quote_params];
    } else {
      arrList = form.value.data.quote_params.length
        ? [...form.value.data.quote_params]
        : [...form.value.data.framework_params];
    }
  }

  params_list = tjjiegou(params_list, arrList, form.value.data)

  let parsm: any
  const formattedEndTime = end_time && typeof end_time === 'number' ? dayjs.unix(end_time).format('YYYY-MM-DD HH:mm:ss') : end_time && typeof end_time === 'string' ? end_time : null;

  parsm = {
    options_product_id,
    currency,
    period: '' + period,
    market,
    security_type,
    symbol,
    nominal_principal,
    status,
    params_list
  };
  if (end_time != '0' && longTerm.value == '0') {
    parsm.end_time = formattedEndTime;
  }
  const { code } = await apiWealth.apiWealthOptionsProductQuoteUpdate({ id: route.params?.productid, data: parsm })
  if (code != 1) return;
  form.value.setup = true
  getData()
}
const tjjiegou = (params_list: any, arrList: any, data: any) => {
  if (data?.params_content?.length) {
    data.params_content.forEach((item: any) => {
      params_list.push({
        params_id: item.params_id,
        content: JSON.parse(item.content)
      })
    })
  } else {
    if (arrList.length) {
      arrList.forEach((item: any) => {
        if (item.params_type == "checkbox") {
          let selected: any = []
          if (item.config.value && item.config.value.length) {
            item.config.value.forEach((item: any) => {
              selected.push({
                key: item
              })
            })
          }
          if (item.config.required) {
            selected.push({ key: item.config.selected })
          }
          params_list.push({
            params_id: item.id,
            content: {
              selected
            }
          })
        } else if (item.params_type == "radio") {
          let selected: any = []
          if (item.config.value) {
            selected.push({ key: item.config.value })
          }          
          if (item.config.required) {
            selected.push({ key: item.config.selected })
          }
          params_list.push({
            params_id: item.id,
            content: {
              selected
            }
          })
        } else {
          let content:any
          if (item.config.value && item.config.required) {
            content = {value: item.config.min || item.config.value || "0"}
          }else{
            content = {value: item.config.value}
          }
          params_list.push({
            params_id: item.id,
            content
          })
        }
      })
    }
  }
  return params_list
}
const selectChange = (value: any) => {
  if (!value) {
    return
  }
  form.value.data = {}
  let list = TypeAllData.value.find((item: any) => item.id == value)
  form.value.data = list
  form.value.data.options_product_id = value
  form.value.data.periodEnum = []
  form.value.data.start_time2 = dayjs.unix(form.value.data.create_time).format('YYYY-MM-DD')
  if (list.period) {
    let riList = list.period.split(',')
    riList.forEach((item: any) => {
      form.value.data.periodEnum.push({
        name: item + t('offer.index.5umwzg55cjo0'),
        value: item
      })
    })
    form.value.data.period = ""
  }
  productData()
}
const productData = async () => {
  const { code, data } = await apiWealth.wealthOptionsProductInfo({
    id: form.value.data.id
  })
  if (code != 1) return;
  form.value.data.framework_params = data.framework_params
  form.value.data.quote_params = data.quote_params
  form.value.data.nominal_principal_step = data.nominal_principal_step
  form.value.data.nominal_principal_min = data.nominal_principal_min
  form.value.data.security_type = '1'
}
const getData = async () => {
  loading.value = true
  const { code, data } = await apiWealth.apiWealthOptionsProductQuoteInfo({
    id: route.params?.productid
  })
  loading.value = false
  if (code != 1) return;
  form.value.data = { ...form.value.data, ...data }
  if (form.value.data.options_product_info) {
    let riList = form.value.data.options_product_info.period.split(',')
    riList.forEach((item: any) => {
      form.value.data.periodEnum.push({
        name: item + t('offer.index.5umwzg55cjo0'),
        value: Number(item)
      })
    })
  }
  if (form.value.data.end_time && typeof form.value.data.end_time == 'number') {
    form.value.data.end_time = dayjs.unix(form.value.data.end_time).format('YYYY-MM-DD HH:mm:ss')
  }
  if (form.value.data.end_time == 0 && form.value.data.start_time == 0) {
    longTerm.value = 1
  }
}
const ProductAllData = async () => {
  const { code, data } = await apiWealth.apiWealthOptionsProductAll({
    ...useFilter(allData.value)
  })
  if (code != 1) return;
  TypeAllData.value = data.list
}
{
  getData()
  ProductAllData()
}
</script>
  
<style lang="less" scoped></style>
  