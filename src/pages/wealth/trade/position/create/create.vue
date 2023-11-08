<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
      <div class="steps">
        <a-steps :current="step">
          <a-step>{{$t('position.create.5umcnh94ll40')}}</a-step>
          <a-step>{{$t('position.create.5umcnh94n1o0')}}</a-step>
          <a-step>{{$t('position.create.5umcnh94na40')}}</a-step>
        </a-steps>
      </div>
      <div v-if="step === 1">
        <a-form layout="vertical" ref="formRef" :model="formData" :style="{ maxWidth: '600px', margin: 'auto' }"
          :wrapper-col-props="{ span: 18 }">
          <a-form-item field="asset_account" :label="$t('position.create.5umcnh94nfc0')" :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }]">
            <a-select v-model:model-value="formData.asset_account" allow-search :placeholder="$t('position.create.5umcnh94nuk0')"
              :options="accountList" :field-names="{ value: 'account', label: 'account' }" @search="getAccountList"
              :filter-option="true" :show-extra-options="false" />
          </a-form-item>
          <a-form-item field="market" :label="$t('position.create.5umcnh94o2w0')" :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }]">
            <!-- <a-select style="width:150px" v-model="formData.market" placeholder="请选择">
              <a-option v-for="item of marketEnum" :value="item.value" :label="item.name" />
            </a-select> -->
            <a-select style="width:150px" allow-clear v-model="formData.market" :placeholder="$t('position.create.5umcnh94o6k0')">
              <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
            <a-input v-model="formData.symbol" :placeholder="$t('position.create.5umcnh94o9c0')">
            </a-input>
            <!-- <a-select v-model:model-value="formData.symbol" allow-search placeholder="输入关键词搜索"
              :options="stockList" :field-names="{ value: 'account', label: 'account' }" @search="getStockList"
              :filter-option="true" :show-extra-options="false" /> -->
          </a-form-item>
          <a-form-item field="options_product_id" :label="$t('position.create.5umcnh94oc40')" :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }]">
            <a-select v-model="formData.options_product_id" :placeholder="$t('position.create.5umcnh94o6k0')">
              <a-option @click="changeOptions(item)" v-for="item of productTypeEnum" :value="item?.id"
                :label="item?.product_name" />
            </a-select>
          </a-form-item>
          <a-form-item field="opening_price" :label="$t('position.create.5umcnh94ofg0')"
            :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }, { validator: validators }]"
            :validate-trigger="['change', 'input']">
            <a-input-number hide-button v-model="formData.opening_price" :placeholder="$t('position.create.5umcnh94o9c0')"></a-input-number>
          </a-form-item>

          <a-form-item field="nominal_principal" :label="$t('position.create.5umcnh94olo0')" :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }
            , { validator: validator }]" :validate-trigger="['change', 'input']">
            <a-input-number hide-button v-model="formData.nominal_principal" :placeholder="$t('position.create.5umcnh94o9c0')">
              <template #append>
                <span>
                  {{ $t('position.create.5umcnh94os80') }}
                </span>
              </template>
            </a-input-number>
          </a-form-item>
          <a-form-item field="currency" :label="$t('position.create.5umcnh94oy40')" :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }]">
            <a-select v-model="formData.currency" :placeholder="$t('position.create.5umcnh94o6k0')">
              <a-option v-for="item of currencyEnum" :value="item.value" :label="item.trans[local.lang]" />
            </a-select>
          </a-form-item>
          <a-form-item field="start_time" :label="$t('position.create.5umcnh94pdw0')" :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }]"
            :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="formData.start_time" :placeholder="$t('position.create.5umcnh94plc0')" />
          </a-form-item>
          <a-form-item field="end_time" :label="$t('position.create.5umcnh94px00')"
            :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }, { validator: validatorTime }]"
            :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="formData.end_time" :placeholder="$t('position.create.5umcnh94plc0')" />
          </a-form-item>
          <a-form-item field="cost_price" :label="$t('position.create.5umcnh94q500')"
            :rules="[{ required: true, message: $t('position.create.5umcnh94nns0') }, { validator: validators }]"
            :validate-trigger="['change', 'input']">
            <a-input-number hide-button v-model="formData.cost_price" :placeholder="$t('position.create.5umcnh94o9c0')"></a-input-number>
          </a-form-item>
          <a-form-item field="order_no" :label="$t('position.create.5umcnh94qb00')">
            <a-input hide-button v-model="formData.order_no" :placeholder="$t('position.create.5umcnh94o9c0')"></a-input>
          </a-form-item>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="resetField">
                  {{ $t('position.create.5umcnh94qdw0') }}
                </a-button>
                <a-button type="primary" @click="onNextClick">
                  {{$t('position.create.5umcnh94qhw0')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div v-else-if="step === 2">
        <a-form layout="vertical" ref="formRef" :model="structureParameters"
          :style="{ maxWidth: '600px', margin: 'auto' }">
          <a-form-item :label="$t('position.create.5umcnh94oc40')">
            {{ productInfo?.product_name }}
          </a-form-item>
          <h4 style="margin-bottom: 15px;">{{$t('position.create.5umcnh94qk80')}}</h4>
          <template v-for="item in WealthOptionsProductInfo?.framework_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">
              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o9c0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('position.create.5umcnh94qn40') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o9c0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('position.create.5umcnh94qn40') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o9c0')">
              </a-input-number>
            </a-form-item>
          </template>
          <a-divider />
          <h4 style="margin-bottom: 15px;">{{$t('position.create.5umcnh94qp80')}}</h4>
          <template v-for="item in WealthOptionsProductInfo?.quote_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []">
              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o6k0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o9c0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('position.create.5umcnh94qn40') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o9c0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('position.create.5umcnh94nns0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('position.create.5umcnh94qn40') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('position.create.5umcnh94o9c0')">
              </a-input-number>
            </a-form-item>
          </template>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="step = 1">
                  {{$t('position.create.5umcnh94qrg0')}}
                </a-button>
                <a-button type="primary" @click="onNextClicks">
                  {{$t('position.create.5umcnh94qts0')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>

        </a-form>
      </div>
      <div v-else-if="step === 3" style="height: 100%;display: flex;align-items: center;">
        <a-spin style="width: 100%">
          <div class="success-wrap">
            <a-result status="success" :title="$t('position.create.5umcnh94qw80')" :subtitle="$t('position.create.5umcnh94qyo0')">
              <template #subtitle>
                <a-button style="margin-top:10px" type="primary" @click="router.back()">
                  {{ $t('position.create.5umcnh94r0w0') }}
                </a-button>
              </template>
            </a-result>
            <a-divider />
            <a-space :size="16" style="display: flex;justify-content: center;">
              <a-button key="view" @click="router.replace({ name: 'wealthTradePositionDetail', params: { id: id } })"
                type="primary">
                {{ $t('position.create.5umcnh94r2w0') }}
              </a-button>
              <a-button key="again" @click="resetField(1)" type="secondary">
                {{ $t('position.create.5umcnh94r500') }}
              </a-button>
            </a-space>
          </div>
        </a-spin>

      </div>
    </a-card>
  </div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue';
import { useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
const { t } = useI18n();
const route = useRoute()
const router = useRouter()
const local = useLocal()
const step = ref(1);
const formRef = ref();
const formData: any = ref({
  asset_account: route?.query.account || '',
  options_product_id: '',
  currency: '',
  nominal_principal: 0,
  market: '',
  symbol: '',
  end_time: '',
  start_time: '',
  opening_price: 0,
  cost_price: 0,
  order_no: ''
});
const currencyEnum = ref(useEnums('currency'))

const productTypeEnum: any = ref([
  { value: '2', name: t('position.create.5umcnh94r700') },
  { value: '1', name: t('position.create.5umcnh94r9o0') },
])
const productInfo = ref()
const changeOptions = (val: any) => {
  currencyEnum.value = []
  let currency = useEnums('currency')
  productInfo.value = val
  getWealthOptionsProductInfo(val.id)
  formData.value.nominal_principal = 0
  formData.value.currency = ''
  formRef.value.clearValidate()
  let index = val.currency_list.findIndex((item: any) => item.currency == formData.value.currency)
  if (index == -1) {
    formData.value.currency = ''
  }
  val.currency_list.forEach((item: any) => {
    currency.forEach((items: any) => {
      if (item.currency == items.value) {
        currencyEnum.value.push({ value: items.value, trans: items.trans })
      }
    })
  })
}

const accountList = ref([])
const getAccountList = async (value: string) => {
  const { code, data } = await apiOtc.accountList(useFilter({
    account: value,
    status: 1
  }))
  if (code != 1) return;
  accountList.value = data.list
}
// const stockList = ref([])
// const getStockList = async (value: any) => {
//   let obj = {
//     market: '',
//     symbol: '',
//     name: '',
//   }
//   obj.market = formData.value.market
//   if(!isNaN(value)){
//     obj.symbol = value
//     obj.name = ''
//   }else{
//     obj.name = value
//     obj.symbol = ''
//   }
//   const { code, data } = await apiOtc.accountList({...useFilter(obj)})
//   if (code != 1) return;
//   stockList.value = data.list

// }
const getWealthOptionsProductAll = async () => {
  productTypeEnum.value = []
  const res: any = await apiWealth.apiWealthOptionsProductAll({});
  if (res.code != 1) return Message.error(res.msg)
  if (res.data.list?.length == 0) return
  productTypeEnum.value = [...res.data.list]
  getWealthOptionsProductInfo(res.data.list[0].id)
  productInfo.value = res.data.list[0]
  formData.value.options_product_id = res.data.list[0].id
}
getWealthOptionsProductAll()
const onNextClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    let message = ''
    let min = WealthOptionsProductInfo.value.nominal_principal_min
    let principal_setp = WealthOptionsProductInfo.value.nominal_principal_step
    let principal = Number(formData.value.nominal_principal)
    if (principal < 0) {
      message = t('position.create.5umcnh94rbs0')
    } else if ((principal * 1) < Number(min)) {
      message = t('position.create.5umcnh94re80') + min + ',' + t('position.create.5umcnh94rg40') + principal_setp + t('position.create.5umcnh94riw0')
    } else if ((principal * 1) > Number(min)) {
      let pattern = /\./
      let num = ((principal * 1) - Number(min)) / Number(principal_setp)
      if (pattern.test(num + '')) {
        message = t('position.create.5umcnh94rg40') + principal_setp + t('position.create.5umcnh94riw0')
      } else {
        message = ''
      }
    } else {
      message = ''
    }
    if (formData.value.end_time <= dayjs(new Date()).format('YYYY-MM-DD')) {
      formRef.value.setFields({
        end_time: {
          status: 'error',
          message: t('position.create.5umcnh94rkw0')
        }
      })
      return false
    } else if (formData.value.start_time > formData.value.end_time) {
      formRef.value.setFields({
        end_time: {
          status: 'error',
          message: t('position.create.5umcnh94rn40')
        }
      })
      return false
    }
    if (!formData.value.symbol) {
      formRef.value.setFields({
        market: {
          status: 'error',
          message: t('position.create.5umcnh94rp40')
        }
      })
      return false
    }
    if (message) {
      formRef.value.setFields({
        nominal_principal: {
          status: 'error',
          message: message
        }
      })
    } else {
      step.value = 2
    }
  }
};
const id = ref('')
const onNextClicks = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    let bool = false
    let arr = [...WealthOptionsProductInfo.value.framework_params, ...WealthOptionsProductInfo.value.quote_params]
    arr.forEach((item: any) => {
      if (structureParameters.value[item.key] || item.config.required || structureParameters.value[item.key] == 0) {
        if (item.params_type == 'number') {
          if (structureParameters.value[item.key] > item.config.max) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('position.create.5umcnh94rr00') + item.config.max
            }
            formRef.value.setFields(key)

          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('position.create.5umcnh94rt00') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (!Number.isInteger(structureParameters.value[item.key])) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('position.create.5umcnh94ruw0')
            }
            formRef.value.setFields(key)
          }
        } else if (item.params_type == 'float' || item.params_type == 'percent') {
          let num = (structureParameters.value[item.key].toString().split('.')[1] || '').length
          if (structureParameters.value[item.key] > item.config.max) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('position.create.5umcnh94rr00') + item.config.max
            }
            formRef.value.setFields(key)
          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('position.create.5umcnh94rt00') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (num > item.config.precision) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('position.create.5umcnh94rxk0') + item.config.precision + t('position.create.5umcnh94s040')
            }
            formRef.value.setFields(key)
          }
        }
      }
    })
    if (bool) return
    let param: any = {
      asset_account: formData.value.asset_account,
      options_product_id: Number(formData.value.options_product_id),
      market: formData.value.market,
      nominal_principal: Number(formData.value.nominal_principal * 1),
      symbol: formData.value.symbol,
      currency: formData.value.currency,
      security_type: '1',
      end_time: formData.value.end_time,
      start_time: formData.value.start_time,
      opening_price: formData.value.opening_price,
      cost_price: formData.value.cost_price,
      order_no: formData.value.order_no,
      params_list: []
    }

    arr.forEach((item: any) => {
      if (structureParameters.value[item.key]) {
        if (item.params_type == 'checkbox') {
          let arr: any = []
          structureParameters.value[item.key].forEach((items: any) => {
            arr.push({ key: items })
          })
          param.params_list.push({
            params_id: item.id,
            content: {
              selected: arr
            }
          })
        } else if (item.params_type == 'radio') {
          param.params_list.push({
            params_id: item.id,
            content: {
              selected: [{ key: structureParameters.value[item.key] }]
            }
          })
        } else if (item.params_type == 'gear_percent') {
          param.params_list.push({
            params_id: item.id,
            content: {
              value: Number(structureParameters.value[item.key].replace('%', ''))
            }
          })
        } else {
          param.params_list.push({
            params_id: item.id,
            content: {
              value: Number(structureParameters.value[item.key])
            }
          })
        }
      }
    })
    const { code, data } = await apiWealth.apiWealthPositionCreate({
      data: param
    })
    if (code != 1) return;
    id.value = data.id
    step.value = 3
  }
  // step.value = 3
}
const WealthOptionsProductInfo = ref()
const structureParameters: any = ref({})
const getWealthOptionsProductInfo = async (id: any) => {
  const res: any = await apiWealth.apiWealthOptionsProductInfo({ id: id });
  if (res.code != 1) return Message.error(res.msg)
  // res.data.framework_params[1].params_type = 'number'
  // res.data.framework_params[0].config.value = 10
  conditionData(res.data)
  WealthOptionsProductInfo.value = res.data

}

