<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
      <div class="steps">
        <a-steps :current="step">
          <a-step>{{$t('order.create.5umc7m1v4hc0')}}</a-step>
          <a-step>{{$t('order.create.5umc7m1v5ic0')}}</a-step>
          <a-step>{{$t('order.create.5umc7m1v5oo0')}}</a-step>
          <a-step>{{$t('order.create.5umc7m1v5ug0')}}</a-step>
        </a-steps>
      </div>
      <div v-if="step === 1">
        <a-form layout="vertical" ref="formRef" :model="formData" :style="{ maxWidth: '600px', margin: 'auto' }"
          :wrapper-col-props="{ span: 18 }">
          <a-form-item field="asset_account" :label="$t('order.create.5umc7m1v5xk0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]">
            <a-select v-model:model-value="formData.asset_account" allow-search :placeholder="$t('order.create.5umc7m1v62g0')"
              :options="accountList" :field-names="{ value: 'account', label: 'account' }" @search="getAccountList"
              :filter-option="true" :show-extra-options="false" />
          </a-form-item>
          <a-form-item field="market" :label="$t('order.create.5umc7m1v64w0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]">

            <a-select style="width:150px" allow-clear v-model="formData.market" :placeholder="$t('order.create.5umc7m1v68s0')">
              <a-option v-for="item in useEnums('market.market')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
            <a-input v-model="formData.symbol" :placeholder="$t('order.create.5umc7m1v6dg0')">
            </a-input>
            <!-- <a-select v-model:model-value="formData.symbol" allow-search placeholder="输入关键词搜索"
                         @search="getSymbolList">
                    <a-option v-for="item in (symbolList as any)"
                        :value="item.symbol">
                        {{ item.title }}
                    </a-option>
                </a-select> -->
          </a-form-item>
          <a-form-item field="options_product_id" :label="$t('order.create.5umc7m1v6ic0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]">
            <a-select v-model="formData.options_product_id" :placeholder="$t('order.create.5umc7m1v68s0')">
              <a-option @click="changeOptions(item)" v-for="item of productTypeEnum" :value="item?.id"
                :label="item?.product_name" />
            </a-select>
          </a-form-item>
          <a-form-item field="nominal_principal" :label="$t('order.create.5umc7m1v6po0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }
            , { validator: validator }]" :validate-trigger="['change', 'input']">
            <a-input-number hide-button v-model="formData.nominal_principal" :placeholder="$t('order.create.5umc7m1v6dg0')">
              <template #append>
                <span>
                  {{ $t('order.create.5umc7m1v70s0') }}
                </span>
              </template>
            </a-input-number>
          </a-form-item>
          <a-form-item field="currency" :label="$t('order.create.5umc7m1v75c0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]">
            <a-select v-model="formData.currency" :placeholder="$t('order.create.5umc7m1v68s0')">
              <a-option v-for="item of currencyEnum" :value="item.value" :label="item.trans[local.lang]" />
            </a-select>
          </a-form-item>
          <a-form-item field="start_time" :label="$t('order.create.5umc7m1v78s0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]"
            :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="formData.start_time" :placeholder="$t('order.create.5umc7m1v7bk0')" />
          </a-form-item>
          <a-form-item field="end_time" :label="$t('order.create.5umc7m1v7eg0')"
            :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }, { validator: validatorTime }]"
            :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="formData.end_time" :placeholder="$t('order.create.5umc7m1v7bk0')" />
          </a-form-item>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="resetField">
                  {{ $t('order.create.5umc7m1v7io0') }}
                </a-button>
                <a-button type="primary" @click="onNextClick">
                  {{$t('order.create.5umc7m1v7mk0')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div v-else-if="step === 2">
        <a-form layout="vertical" ref="formRef" :model="structureParameters"
          :style="{ maxWidth: '600px', margin: 'auto' }">
          <a-form-item :label="$t('order.create.5umc7m1v6ic0')">
            {{ productInfo?.product_name }}
          </a-form-item>
          <h4 style="margin-bottom: 15px;">{{$t('order.create.5umc7m1v7r40')}}</h4>
          <template v-for="item in WealthOptionsProductInfo?.framework_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">
              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v6dg0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.create.5umc7m1v7wk0') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v6dg0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.create.5umc7m1v7wk0') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v6dg0')">
              </a-input-number>
            </a-form-item>
          </template>
          <a-divider />
          <h4 style="margin-bottom: 15px;">{{$t('order.create.5umc7m1v80c0')}}</h4>
          <template v-for="item in WealthOptionsProductInfo?.quote_params">
            <a-form-item v-if="item.params_type == 'checkbox'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">
              <a-select :limit="item.config.max" multiple @click="structureGear(item)"
                v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'radio'" :field="item?.key" :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">

              <a-select v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of item.config.options" :value="items.key" :label="items.text[local.lang]" />
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_number'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">

              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'gear_percent'" :field="item?.key"
              :label="item.params_name[local.lang]"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []">
              <a-select @click="structureGear(item)" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v68s0')">
                <a-option v-for="items of structureGearVariable">{{ items }}</a-option>
              </a-select>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'percent'" :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v6dg0')">
                <template #append>%</template>
              </a-input-number>
            </a-form-item>
            <a-form-item v-else-if="item.params_type == 'float'"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.create.5umc7m1v7wk0') }] : []"
              :field="item?.key" :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v6dg0')">
              </a-input-number>
            </a-form-item>
            <a-form-item v-else :field="item?.key"
              :rules="item.config.required ? [{ required: true, message: $t('order.create.5umc7m1v6080') }, { match: /^-?\d+(\.\d+)?$/, message: $t('order.create.5umc7m1v7wk0') }] : []"
              :label="item.params_name[local.lang]">
              <a-input-number hide-button style="width: 100%;" v-model="structureParameters[item.key]" :placeholder="$t('order.create.5umc7m1v6dg0')">
              </a-input-number>
            </a-form-item>
          </template>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="step = 1">
                  {{$t('order.create.5umc7m1v8700')}}
                </a-button>
                <a-button type="primary" @click="nextStep2">
                  {{$t('order.create.5umc7m1v7mk0')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>

        </a-form>
      </div>
      <div v-else-if="step === 3">
        <a-form layout="vertical" ref="formRef" :model="formData" :style="{ maxWidth: '600px', margin: 'auto' }"
          :wrapper-col-props="{ span: 18 }">
          <a-form-item field="status" :label="$t('order.create.5umc7m1v5oo0')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]"
            :validate-trigger="['change', 'input']">
            <a-select v-model="formData.status" :placeholder="$t('order.create.5umc7m1v68s0')">
              <a-option v-for="item in useEnums('wealth.transaction.transactionRecords.status3')" :value="item.value">{{
                item.trans[local.lang] }}</a-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('order.create.5umc7m1v89w0')" v-if="formData.status == '2' || formData.status == '3'">
            <a-switch :checked-value="1" :unchecked-value="0" v-model="formData.create_position" /><span
              style="margin-left:10px">{{
                formData.create_position == 0 ? $t('order.create.5umc7m1v8jw0') : $t('order.create.5umc7m1v8lw0') }}</span>
          </a-form-item>
          <a-form-item v-if="formData.status == '2' || formData.status == '3'" field="deal_nominal_principal"
            :label="$t('order.create.5umc7m1v8no0')"
            :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }, { match: /^\d+(\.\d+)?$/, message: $t('order.create.5umc7m1v8pg0') }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input-number hide-button style="width: 100%;" v-model="formData.deal_nominal_principal"
                :placeholder="$t('order.create.5umc7m1v6dg0')">
                <template #append>{{ formData?.currency }}</template>
              </a-input-number>
            </div>
          </a-form-item>
          <a-form-item v-if="formData.status != '6' && formData.status != '0'" field="cost_price" :label="$t('order.create.5umc7m1v8rk0')"
            :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }, { validator: validators }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input-number hide-button style="width: 100%;" v-model="formData.cost_price" :placeholder="$t('order.create.5umc7m1v6dg0')">
                <template #append>{{ formData?.currency }}</template>
              </a-input-number>
              <p v-if="formData.status != '4' && formData.status != '5'" style="margin-bottom: 0;margin-top:15px">
                {{ formData.status == 1 ? $t('order.create.5umc7m1v8to0') : $t('order.create.5umc7m1v8vg0') }}</p>
            </div>
          </a-form-item>
          <a-form-item v-if="formData.status == '2' || formData.status == '3'" field="deal_time" :label="$t('order.create.5umc7m1v8x80')"
            :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]" :validate-trigger="['change', 'input']">
            <a-date-picker show-time style="width:100%" v-model="formData.deal_time" :placeholder="$t('order.create.5umc7m1v7bk0')" />
          </a-form-item>
          <a-form-item v-if="(formData.status == '2' || formData.status == '3') && formData.create_position == 1"
            field="opening_price" :label="$t('order.create.5umc7m1v8z80')" :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }, { validator: validators }]"
            :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-input-number hide-button style="width: 100%;" v-model="formData.opening_price" :placeholder="$t('order.create.5umc7m1v6dg0')">
              </a-input-number>
            </div>
          </a-form-item>
          <a-form-item v-if="formData.status == '6'" field="reason" :label="$t('order.create.5umc7m1v91o0')"
            :rules="[{ required: true, message: $t('order.create.5umc7m1v6080') }]" :validate-trigger="['change', 'input']">
            <div style="width: 100%;">
              <a-textarea v-model="formData.reason" :auto-size="{
                minRows: 6,
                maxRows: 8
              }" />
            </div>
          </a-form-item>
          <a-form-item>
            <div style="display: flex;justify-content: flex-end;width: 100%;">
              <a-space :size="18">
                <a-button style="margin-right:15px" @click="step = 2">
                  {{$t('order.create.5umc7m1v8700')}}
                </a-button>
                <a-button type="primary" @click="saveBtn">
                  {{$t('order.create.5umc7m1v94w0')}}
                </a-button>
              </a-space>
            </div>
          </a-form-item>
        </a-form>

      </div>
      <div v-else-if="step === 4" style="height: 100%;display: flex;align-items: center;">
        <a-spin style="width: 100%">
          <div class="success-wrap">
            <a-result status="success" :title="$t('order.create.5umc7m1v9ag0')" :subtitle="$t('order.create.5umc7m1v9co0')">
              <template #subtitle>
                <a-button style="margin-top:10px" type="primary" @click="router.back()">
                  {{ $t('order.create.5umc7m1v9ec0') }}
                </a-button>
              </template>
            </a-result>
            <a-divider />
            <a-space :size="16" style="display: flex;justify-content: center;">
              <a-button key="view" @click="router.replace({ name: 'wealthTradeOrderDetail', params: { id: id } })"
                type="primary">
                {{ $t('order.create.5umc7m1v9g80') }}
              </a-button>
              <a-button key="again" @click="resetField(1)" type="secondary">
                {{ $t('order.create.5umc7m1v9j00') }}
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
  status: 0,
  create_position: 1,
  deal_nominal_principal: 0,
  cost_price: 0,
  deal_time: '',
  opening_price: 0,
  reason: '',
});
const currencyEnum = ref(useEnums('currency'))

