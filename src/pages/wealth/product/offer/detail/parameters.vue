<template>
  <a-card style="margin-top: 20px;" :loading="loading">
    <template #title>
      <div style="display: flex;justify-content: space-between;">
        <a-space :size="18">
          {{$t('offer.parameters.5umx1gweiss0')}}: {{ form.data?.options_product_info?.product_name || "" }}
        </a-space>
        <a-space :size="18">
          <a-button v-if="!form.setup" @click="submit" type="primary" :loading="loading" :disabled="loading">
            <template #icon>
              <icon-save />
            </template>
            {{$t('offer.parameters.5umx1gwek1o0')}}
          </a-button>
          <a-button v-permission="['wealthproductofferDetailParametersEdit']" v-if="form.setup"
            @click="form.setup = false" type="primary">
            <template #icon>
              <icon-edit />
            </template>
            {{$t('offer.parameters.5umx1gwek6s0')}}
          </a-button>
        </a-space>
      </div>
    </template>
    <div v-if="form.data.framework_params.length" style="width:800px;margin:0 auto">
      <p style="font-weight: bold;padding-bottom: 20px;">{{$t('offer.parameters.5umx1gwekbo0')}}</p>
      <div>
        <a-form-item v-for="item in form.data.framework_params">
          <template #label>
            <div style="width: 100px;text-align: right;">
              <strong v-if="item.config.required" class="arco-form-item-label-required-symbol"><svg fill="currentColor"
                  viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path
                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                  </path>
                </svg>
              </strong>
              {{ item.params_name }}
            </div>
          </template>
          <a-select :disabled="form.setup" v-model="item.config.value"
            v-if="(item.params_type == 'gear_percent' && item.config.step) || (item.params_type == 'gear_number' && item.config.step)">
            <a-option :value="item3" v-for="item3 in item.can_select">{{ item3 }}{{ item.params_type ==
              'gear_number' ? '' : '%' }}</a-option>
          </a-select>
          <div v-else-if="item.params_type == 'checkbox'" style="width: 100%;">
            <a-select :disabled="form.setup" v-model="item.config.value" multiple :limit="item.config.max">
              <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
              }}</a-option>
            </a-select>
            <div style="padding-top: 10px;">
              <span>{{$t('offer.parameters.5umx2vd0oy80')}}:{{ item.config.max }}个</span>
            </div>
          </div>
          <div v-else-if="item.params_type == 'radio'" style="width: 100%;">
            <a-select :disabled="form.setup" v-model="item.config.value">
              <a-option v-for="item2 in item.config.options" :value="item2.key" >{{ item2.text[local.lang]}}</a-option>
            </a-select>
          </div>
          <div v-else style="width: 100%;">
            <a-input :disabled="form.setup" @change="inputChange($event, item)" v-model="item.config.value"
              :placeholder="`${$t('offer.parameters.5umx2vd0q880')}${item.params_name}`">
              <template #prepend>
                <div v-if="item.params_type == 'percent'">%</div>
              </template>
            </a-input>
            <div style="padding-top: 10px;">
              <span>{{$t('offer.parameters.5umx2vd0pw80')}}：{{ item.config.max }}{{ item.params_type == 'percent' ? '%' : '' }}</span>
              <span style="padding-left: 10px;">{{$t('offer.parameters.5umx2vd0q340')}}：{{ item.config.min }}{{ item.params_type == 'percent' ? '%' : ''
              }}</span>
            </div>
          </div>
        </a-form-item>
      </div>
    </div>
    <div v-if="form.data.quote_params.length" style="width:800px;margin:0 auto">
      <p style="font-weight: bold;padding-bottom: 20px;">{{$t('offer.parameters.5umx1gwekko0')}}</p>
      <div>
        <a-form-item v-for="item in form.data.quote_params">
          <template #label>
            <div style="width: 100px;text-align: right;">
              <strong v-if="item.config.required" class="arco-form-item-label-required-symbol"><svg fill="currentColor"
                  viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path
                    d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z">
                  </path>
                </svg>
              </strong>
              {{ item.params_name }}
            </div>
          </template>
          <a-select :disabled="form.setup" v-model="item.config.value"
            v-if="(item.params_type == 'gear_percent' && item.config.step) || (item.params_type == 'gear_number' && item.config.step)">
            <a-option :value="item3" v-for="item3 in item.can_select">{{ item3 + '%' }}</a-option>
          </a-select>
          <div v-else-if="item.params_type == 'checkbox'" style="width: 100%;">
            <a-select :disabled="form.setup" v-model="item.config.value" multiple :limit="item.config.max">
              <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
              }}</a-option>
            </a-select>
            <div style="padding-top: 10px;">
              <span>{{$t('offer.parameters.5umx2vd0oy80')}}:{{ item.config.max }}个</span>
            </div>
          </div>
          <div v-else-if="item.params_type == 'radio'" style="width: 100%;">
            <a-select :disabled="form.setup" v-model="item.config.value">
              <a-option :value="item2.key" v-for="item2 in item.config.options">{{ item2.text[local.lang]
              }}</a-option>
            </a-select>
          </div>
          <div v-else style="width: 100%;">
            <a-input :disabled="form.setup" @change="inputChange($event, item)" v-model="item.config.value"
              :placeholder="`${$t('offer.parameters.5umx2vd0q880')}${item.params_name}`">
              <template #prepend>
                <div v-if="item.params_type == 'percent'">%</div>
              </template>
            </a-input>
            <div style="padding-top: 10px;">
              <span>{{$t('offer.parameters.5umx2vd0pw80')}}：{{ item.config.max }}{{ item.params_type == 'percent' ? '%' : '' }}</span>
              <span style="padding-left: 10px;">{{$t('offer.parameters.5umx2vd0q340')}}：{{ item.config.min }}{{ item.params_type == 'percent' ? '%' : ''
              }}</span>
            </div>
          </div>
        </a-form-item>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
