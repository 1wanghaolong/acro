<template>
  <div>
    <a-card :loading="form.loading">
      <a-form
        ref="formRef"
        :model="form.data"
        :rules="(formRules as any)"
        auto-label-width
        layout="vertical"
      >
        <a-row :gutter="18">
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="status" :label="$t('detail.index.5ukesg2l6uc0')">
              <a-select
                disabled
                allow-clear
                v-model="form.data.market"
                :placeholder="$t('detail.index.5ukesg2l8740')"
              >
                <a-option
                  v-for="item in useEnums('market.market')"
                  :value="item.value"
                  >{{ item.trans[local.lang] }}</a-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item :label="$t('detail.index.5ukesg2l8ew0')">
              <a-input
                disabled
                v-model="form.data.securityTypeName"
                :placeholder="$t('detail.index.5ukesg2l8k80')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="symbol" :label="$t('detail.index.5ukesg2l8p40')">
              <a-input
                v-model="form.data.symbol"
                disabled
                :placeholder="$t('detail.index.5ukesg2l8uo0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.zh-CN" :label="$t('detail.financingInfo.5ukeqpvc4gs0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.name['zh-CN']"
                :placeholder="$t('detail.financingInfo.5ukerfnikm00')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.tc" :label="$t('detail.financingInfo.5ukerfnis4w0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.name['tc']"
                :placeholder="$t('detail.financingInfo.5ukerfnit6c0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.en" :label="$t('detail.financingInfo.5ukerfniw3o0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.name['en']"
                :placeholder="$t('detail.financingInfo.5ukerfnixlw0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="lot_size" :label="$t('detail.index.5ukesg2l8zs0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.lot_size"
                :placeholder="$t('detail.index.5ukesg2l94s0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="min_price" :label="$t('detail.index.5ukesg2l9a00')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.min_price"
                :placeholder="$t('detail.index.5ukesg2l9es0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="max_price" :label="$t('detail.index.5ukesg2l9jg0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.max_price"
                :placeholder="$t('detail.index.5ukesg2l9y40')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="min_amount" :label="$t('detail.index.5ukesg2la340')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.min_amount"
                :placeholder="$t('detail.index.5ukesg2la800')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="currency" :label="$t('detail.index.5ukesg2lad40')">
              <a-input
                v-model="form.data.currency"
                disabled
                :placeholder="$t('detail.index.5ukesg2lahw0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="total_quantity" :label="$t('detail.index.5ukesg2laqc0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.total_quantity"
                :placeholder="$t('detail.index.5ukesg2lavs0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="market_value" :label="$t('detail.index.5ukesg2lb0o0')">
              <a-input
                :disabled="true"
                v-model="form.data.market_value"
                :placeholder="$t('detail.index.5ukesg2lb640')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="cash_fare" :label="$t('detail.index.5ukesg2lbck0')">
              <a-input
                :disabled="true"
                v-model="form.data.cash_fare"
                :placeholder="$t('detail.index.5ukesg2lbgk0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="publish_quantity" :label="$t('detail.index.5ukesg2lbks0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.publish_quantity"
                :placeholder="$t('detail.index.5ukesg2lboo0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :xl="24">
            <a-form-item field="prospectus_link" :label="$t('detail.index.5ukesg2lbsg0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.prospectus_link"
                :placeholder="$t('detail.index.5ukesg2lbwo0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :xl="24">
            <a-form-item field="sponsor" :label="$t('detail.index.5ukesg2lc7k0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.sponsor"
                :placeholder="$t('detail.index.5ukesg2lcbk0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :xl="24">
            <a-form-item field="company_profile" :label="$t('detail.index.5ukesg2lcfc0')">
              <a-textarea
                :disabled="!form.setup"
                v-model="form.data.company_profile"
                :placeholder="$t('detail.index.5ukesg2lcjc0')"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="cash_begin_time" :label="$t('detail.index.5ukesg2lcnc0')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.cash_begin_time"
                :placeholder="$t('detail.index.5ukesg2lcnc0')"
                @change="changeDatePicker($event, 'cash_begin_time')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="cash_end_time" :label="$t('detail.index.5ukesg2lcro0')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.cash_end_time"
                :disabledDate="(time:any) => dayjs(time).isBefore((dayjs(form.data.cash_begin_time)))"
                @change="changeDatePicker($event, 'cash_end_time')"
                :placeholder="$t('detail.index.5ukesg2lcro0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="publish_time" :label="$t('detail.index.5ukesg2lea40')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.publish_time"
                @change="changeDatePicker($event, 'publish_time')"
                :placeholder="$t('detail.index.5ukesg2lea40')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="listing_time" :label="$t('detail.index.5ukesg2lf4g0')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                @change="changeDatePicker($event, 'listing_time')"
                v-model="form.data.listing_time"
                :placeholder="$t('detail.index.5ukesg2lf4g0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="is_support_grey" :label="$t('detail.index.5ukesg2lfwg0')">
              <a-radio-group
                :disabled="!form.setup"
                v-model="form.data.is_support_grey"
                :options="options"
              >
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_grey == '1'"
          >
            <a-form-item field="grey_begin_time" :label="$t('detail.index.5ukesg2lgx00')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.grey_begin_time"
                @change="changeDatePicker($event, 'grey_begin_time')"
                :placeholder="$t('detail.index.5ukesg2lgx00')"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_grey == '1'"
          >
            <a-form-item field="grey_end_time" :label="$t('detail.index.5ukesg2lh580')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.grey_end_time"
                :disabledDate="(time:any) => dayjs(time).isBefore((dayjs(form.data.grey_begin_time).subtract(1, 'day')))"
                @change="changeDatePicker($event, 'grey_end_time')"
                :placeholder="$t('detail.index.5ukesg2lh580')"
              />
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="success_rate" :label="$t('detail.index.5ukesg2lh9c0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.success_rate"
                :placeholder="$t('detail.index.5ukesg2lhdo0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="booking_ratio" :label="$t('detail.index.5ukesg2lj8k0')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.booking_ratio"
                :placeholder="$t('detail.index.5ukesg2ljfk0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="first_gain" :label="$t('detail.index.5ukesg2ljk00')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.first_gain"
                :placeholder="$t('detail.index.5ukesg2ljoc0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="first_close" :label="$t('detail.index.5ukesg2ljs40')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.first_close"
                :placeholder="$t('detail.index.5ukesg2ljww0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="issue_price" :label="$t('detail.index.5ukesg2lk100')">
              <a-input
                :disabled="!form.setup"
                v-model="form.data.issue_price"
                :placeholder="$t('detail.index.5ukesg2lk4w0')"
              />
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <div>
              {{ $t('detail.index.5ukesg2lk8w0') }}
            </div>
            <div>
              {{ "· " }}{{$t('detail.index.5ukesg2lkcs0')}}
            </div>
            <div>
              {{ "· " }}{{$t('detail.index.5ukesg2lkgs0')}}
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useEnums } from "@/hooks/enums";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import dayjs from "dayjs";
const formRef:any = ref()
const local = useLocal();
// const route = useRoute();
const props = defineProps({
  form: Object,
});
const dataName = ref('')
const emit = defineEmits(["update:form"]);
const options = ref([
  { label: t('detail.index.5ukesg2lkkw0'), value: "0" },
  { label: t('detail.index.5ukesg2lkp00'), value: "1" },
]);
const form: any = ref({
  show: false,
  loading: false,
  setup: false,
  data: {
    name: { "zh-CN": "", tc: "", en: "" },
  }
});
const TimeVal = (name:any) => {
  const data = form.value?.data;
  const getValueInSeconds = (propertyName:any) =>
    dayjs(data[propertyName]).valueOf() / 1000;
  const cash_begin_time = getValueInSeconds('cash_begin_time');
  const cash_end_time = getValueInSeconds('cash_end_time');
  const publish_time = getValueInSeconds('publish_time');
  const listing_time = getValueInSeconds('listing_time');
  const grey_begin_time = getValueInSeconds('grey_begin_time');
  const grey_end_time = getValueInSeconds('grey_end_time');
  // const finance_begin_time = getValueInSeconds('finance_begin_time');
  // const finance_end_time = getValueInSeconds('finance_end_time');

  const isCashDataName = ['cash_begin_time', 'cash_end_time','publish_time','listing_time','grey_begin_time','grey_end_time'].includes(name);
  const isSupportGrey = form.value?.data.is_support_grey === '1';
  const checkTime = (value:any, msg:any) => {
      if (value) {
        return { msg, whethernot: true };
      }
      return { whethernot: false };
  }
  switch (name) {
    case 'cash_begin_time':
      if (isCashDataName) {
        if (cash_begin_time > cash_end_time) {
          return checkTime(true, t('detail.index.5ukesg2lksw0'));
        }
        if (cash_begin_time > publish_time) {
          return checkTime(true, t('detail.index.5ukesg2lkwk0'));
        }
        if (cash_begin_time > listing_time) {
          return checkTime(true, t('detail.index.5ukesg2ll0k0'));
        }
        if (cash_begin_time > grey_begin_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2ll8k0'));
        }
        if (cash_begin_time > grey_end_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2llck0'));
        }
      }
    break;
    case 'cash_end_time':
      if (isCashDataName) {
        if (cash_end_time < cash_begin_time) {
          return checkTime(true, t('detail.index.5ukesg2llgc0'));
        }
        if (cash_end_time > publish_time) {
          return checkTime(true, t('detail.index.5ukesg2lkwk0'));
        }
        if (cash_end_time > listing_time) {
          return checkTime(true, t('detail.index.5ukesg2ll0k0'));
        }
        if (cash_end_time > grey_begin_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2ll8k0'));
        }
        if (cash_end_time > grey_end_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2llck0'));
        }
      }
    break;
    case 'publish_time':
      if (isCashDataName) {
        if (publish_time < cash_begin_time) {
          return checkTime(true, t('detail.index.5ukesg2llgc0'));
        }
        if (publish_time < cash_end_time) {
          return checkTime(true, t('detail.index.5ukesg2llkg0'));
        }
        if (publish_time > listing_time) {
          return checkTime(true, t('detail.index.5ukesg2ll0k0'));
        }
        if (publish_time > grey_begin_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2ll8k0'));
        }
        if (publish_time > grey_end_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2llck0'));
        }
      }
    break;
    case 'listing_time':
      if (isCashDataName) {
        if (listing_time < cash_begin_time) {
          return checkTime(true, t('detail.index.5ukesg2llgc0'));
        }
        if (listing_time < cash_end_time) {
          return checkTime(true, t('detail.index.5ukesg2llkg0'));
        }
        if (listing_time < publish_time) {
          return checkTime(true, t('detail.index.5ukesg2lloo0'));
        }
        if (listing_time < grey_begin_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2lnqs0'));
        }
        if (listing_time < grey_end_time && isSupportGrey) {
          return checkTime(true, t('detail.index.5ukesg2lnxw0'));
        }
      }
    break;
    case 'grey_begin_time':
      if (isCashDataName && isSupportGrey) {
        if (grey_begin_time < cash_begin_time) {
          return { msg: t('detail.index.5ukesg2llgc0'), whethernot: true };
        }
        if (grey_begin_time < cash_end_time) {
          return { msg: t('detail.index.5ukesg2llkg0'), whethernot: true };
        }
        if (grey_begin_time > listing_time) {
          return { msg: t('detail.index.5ukesg2ll0k0'), whethernot: true };
        }
        if (grey_begin_time < publish_time) {
          return { msg: t('detail.index.5ukesg2lloo0'), whethernot: true };
        }
        if (grey_begin_time > grey_end_time && isSupportGrey) {
          return { msg: t('detail.index.5ukesg2llck0'), whethernot: true };
        }
      }
    break;
    case 'grey_end_time':
      if (isCashDataName && isSupportGrey) {
          if (grey_end_time < cash_begin_time) {
            return { msg: t('detail.index.5ukesg2llgc0'), whethernot: true };
          }
          if (grey_end_time < cash_end_time) {
            return { msg: t('detail.index.5ukesg2llkg0'), whethernot: true };
          }
          if (grey_end_time > listing_time) {
            return { msg: t('detail.index.5ukesg2ll0k0'), whethernot: true };
          }
          if (grey_end_time < publish_time) {
            return { msg: t('detail.index.5ukesg2lloo0'), whethernot: true };
          }
          if (grey_end_time < grey_end_time && isSupportGrey) {
            return { msg: t('detail.index.5ukesg2lnqs0'), whethernot: true };
          }
      }
    break;
  }
};
const changeDatePicker = (value: any, name: any) => {
  if (!value) {
    return;
  }
  dataName.value = name
};
const Validator1 = (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let beginTime:any = TimeVal('cash_begin_time')
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const Validator2 = (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let beginTime:any = TimeVal('cash_end_time')
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const Validator3 = (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let beginTime:any = TimeVal('publish_time')
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const Validator4 = async (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let beginTime:any = await TimeVal('listing_time')
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const Validator5 = (value:any,callback:any) =>{
  if (!value) {
    return;
  }

  let beginTime:any = TimeVal('grey_begin_time')
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const Validator6 = (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let beginTime:any = TimeVal('grey_end_time')
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const formRules = ref({
  "name.zh-CN": [{ required: true, message: "请输入新股名称 (中)" }],
  "name.tc": [{ required: true, message: "请输入新股名称 (繁)" }],
  "name.en": [{ required: true, message: "请输入新股名称 (英)" }],
  lot_size: [{ required: true, message: t('detail.index.5ukesg2l94s0') }],
  min_price: [{ required: true, message: t('detail.index.5ukesg2l9es0') }],
  max_price: [{ required: true, message: t('detail.index.5ukesg2l9y40') }],
  min_amount: [{ required: true, message: t('detail.index.5ukesg2la800') }],
  cash_begin_time: [{ required: true, message: t('detail.index.5ukesg2lcnc0')},{validator:Validator1}],
  cash_end_time: [{ required: true, message: t('detail.index.5ukesg2lcro0') },{validator:Validator2}],
  publish_time: [{ required: true, message: t('detail.index.5ukesg2lea40') },{validator:Validator3}],
  listing_time: [{ required: true, message: t('detail.index.5ukesg2lf4g0') },{validator:Validator4}],
  grey_begin_time: [{ required: true, message: t('detail.index.5ukesg2lgx00') },{validator:Validator5}],
  grey_end_time: [{ required: true, message: t('detail.index.5ukesg2lh580') },{validator:Validator6}],
});
const watchData = watch(
  () => props.form,
  (newval: any) => {
    form.value = newval;
    emit("update:form", form.value);
  },
  {
    deep: true,
  }
);
onBeforeUnmount(() => {
  watchData && watchData();
});
</script>

<style lang="less" scoped>
:deep(
    .arco-picker-disabled input[disabled],
    .arco-picker-disabled:hover input[disabled]
  ) {
  -webkit-text-fill-color: var(--color-text-1);
}
:deep(.arco-radio-disabled .arco-radio-label) {
  -webkit-text-fill-color: var(--color-text-1);
}
</style>