const productTypeEnum: any = ref([
  { value: '2', name: t('order.create.5umc7m1v9l40') },
  { value: '1', name: t('order.create.5umc7m1v9n40') },
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
// const symbolList = ref([])
// const getSymbolList = async (value:string) => {
//     const { code, data } = await apiMarket.symbolSearch(useFilter({
//         keyword:value,
//     }))
//     if (code != 1) return;
//     symbolList.value = data.list.map((item:any)=>{
//         item.title = item.name[local.lang] + '.' + item.text
//         return item
//     })
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
      message = t('order.create.5umc7m1v9ow0')
    } else if ((principal * 1) < Number(min)) {
      message = t('order.create.5umc7m1v9r80') + min + ',' + t('order.create.5umc7m1v9ts0') + principal_setp + t('order.create.5umc7m1v9xs0')
    } else if ((principal * 1) > Number(min)) {
      let pattern = /\./
      let num = ((principal * 1) - Number(min)) / Number(principal_setp)
      if (pattern.test(num + '')) {
        message = t('order.create.5umc7m1v9ts0') + principal_setp + t('order.create.5umc7m1v9xs0')
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
          message: t('order.create.5umc7m1v9zg0')
        }
      })
      return false
    } else if (formData.value.start_time > formData.value.end_time) {
      formRef.value.setFields({
        end_time: {
          status: 'error',
          message: t('order.create.5umc7m1va1c0')
        }
      })
      return false
    }
    if (!formData.value.symbol) {
      formRef.value.setFields({
        market: {
          status: 'error',
          message: t('order.create.5umc7m1va3o0')
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
const dataStep2 = ref()
const nextStep2 = async () => {
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
              message: t('order.create.5umc7m1va640') + item.config.max
            }
            formRef.value.setFields(key)

          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('order.create.5umc7m1va9g0') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (!Number.isInteger(structureParameters.value[item.key])) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('order.create.5umc7m1vadc0')
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
              message: t('order.create.5umc7m1va640') + item.config.max
            }
            formRef.value.setFields(key)
          } else if (structureParameters.value[item.key] < item.config.min) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('order.create.5umc7m1va9g0') + item.config.min
            }
            formRef.value.setFields(key)
          } else if (num > item.config.precision) {
            bool = true
            let key: any = {}
            key[item.key] = {
              status: 'error',
              message: t('order.create.5umc7m1vagg0') + item.config.precision + t('order.create.5umc7m1vao40')
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
    dataStep2.value = param

    step.value = 3
  }
  // step.value = 3
}
const WealthOptionsProductInfo = ref()
const structureParameters: any = ref({})
const getWealthOptionsProductInfo = async (id: any) => {
  const res: any = await apiWealth.apiWealthOptionsProductInfo({ id: id });
  if (res.code != 1) return Message.error(res.msg)
  conditionData(res.data)
  WealthOptionsProductInfo.value = res.data

}
const validators = (value: any, cb: any) => {
  console.log(value);
  if (value && value > 0) {
    return true
  } else {
    cb(t('order.create.5umc7m1vars0'))
  }
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
}
// 档位选择
const structureGearVariable = ref([])
const structureKey = ref()
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

}
const validator = (value: any, cb: any) => {
  let min = WealthOptionsProductInfo.value.nominal_principal_min
  let principal_setp = WealthOptionsProductInfo.value.nominal_principal_step
  let principal = Number(value)
  if (principal < 0) {
    cb(t('order.create.5umc7m1v9ow0'))
  } else if ((principal * 1) < Number(min)) {
    cb(t('order.create.5umc7m1v9r80') + min + ',' + t('order.create.5umc7m1v9ts0') + principal_setp + t('order.create.5umc7m1v9xs0'))
  } else if ((principal * 1) > Number(min)) {
    let pattern = /\./
    let num = ((principal * 1) - Number(min)) / Number(principal_setp)
    if (pattern.test(num + '')) {
      cb(t('order.create.5umc7m1v9ts0') + principal_setp + t('order.create.5umc7m1v9xs0'))
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
      nominal_principal: 0,
      market: '',
      symbol: '',
      end_time: '',
      start_time: '',
      status: 0,
      create_position: 1,
      deal_nominal_principal: 0,
      cost_price: 0,
      deal_time: '',
      opening_price: 0,
      reason: '',
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
      status: 0,
      create_position: 1,
      deal_nominal_principal: 0,
      cost_price: 0,
      deal_time: '',
      opening_price: 0,
      reason: '',
    }
    formRef.value.resetFields()
  }
  getWealthOptionsProductAll()


}
const saveBtn = async () => {
  const res = await formRef.value?.validate();

  if (!res) {
    let param: any = {}
    if (formData.value.status == '1') {
      param.status = formData.value.status
      param.freeze_price = formData.value.cost_price
    } else if (formData.value.status == '0') {
      param.status = formData.value.status
    } else if (formData.value.status == '2' || formData.value.status == '3') {
      param = { ...formData.value }
      delete param.reason
    } else if (formData.value.status == '6') {
      param.status = formData.value.status
      param.reason = formData.value.reason
    }
    if (formData.value.create_position != 1) {
      delete param.opening_price
    }
    const { code, data } = await apiWealth.apiWealthOrderCreate({
      data: { ...param, ...dataStep2.value }
    })
    if (code != 1) return;
    id.value = data.id
    step.value = 4
    // const { code,data } = await apiWealth.apiWealthPositionCreate({
    //   data: param
    // })
    // if (code != 1) return;
    // id.value = data.id
  }
}
const validatorTime = (value: any, cb: any) => {
  if (formData.value.start_time > value) {
    cb(t('order.create.5umc7m1va1c0'))
  } else if (value <= dayjs(new Date()).format('YYYY-MM-DD')) {
    cb(t('order.create.5umc7m1v9zg0'))
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
    