const conditionData = (val: any) => {
  WealthOptionsProductInfo.value = val
  if (WealthOptionsProductInfo.value.framework_params && WealthOptionsProductInfo.value.framework_params?.length) {
    WealthOptionsProductInfo.value.framework_params.forEach((item: any) => {
      if (item.params_type == 'radio') {
        structureParameters.value[item.key] = item.config.selected
      } else if (item.params_type == 'checkbox') {
        if (item.config.selected) {
          structureParameters.value[item.key] = item.config.selected.split(',')
        } else {
          structureParameters.value[item.key] = []
        }
      } else if (item.params_type == 'gear_percent') {
        if (item.config.value) {
          structureParameters.value[val.key] = item.config.value + '%'
        } else {
          structureParameters.value[val.key] = ''
        }
      } else {
        if (Number(item.config.value)) {
          structureParameters.value[item.key] = Number(item.config.value)
        } else {
          structureParameters.value[val.key] = ''
        }

      }
    });
  }
  if (WealthOptionsProductInfo.value.quote_params && WealthOptionsProductInfo.value.quote_params?.length) {
    WealthOptionsProductInfo.value.quote_params.forEach((item: any) => {
      if (item.params_type == 'radio') {
        structureParameters.value[item.key] = item.config.selected
      } else if (item.params_type == 'checkbox') {
        if (item.config.selected) {
          structureParameters.value[item.key] = item.config.selected.split(',')
        } else {
          structureParameters.value[item.key] = []
        }
      } else if (item.params_type == 'gear_percent') {
        if (item.config.value) {
          structureParameters.value[val.key] = item.config.value + '%'
        } else {
          structureParameters.value[val.key] = ''
        }
      } else {
        if (Number(item.config.value)) {
          structureParameters.value[item.key] = Number(item.config.value)
        } else {
          structureParameters.value[val.key] = ''
        }

      }
    });
  }
  // optionsProductInfo.value.params[0].config.step = 5
  // optionsProductInfo.value.params[1].paramsType = 'gear_number'
}
// 档位选择
const structureGearVariable = ref([])
const structureKey = ref()
const indexStructureGear = ref()
const structureGear = (val: any) => {
  const min = Number(val.config.min);
  const max = Number(val.config.max);
  const step = Number(val.config.step);
  const array: any = [];
  for (let i = min; i <= max; i += step) {
    if (val.params_type == 'gear_percent') {
      array.push(i + '%');
    } else {
      array.push(i);
    }
  }
  structureKey.value = val.key
  structureGearVariable.value = array
  let index = array.findIndex((item: any) => item == structureParameters.value[val.key])
  if (index == -1) {
    indexStructureGear.value = 0
  } else {
    indexStructureGear.value = index
  }

}
const validator = (value: any, cb: any) => {
  let min = WealthOptionsProductInfo.value.nominal_principal_min
  let principal_setp = WealthOptionsProductInfo.value.nominal_principal_step
  let principal = Number(value)
  if (principal < 0) {
    cb(t('position.create.5umcnh94rbs0'))
  } else if ((principal * 1) < Number(min)) {
    cb(t('position.create.5umcnh94re80') + min + ',' + t('position.create.5umcnh94rg40') + principal_setp + t('position.create.5umcnh94riw0'))
  } else if ((principal * 1) > Number(min)) {
    let pattern = /\./
    let num = ((principal * 1) - Number(min)) / Number(principal_setp)
    if (pattern.test(num + '')) {
      cb(t('position.create.5umcnh94rg40') + principal_setp + t('position.create.5umcnh94riw0'))
    } else {
      return true
    }
  } else {
    return true
  }
}
const validators = (value: any, cb: any) => {
  if (value && value > 0) {
    return true
  } else {
    cb(t('position.create.5umcnh94s2g0'))
  }
}
const resetField = (num?: any) => {
  if (num == 1) {
    let data: any = ref({
      asset_account: route?.query.account || '',
      options_product_id: '',
      currency: '',
      nominal_principal: 0,
      market: '',
      symbol: '',
      end_time: '',
      start_time: '',
      opening_price: 0,
      cost_price: 0,
      order_no: ''
    });
    Object.keys(data.value).forEach((item: any) => {
      formData.value[item] = data.value[item]
    })
    step.value = 1

  } else {
    formData.value = {
      asset_account: route?.query.account || '',
      options_product_id: '',
      currency: '',
      nominal_principal: 0,
      market: '',
      symbol: '',
      end_time: '',
      start_time: '',
      opening_price: 0,
      cost_price: 0,
      order_no: ''
    }
    formRef.value.resetFields()
  }
  getWealthOptionsProductAll()
}
const validatorTime = (value: any, cb: any) => {
  if (formData.value.start_time > value) {
    cb(t('position.create.5umcnh94rn40'))
  } else if (value <= dayjs(new Date()).format('YYYY-MM-DD')) {
    cb(t('position.create.5umcnh94rkw0'))
  } else {
    return true
  }
}

</script>
    
<style lang="less" scoped>
.container {
  padding: 0 20px 20px 20px;

  :deep(.arco-card-body) {
    padding: 20px;
    text-align: center;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0;
  background-color: var(--color-bg-2);

  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

.steps {
  margin-bottom: 26px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;
  background-color: var(--color-bg-2);
}

.steps {
  margin-bottom: 36px;
}

.form {
  width: 500px;
  margin: 0 auto;
}

.steps {
  width: 800px;
  margin: 20px auto 20px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
    