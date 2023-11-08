<template>
  <div class="wrap">
      <Breadcrumb />
      <a-card class="generalCard">
          <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                        <p>{{$t('position.detail.5umciloe8dw0')}}</p>
                        <p style="color:#2174f3;" v-if="dataAll.info?.status!=2">
                            <a-button v-permission="['wealthPositionUpdatePosition']" type="primary" @click="editShowBtn">
                                {{$t('position.detail.5umciloej880')}}
                                </a-button>
                        </p>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloejkk0')">
                              {{ dataAll.info?.options_product_info?.product_name }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloejqo0')">
                              {{ $numberFormat(dataAll.info?.nominal_principal) }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloekjs0')">
                              {{ dataAll.info?.currency }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloekpw0')">
                              {{ dataAll.info?.start_time?dayjs.unix(dataAll.info?.start_time).format('YYYY-MM-DD'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloekuw0')">
                              {{ dataAll.info?.end_time?dayjs.unix(dataAll.info?.end_time).format('YYYY-MM-DD'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloel000')">
                              {{ useEnumsFormat('wealth.transaction.optionPosition.status',dataAll.info?.status) }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloeltk0')">
                              {{ dataAll.info?.exercise_time?dayjs.unix(dataAll.info?.exercise_time).format('YYYY-MM-DD'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloem3k0')">
                            <div style="display: flex;justify-content: space-between;flex:1">
                                <p>{{ dataAll.info?.order_info?.order_no||'-' }}</p>
                                <p @click="toOrder" style="color:#2174f3;cursor: pointer;" v-if="dataAll.info?.order_info?.order_no">{{ $t('position.detail.5umciloem8g0') }}</p>
                            </div>
                          </a-form-item>
                      </a-col>
                      <a-divider />
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloeme40')">
                              {{ dataAll.info?.symbol_name }} {{ dataAll.info?.symbol }}.{{ dataAll.info?.market ? useEnumsFormat('market.market', dataAll.info?.market) : '' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloemj80')">
                              {{  $numberFormat(dataAll.info?.opening_price,4)||'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloemrw0')">
                              {{ $numberFormat(dataAll.info?.end_price,4)||'-' }}
                          </a-form-item>
                      </a-col>
                      
                  </a-row>
              </a-form>
          </a-card>
         
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                          {{$t('position.detail.5umciloemww0')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6" v-for="item in dataAll.info?.framework_params">
                          <a-form-item :label="item?.params_name">
                              {{ item?.name }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="!dataAll.info?.framework_params?.length">
                          <a-form-item >
                              -
                          </a-form-item>
                      </a-col>
                  </a-row>
              </a-form>
              <a-divider />
              <p style="font-size: 16px;line-height: 1.5715;margin:20px 0">{{$t('position.detail.5umciloen1w0')}}</p>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6" v-for="item in dataAll.info?.quote_params">
                          <a-form-item :label="item?.params_name">
                              {{ item?.name }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6" v-if="!dataAll.info?.quote_params?.length">
                          <a-form-item >
                              -
                          </a-form-item>
                      </a-col>
                  </a-row>
              </a-form>
          </a-card>
          <a-card :loading="loading" style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                        {{$t('position.detail.5umciloen780')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloenc80')">
                            {{  $numberFormat(dataAll.info?.cost_price) || '-' }} {{ dataAll.info?.cost_price ? dataAll.info?.currency :
              '' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloenk40')">
                            {{ $numberFormat(dataAll.info?.contract_income) || '--' }} {{ dataAll.info?.contract_income ? dataAll.info?.currency :
              '' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloenq00')">
                            {{  $numberFormat(dataAll.info?.net_profit) || '--' }} {{ dataAll.info?.net_profit ? dataAll.info?.currency :
              '' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloenyk0')">
                            {{dataAll.info?.net_profit_rate ? ($numberFormat(dataAll.info?.net_profit_rate) + '%') : '--' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloeo3g0')">
                              {{ dataAll.info?.settlement_time?dayjs.unix(dataAll.info?.settlement_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                          </a-form-item>
                      </a-col>
                  </a-row>
              </a-form>
          </a-card>
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                          {{$t('position.detail.5umciloeo8g0')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloeoco0')">
                              {{ dataAll.info?.asset_account_info?.account }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloeogw0')">
                              {{ dataAll.info?.asset_account_info?.real_name }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('position.detail.5umciloeol40')">
                              {{ dataAll.info?.asset_account_info?.english_name }}
                          </a-form-item>
                      </a-col>
                  </a-row>
              </a-form>
          </a-card>
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                          {{$t('position.detail.5umciloeop00')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                          <a-button v-permission="['wealthPositionContractSettlement']" v-if="dataAll.info?.status != 2" @click="contractShowBtn" type="primary" >
                          {{ $t('position.detail.5umciloeotc0') }}
                          </a-button>
                          <a-popconfirm  position="top"  @ok="handleLose" :content="$t('position.detail.5umcl5cphnc0')">
                          <a-button v-permission="['wealthPositionDelete']" style="margin-left:10px" status="danger"   type="primary">
                          {{ $t('position.detail.5umciloeox40') }}
                          </a-button>
                        </a-popconfirm>
                  </a-row>
              </a-form>
          </a-card>
      </a-card>
      <a-modal :mask-closable=false v-model:visible="contractShow" @close="onClose" :ok-loading="false"
      :on-before-ok="contractBtn">
      <template #title>{{$t('position.detail.5umck6hogis0')}}</template>
      <div>
        <a-alert type="error" :show-icon="false" v-if="dataAll.info?.status == 0">
          <span style="color:#eb5350">
            {{$t('position.detail.5umciloep1o0')}}
          </span>
        </a-alert>
        <div style="display: flex;margin-top:15px">
          <a-form ref="formRef" :model="contractForm" layout="vertical">
            <a-form-item field="end_price" :label="$t('position.detail.5umciloemrw0')" :rules="[{ required: true, message: $t('position.detail.5umciloests0') }]"
              :validate-trigger="['change', 'input']">
              <a-input-number hide-button v-model="contractForm.end_price" :placeholder="$t('position.detail.5umciloep5k0')" />
            </a-form-item>
            <a-form-item field="contract_income" :label="$t('position.detail.5umciloenk40')" :rules="[{ required: true, message: $t('position.detail.5umciloests0') },{ validator: validators }]"
              :validate-trigger="['change', 'input']">
              <div style="width: 100%;">
                <a-input-number hide-button style="width: 100%;" v-model="contractForm.contract_income" :placeholder="$t('position.detail.5umciloep5k0')" >
                  <template #append>{{  dataAll.info?.currency }}</template>
                </a-input-number>
                <p style="margin-bottom: 0;margin-top:15px">{{$t('position.detail.5umciloepws0')}} {{  contractForm.contract_income }} {{  dataAll.info?.currency }}</p>
              </div>
            </a-form-item>
            <a-form-item  v-if="dataAll.info?.status == 0" field="exercise_time" :label="$t('position.detail.5umciloeltk0')" :rules="[{ required: true, message: $t('position.detail.5umciloests0') }]"
              :validate-trigger="['change', 'input']">
              <a-date-picker style="width:100%" v-model="contractForm.exercise_time" :placeholder="$t('position.detail.5umciloeq440')" />
            </a-form-item>
            <a-form-item :label="$t('position.detail.5umciloeqbw0')">
              {{ $numberFormat(dataAll.info?.cost_price) || '--' }} {{ dataAll.info?.cost_price ? dataAll.info?.currency :
                '' }}
            </a-form-item>
            <a-form-item :label="$t('position.detail.5umciloenq00')">
              {{ $numberFormat(dataAll.info?.net_profit) || '--' }} {{ dataAll.info?.net_profit ? dataAll.info?.currency :
                '' }}
            </a-form-item>
            <a-form-item :label="$t('position.detail.5umciloenyk0')">
              {{ dataAll.info?.net_profit_rate > 0 ? '+' : '' }}{{ dataAll.info?.net_profit_rate ?
                ($numberFormat(dataAll.info?.net_profit_rate) + '%') : '--' }}
            </a-form-item>

          </a-form>
        </div>
      </div>
    </a-modal>
    <a-modal :mask-closable=false v-model:visible="editShow" @close="onClose" :ok-loading="false"
      :on-before-ok="editBtn">
      <template #title> {{$t('position.detail.5umciloej880')}}</template>
      <div>
        <a-alert type="error" :show-icon="false">
          <span style="color:#eb5350">
            {{$t('position.detail.5umciloeqt80')}}
          </span>
        </a-alert>
        <div style="display: flex;margin-top:15px" >
          <a-form ref="formRef" :model="contractForm" layout="vertical">
            <a-form-item field="start_time" :label="$t('position.detail.5umciloekpw0')" :rules="[{ required: true, message: $t('position.detail.5umciloests0') }]"
            :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="contractForm.start_time" :placeholder="$t('position.detail.5umciloeq440')" />
          </a-form-item>
          <a-form-item :disabledDate="disabledDate" field="end_time" :label="$t('position.detail.5umciloekuw0')"
            :rules="[{ required: true, message: $t('position.detail.5umciloests0') },{ validator: validatorTime }]" :validate-trigger="['change', 'input']">
            <a-date-picker style="width:100%" v-model="contractForm.end_time" :placeholder="$t('position.detail.5umciloeq440')" />
          </a-form-item>
          </a-form>
        </div>
      </div>
    </a-modal>
  </div>
  
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)

const dataAll:any = reactive({
  info:{}
})
const getData = async () => {
  loading.value = true
  const { code, data } = await apiWealth.apiWealthPositionInfo({
      id: route.params?.id
  })
  loading.value = false
  if (code != 1) return;
  dataAll.info = data
  if (dataAll.info.framework_params?.length) {
  dataAll.info.framework_params.forEach((item: any) => {
    if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
      item.name = item.params_content + '%'
    } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
      let arr: any = []
      item.params_content.forEach((items: any) => {
        arr.push(items?.text[local.lang])
      })
      item.name = arr.join(',')
    } else {
      item.name = item.params_content
    }
  })
}
if (dataAll.info.quote_params?.length) {
  dataAll.info.quote_params.forEach((item: any) => {
    if (item.params_type == 'gear_percent' || item.params_type == 'percent') {
      item.name = item.params_content + '%'
    } else if (item.params_type == 'radio' || item.params_type == 'checkbox') {
      let arr: any = []
      item.params_content.forEach((items: any) => {
        arr.push(items?.text[local.lang])
      })
      item.name = arr.join(',')
    } else {
      item.name = item.params_content
    }
  })
}
}
{
  getData()
}
// 通过
const contractShow = ref(false)
const contractForm:any = ref({
  end_price: '',
  exercise_time: '',
  contract_income: '',
  end_time:'',
  start_time:'',
})
const onClose = () => {
  formRef.value.resetFields()
}
const contractShowBtn = () => {
  
  contractForm.value.end_price = Number(dataAll.info?.end_price)
  if(dataAll.info.status==1){
    contractForm.value.exercise_time =  dataAll.info?.end_time?dayjs(dataAll.info?.exercise_time*1000).format('YYYY-MM-DD'):dayjs(new Date()).format('YYYY-MM-DD')
  }else{
  contractForm.value.exercise_time = new Date()

  }
  contractForm.value.contract_income = Number(dataAll.info?.contract_income)
  contractShow.value = true
}
const contractBtn = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
      const { code } = await apiWealth.apiWealthPositionContractSettlement({
          id:dataAll.info.id,
          data:{
            contract_income:contractForm.value.contract_income,
            exercise_time:contractForm.value.exercise_time,
            end_price:contractForm.value.end_price,
          }
        })
  if (code != 1) return false;
  getData()
  return true
  }
  return false
}
const toOrder = ()=>{
  router.push({ name: 'wealthTradeOrderDetail', params: { id: dataAll.info?.order_id } })
}
// 编辑
const disabledDate = (val: any) => {
  return dayjs(val).isBefore(dayjs())
}
const validatorTime = (value: any, cb: any) => {
  if(contractForm.value.start_time > value){
    cb(t('position.detail.5umciloet1s0'))
  }else if(value <= dayjs(new Date()).format('YYYY-MM-DD')){
    cb(t('position.detail.5umciloet6k0'))
  }else{
    return true
  }
}
const editShow = ref(false)
const editShowBtn = ()=>{
    contractForm.value.start_time = dayjs(dataAll.info?.start_time*1000).format('YYYY-MM-DD')
    contractForm.value.end_time = dayjs(dataAll.info?.end_time*1000).format('YYYY-MM-DD')
    editShow.value =true
}
const editBtn = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    if (contractForm.value.end_time <= dayjs(new Date()).format('YYYY-MM-DD')) {
      formRef.value.setFields({
        end_time: {
          status: 'error',
          message: t('position.detail.5umciloet6k0')
        }
      })
      return false
    } else if (contractForm.value.start_time > contractForm.value.end_time) {
      formRef.value.setFields({
        end_time: {
          status: 'error',
          message: t('position.detail.5umciloet1s0')
        }
      })
      return false
    }
      const { code } = await apiWealth.apiWealthPositionUpdatePosition({
          id:dataAll.info.id,
          data:{
            start_time:contractForm.value.start_time,
            end_time:contractForm.value.end_time,
          }
        })
  if (code != 1) return false;
  getData()
  return true
  }
  return false
}

// 删除
const handleLose = async () => {
    const { code } = await apiWealth.apiWealthPositionDelete({
      id: route.params?.id
  })
  if (code != 1) return ;
  router.back()
}
const validators = (value: any, cb: any) => {
  console.log(value);
  if(value&&value>0){
    return true
  }else{
    cb(t('position.detail.5umciloetaw0'))
  }
}

</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
  color: var(--color-text-3);
}
</style>