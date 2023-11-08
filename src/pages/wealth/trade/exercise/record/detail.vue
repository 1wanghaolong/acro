<template>
  <div class="wrap">
      <Breadcrumb />
      <a-card class="generalCard">
          <a-page-header @back="router.back()" :subtitle="$t(`router.${String(route.name)}`)" />
          <a-card :loading="loading" style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                          {{$t('exercise.detail.5umcshecjlw0')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecl2c0')">
                            {{ dataAll.info.create_time?dayjs.unix(dataAll.info.create_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecl9g0')">
                              {{ useEnumsFormat('wealth.transaction.earlyExercise.status',dataAll.info?.status) }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6" >
                          <a-form-item :label="$t('exercise.detail.5umcsheclfo0')" v-if="dataAll.info.status != 0">
                              {{ dataAll.info.update_time?dayjs.unix(dataAll.info.update_time).format('YYYY-MM-DD HH:mm:ss'):'-' }}
                          </a-form-item>
                          <a-form-item :label="$t('exercise.detail.5umcsheclfo0')" v-else>
                            -
                          </a-form-item>
                      </a-col>
                  </a-row>
              </a-form>
          </a-card>
          <a-card :loading="loading" style="margin-bottom:15px" v-if="dataAll.info?.status==2">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                        {{$t('exercise.detail.5umcsheclk40')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item label="">
                              {{ dataAll.info?.reason||'-' }}
                          </a-form-item>
                      </a-col>
                  </a-row>
              </a-form>
          </a-card>
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                        <p>{{$t('exercise.detail.5umcsheclow0')}}</p>
                        <p @click="router.push({ name: 'wealthTradePositionDetail', params: { id: dataAll.info?.position_id } })" style="color:#2174f3;cursor: pointer;">{{ $t('exercise.detail.5umcshecltg0') }}</p>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                    <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecly40')">
                              {{ dataAll.info?.options_product_info?.product_name }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecm380')">
                              {{ $numberFormat(dataAll.info?.position_info?.nominal_principal) }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecm7o0')">
                              {{ dataAll.info?.position_info?.currency }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecmcs0')">
                              {{ dataAll.info?.position_info?.start_time?dayjs.unix(dataAll.info?.position_info?.start_time).format('YYYY-MM-DD'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecmh80')">
                              {{ dataAll.info?.position_info?.end_time?dayjs.unix(dataAll.info?.position_info?.end_time).format('YYYY-MM-DD'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecml00')">
                              {{ useEnumsFormat('wealth.transaction.optionPosition.status',dataAll.info?.position_info?.status) }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecmtg0')">
                              {{ dataAll.info?.position_info?.exercise_time?dayjs.unix(dataAll.info?.position_info?.exercise_time).format('YYYY-MM-DD'):'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecmxc0')">
                            <div style="display: flex;
    justify-content: space-between;flex:1">
                                <p>{{ dataAll.info?.order_info?.order_no }}</p>
                                <p @click="toOrder" style="color:#2174f3;cursor: pointer;" v-if="dataAll.info?.order_info?.order_no">{{ $t('exercise.detail.5umcshecn1c0') }}</p>
                            </div>
                          </a-form-item>
                      </a-col>
                      <a-divider />
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecn5w0')">
                              {{ dataAll.info?.symbol_name }} {{ dataAll.info?.position_info?.symbol }}.{{ dataAll.info?.position_info?.market ? useEnumsFormat('market.market', dataAll.info?.position_info?.market) : '' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecnak0')">
                              {{ $numberFormat(dataAll.info?.position_info?.opening_price,4)||'-' }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecnes0')">
                              {{ $numberFormat(dataAll.info?.position_info?.end_price,4)||'-' }}
                          </a-form-item>
                      </a-col>
                      
                  </a-row>
              </a-form>
          </a-card>
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                          {{$t('exercise.detail.5umcshecnj80')}}
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
              <p style="font-size: 16px;line-height: 1.5715;margin:20px 0">{{$t('exercise.detail.5umcshecno80')}}</p>
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
          <a-card :loading="loading"  style="margin-bottom:15px">
              <template #title>
                  <div style="display: flex;justify-content: space-between;">
                      <a-space :size="18">
                          {{$t('exercise.detail.5umcshecns80')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecnwc0')">
                              {{ dataAll.info?.asset_account_info?.account }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcshecnzk0')">
                              {{ dataAll.info?.asset_account_info?.real_name }}
                          </a-form-item>
                      </a-col>
                      <a-col :xs="24" :sm="12" :md="8" :xl="6">
                          <a-form-item :label="$t('exercise.detail.5umcsheco300')">
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
                          {{$t('exercise.detail.5umcsheco6s0')}}
                      </a-space>
                  </div>
              </template>
              <a-form ref="formRef" :model="dataAll.info" auto-label-width layout="vertical">
                  <a-row :gutter="16">
                      <a-col :xs="24" :sm="12" :md="8" :xl="24">
                          <div v-if="dataAll.info?.status == '0'">
                          <a-button v-permission="['wealthPositionExerciseRecordsPass']" @click="passThroughShow = true" type="primary" >
                          {{ $t('exercise.detail.5umcshecoag0') }}
                          </a-button>
                          <a-button v-permission="['wealthPositionExerciseRecordsReject']" style="margin-left:10px" status="danger"   type="primary" @click="loseVisible = true" >
                          {{ $t('exercise.detail.5umcshecoe40') }}
                          </a-button>
                      </div>
                      <div v-else style="color:#999">
                          {{$t('exercise.detail.5umcshecoho0')}}
                      </div>
                      </a-col>
                  </a-row>
              </a-form>
          </a-card>
      </a-card>
      <a-modal :mask-closable=false v-model:visible="loseVisible" :on-before-ok="handleLose" @close="onCloseLose">
      <template #title>
        {{$t('exercise.detail.5umcshecol00')}}
      </template>
      <div class="textareaCss">
        <p style="margin-right:10px;margin-bottom:10px">{{$t('exercise.detail.5umcshecoog0')}}</p>
        <a-textarea v-model="reason" :placeholder="$t('exercise.detail.5umcshecos80')" :auto-size="{
                minRows: 6,
                maxRows: 8
              }" />
      </div>
    </a-modal>
    <a-modal :mask-closable=false v-model:visible="passThroughShow" :ok-loading="false" :on-before-ok="passThroughBtn">
      <template #title>
        {{$t('exercise.detail.5umcsxtwoxo0')}}
      </template>
      <div style="display: flex;">
        <span style="margin-right:10px">{{$t('exercise.detail.5umcshecovk0')}}</span>
      </div>
    </a-modal>
  </div>
  
</template>

<script lang="ts" setup>
import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs'
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
  const { code, data } = await apiWealth.apiWealthPositionExerciseRecordsInfo({
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
const passThroughShow = ref(false)
const passThroughBtn = async () => {
  const { code } = await apiWealth.apiWealthPositionExerciseRecordsPass({
      id: route.params?.id
  })
  if (code != 1) return false;
  router.push({ name: 'wealthTradePositionDetail', params: { id: dataAll.info?.position_id } })
  return true
}
const toOrder = ()=>{
  router.push({ name: 'wealthTradeOrderDetail', params: { id: dataAll.info?.order_info?.id } })
}

// 设置不通过
const loseVisible = ref(false)
const reason = ref()
const handleLose = async () => {
  const { code } = await apiWealth.apiWealthPositionExerciseRecordsReject({
      id: route.params?.id,
      reason: reason.value
  })
  if (code != 1) return false;
  getData()
  return true
}
const onCloseLose = () => {
  reason.value = ''
}


</script>

<style lang="less" scoped>
:deep(.arco-form-item-label-col > .arco-form-item-label) {
  color: var(--color-text-3);
}
</style>