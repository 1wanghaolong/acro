<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
      <div class="steps">
        <a-steps :current="step">
          <a-step>{{$t('create.create.5um8eulh5a00')}}</a-step>
          <a-step>{{$t('create.create.5um8eulhg7c0')}}</a-step>
          <a-step>{{$t('create.create.5um8eulhgh00')}}</a-step>
        </a-steps>
      </div>
      <div v-if="step === 1">
        <a-form layout="vertical" ref="formRef" :model="formData" :style="{ maxWidth: '600px', margin: 'auto' }"
          :wrapper-col-props="{ span: 18 }">
          <a-form-item field="asset_account" :label="$t('create.create.5um8eulhgn80')" :rules="[{ required: true, message: $t('create.create.5um8eulhgrw0') }]">
            <a-select v-model:model-value="formData.asset_account" allow-search :placeholder="$t('create.create.5um8eulhgww0')"
              :options="accountList" :field-names="{ value: 'account', label: 'account' }" @search="getAccountList"
              :filter-option="true" :show-extra-options="false" />
          </a-form-item>
          <a-form-item field="market" :label="$t('create.create.5um8eulhh340')" :rules="[{ required: true, message: $t('create.create.5um8eulhgrw0') }]">
            <!-- <a-select style="width:150px" v-model="formData.market" placeholder="请选择">
              <a-option v-for="item of marketEnum" :value="item.value" :label="item.name" />
            </a-select> -->
            <a-select style="width:150px" allow-clear v-model="formData.market" :placeholder="$t('create.create.5um8eulhhb00')">
              <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
            <a-input v-model="formData.symbol" :placeholder="$t('create.create.5um8eulhhjw0')">
            </a-input>
          </a-form-item>
          <a-form-item field="options_product_id" :label="$t('create.create.5um8eulhho40')" :rules="[{ required: true, message: $t('create.create.5um8eulhgrw0') }]">
            <a-select v-model="formData.options_product_id" :placeholder="$t('create.create.5um8eulhhb00')">
              <a-option @click="changeOptions(item)" v-for="item of productTypeEnum" :value="item?.id"
                :label="item?.product_name" />
            </a-select>
          </a-form-item>

          <a-form-item field="nominal_principal" :label="$t('create.create.5um8eulhhsc0')" :rules="[{ required: true, message: $t('create.create.5um8eulhgrw0') }
            , { validator: validator }]" :validate-trigger="['change', 'input']">
            <a-input-number hide-button v-model="formData.nominal_principal" :placeholder="$t('create.create.5um8eulhhjw0')">
              <template #append>
                <span>
                  {{ $t('create.create.5um8eulhhwk0') }}
                </span>
              </template>
            </a-input-number>
          </a-form-item>
          <a-form-item field="currency" :label="$t('create.create.5um8eulhi0g0')" :rules="[{ required: true, message: $t('create.create.5um8eulhgrw0') }]">
            <a-select v-model="formData.currency" :placeholder="$t('create.create.5um8eulhhb00')">
              <a-option v-for="item of currencyEnum" :value="item.value" :label="item.trans[local.lang]" />
            </a-select>
          </a-form-item>
          <a-form-item field="period" :label="$t('create.create.5um8eulhi4s0')" :rules="[{ required: true, message: $t('create.create.5um8eulhgrw0') }]">
            <a-select v-model="formData.period" :placeholder="$t('create.create.5um8eulhhb00')">
              <a-option v-for="item of periodEnum" :value="item.value" :label="item.name" />
            </a-select>
          </a-form-item>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="resetField">
                  {{ $t('create.create.5um8eulhi9c0') }}
                </a-button>
                <a-button type="primary" @click="onNextClick">
                  {{$t('create.create.5um8eulhif80')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div v-else-if="step === 2">
        <a-form layout="vertical" ref="formRef" :model="structureParameters"
          :style="{ maxWidth: '600px', margin: 'auto' }">
          <a-form-item :label="$t('create.create.5um8eulhho40')">
            {{ productInfo?.product_name }}
          </a-form-item>
          <template v-for="item in WealthOptionsProductInfo?.framework_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhb00')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhb00')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhb00')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }] : []">
              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhb00')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhjw0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('create.create.5um8eulhijw0') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhjw0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('create.create.5um8eulhgrw0') }, { match: /^-?\d+(\.\d+)?$/, message: $t('create.create.5um8eulhijw0') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('create.create.5um8eulhhjw0')">
              </a-input-number>
            </a-form-item>
          </template>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="step = 1">
                  {{$t('create.create.5um8eulhiq00')}}
                </a-button>
                <a-button type="primary" @click="onNextClicks">
                  {{$t('create.create.5um8eulhiu00')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>

        </a-form>
      </div>
      <div v-else-if="step === 3" style="height: 100%;display: flex;align-items: center;">
        <a-spin style="width: 100%">
          <div class="success-wrap">
            <a-result status="success" :title="$t('create.create.5um8eulhiyk0')" :subtitle="$t('create.create.5um8eulhj3k0')">
              <template #subtitle>
                <a-button style="margin-top:10px" type="primary" @click="router.back()">
                  {{ $t('create.create.5um8eulhj7g0') }}
                </a-button>
              </template>
            </a-result>
            <a-divider />
            <a-space :size="16" style="display: flex;justify-content: center;">
              <a-button key="view" @click="router.replace({ name: 'wealthTradeInquiryDetail', params: { id: id } })"
                type="primary">
                {{ $t('create.create.5um8eulhjbk0') }}
              </a-button>
              <a-button key="again" @click="resetField(1)" type="secondary">
                {{ $t('create.create.5um8eulhjf40') }}
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
import { useI18n } from "vue-i18n";
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
  period: '',
  nominal_principal: 0,
  market: '',
  symbol: '',
});
const currencyEnum = ref(useEnums('currency'))

const productTypeEnum: any = ref([
  { value: '2', name: t('create.create.5um8eulhjio0') },
  { value: '1', name: t('create.create.5um8eulhjm40') },
])
const periodEnum = ref([
  { value: '1', name: '1个月' },
  { value: '2', name: '2个月' },
  { value: '3', name: '3个月' },
  { value: '4', name: '4个月' },
  { value: '5', name: '5个月' },
  { value: '6', name: '6个月' },
  { value: '12', name: '12个月' },
])
const productInfo = ref()
const changeOptions = (val: any) => {
  currencyEnum.value = []
  let currency = useEnums('currency')
  productInfo.value = val
  getWealthOptionsProductInfo(val.id)
  formData.value.nominal_principal = 0
  formData.value.currency = ''
  formData.value.period = ''
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
      message = t('create.create.5um8eulhjr40')
    } else if ((principal * 10000) < Number(min)) {
      message = t('create.create.5um8eulhjuo0') + (Number(min) / 10000) + t('create.create.5um8eulhjy40') + t('create.create.5um8eulhk1c0') + (Number(principal_setp) / 10000) + t('create.create.5um8eulhk4w0')
    } else if ((principal * 10000) > Number(min)) {
      let pattern = /\./
      let num = ((principal * 10000) - Number(min)) / Number(principal_setp)
      if (pattern.test(num + '')) {
        message = t('create.create.5um8eulhk1c0') + (Number(principal_setp) / 10000) + t('create.create.5um8eulhk4w0')
      } else {
        message = ''
      }
    } else {
      message = ''
    }
    if (!formData.value.symbol) {
      formRef.value.setFields({
        market: {
          status: 'error',
          message: t('create.create.5um8eulhk8g0')
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
  // step.value = 2
};
const id = ref('')
const onNextClicks = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    let bool = false
    WealthOptionsProductInfo.value.framework_params.forEach((item: any) => {
      if (structureParameters.value[item.key] || item.config.required || structureParameters.value[item.key] == 0) {
        if (item.params_type == 'number') {
          if (structureParameters.value[item.key] > item.config.max) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('create.create.5um8eulhkc00') + item.config.max
            }
            formRef.value.setFields(key)

          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('create.create.5um8eulhkfg0') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (!Number.isInteger(structureParameters.value[item.key])) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('create.create.5um8eulhl5s0')
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
              message: t('create.create.5um8eulhkc00') + item.config.max
            }
            formRef.value.setFields(key)
          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('create.create.5um8eulhkfg0') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (num > item.config.precision) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('create.create.5um8eulhl9g0') + item.config.precision + t('create.create.5um8eulhlck0')
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
      nominal_principal: Number(formData.value.nominal_principal * 10000),
      symbol: formData.value.symbol,
      currency: formData.value.currency,
      period: Number(formData.value.period),
      security_type: '1',
      params_list: []
    }

    WealthOptionsProductInfo.value.framework_params.forEach((item: any) => {
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
    const { code, data } = await apiWealth.apiWealthInquiryCreate({
      data: param
    })
    if (code != 1) return;
    id.value = data.inquiry
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
  let arrPeriod = res.data?.period?.split(',')
  if (res.data.period && arrPeriod?.length) {
    periodEnum.value = []
    arrPeriod.forEach((item: any) => {
      periodEnum.value.push({ value: item, name: item + t('create.create.5um8eulhlg80') })
    })
  }
  let index = periodEnum.value.findIndex((item: any) => item.value == formData.value.period)
  if (index == -1) {
    formData.value.period = ''
  }
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
    cb(t('create.create.5um8eulhjr40'))
  } else if ((principal * 10000) < Number(min)) {
    cb(t('create.create.5um8eulhjuo0') + (Number(min) / 10000) + t('create.create.5um8eulhjy40') + t('create.create.5um8eulhk1c0') + (Number(principal_setp) / 10000) + t('create.create.5um8eulhk4w0'))
  } else if ((principal * 10000) > Number(min)) {
    let pattern = /\./
    let num = ((principal * 10000) - Number(min)) / Number(principal_setp)
    if (pattern.test(num + '')) {
      cb(t('create.create.5um8eulhk1c0') + (Number(principal_setp) / 10000) + t('create.create.5um8eulhk4w0'))
    } else {
      return true
    }
  } else {
    return true
  }
}
const resetField = (num?: any) => {
  if (num == 1) {
    let data: any = ref({
      asset_account: route?.query.account || '',
      options_product_id: '',
      currency: '',
      period: '',
      nominal_principal: 0,
      market: '',
      symbol: '',
    });
    Object.keys(data.value).forEach((item: any) => {
      formData.value[item] = ''
    })
    step.value = 1
  } else {
    formData.value = {
      asset_account: route?.query.account || '',
      options_product_id: '',
      currency: '',
      period: '',
      nominal_principal: 0,
      market: '',
      symbol: '',
    }
    formRef.value.resetFields()
  }
  getWealthOptionsProductAll()


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
    