// import { useEnumsFormat } from '@/hooks/enums'
import dayjs from 'dayjs';
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const loading = ref(false)
const form = ref({
  setup: true,
  data: <any>{
    framework_params: [],
    quote_params: []
  },
})
const inputChange = (value: any, list: any) => {
  const chineseRegex = /[\u4e00-\u9fa5]/;
  const zmchineseRegex = /[a-zA-Z]/;
  if (chineseRegex.test(value)) {
    Message.info({ content: t('offer.parameters.5umx1gwekro0') })
    list.config.value = ""
    return
  }
  if (zmchineseRegex.test(value)) {
    Message.info({ content: t('offer.parameters.5umx1gwel040') })
    list.config.value = ""
    return
  }
  if (Number(value) < 0) {
    Message.info({ content: t('offer.parameters.5umx1gwel700') })
    list.config.value = ""
    return
  }
  if (((Number(value) < Number(list.config.min)) || (Number(value) > Number(list.config.max)))) {
    Message.info({ content: t('offer.parameters.5umx1gweldw0') })
    list.config.value = ""
    return
  }
  list.config.value = Number(value)
}
const getData = async () => {
  loading.value = true
  const { code, data } = await apiWealth.apiWealthOptionsProductQuoteInfo({
    id: route.params?.productid
  })
  loading.value = false
  if (code != 1) return;
  form.value.data = data
  if ((form.value.data.framework_params.length || form.value.data.quote_params.length) && data.params_content.length) {
    let valList: any = []
    data.params_content.forEach((item: any) => {
      valList.push({
        id: item.params_info.id,
        config: JSON.parse(item.params_info.config),
        content: JSON.parse(item.content)
      })
    })
    valList.forEach((item1: any) => {
      form.value.data.framework_params.forEach((item2: any) => {
        if (item1.id == item2.params_id) {
          item2.config = item1.config
          item2.content = item1.content
          if (item2.params_type == 'checkbox') {
            item2.config.value = []
            if (item1.content.selected.length) {
              item1.content.selected.forEach((item: any) => {
                if (item.key) {
                  item2.config.value.push(item.key)
                }
              })
            }
          }else if(item2.params_type == 'radio'){       
            item2.config.value = item1.content.selected[0]?.key
          } else {
            item2.config.value = Number(item2.content.value)
          }
        }
      })
      form.value.data.quote_params.forEach((item3: any) => {
        if (item1.id == item3.params_id) {
          item3.config = item1.config
          item3.content = item1.content
          if (item3.params_type == 'checkbox') {
            item3.config.value = []
            if (item1.content.selected.length) {
              item1.content.selected.forEach((item: any) => {
                if (item.key) {
                  item3.config.value.push(item.key)
                }
              })
            }
          }else if(item3.params_type == 'radio'){
            item3.config.value = item1.content.selected[0]?.key
          } else {
            item3.config.value = Number(item3.content.value)
          }
        }
      })
    })
  }
}
const submit = async () => {
  let i = 0 //是否有空值
  form.value.data.framework_params.forEach((item: any) => {
      if ((!item.config.value && item.config.value != '0') && item.config.required) {
          i++;
      }
      if (item.params_type == 'checkbox' && !item.config.value.length) {
          i++;
      }
  })
  form.value.data.quote_params.forEach((item: any) => {
    if ((!item.config.value && item.config.value != '0') && item.config.required) {
          i++;
    }
    if (item.params_type == 'checkbox' && !item.config.value.length) {
      i++;
    }
  })
  if (i) {
    Message.info({ content: t('offer.parameters.5umx1gweljs0') })
    return
  }
  let { options_product_id, currency, period, market, security_type, symbol, nominal_principal, status, end_time } = form.value.data
  let params_list: any = [], arrList: any = []
  if (form.value.data.quote_params.length || form.value.data.framework_params.length) {
    arrList = form.value.data.quote_params.length
      ? [...form.value.data.quote_params]
      : [...form.value.data.framework_params];

    if (form.value.data.quote_params.length && form.value.data.framework_params.length) {
      arrList = [...form.value.data.framework_params, ...form.value.data.quote_params];
    }
  }
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
        params_list.push({
          params_id: item.params_id,
          content: {
            selected
          }
        })
      } else if (item.params_type == "radio") {
        console.log('item.config.value',item.config);
        let selected: any = []
        if (item.config.value) {
            selected.push({
              key: item.config.value
            })
        }
        params_list.push({
          params_id: item.params_id,
            content: {
              selected
          }
        })
      } else {
        params_list.push({
          params_id: item.params_id,
          content: {
            value: item.config.value
          }
        })
      }
    })
  }
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

  if (end_time != '0') {
    parsm.end_time = formattedEndTime;
  }
  const { code } = await apiWealth.apiWealthOptionsProductQuoteUpdate({ id: route.params?.productid, data: parsm })
  if (code != 1) return;
  form.value.setup = true
  getData()

}
{
  getData()
}
onMounted(() => {

})
</script>