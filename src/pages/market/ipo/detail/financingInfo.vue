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
            <a-form-item field="name.zh-CN" :label="$t('detail.financingInfo.5ukeqpvc4gs0')">
              <a-input
                :disabled="true"
                v-model="form.data.name['zh-CN']"
                :placeholder="$t('detail.financingInfo.5ukerfnikm00')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.tc" :label="$t('detail.financingInfo.5ukerfnis4w0')">
              <a-input
                :disabled="true"
                v-model="form.data.name['tc']"
                :placeholder="$t('detail.financingInfo.5ukerfnit6c0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.en" :label="$t('detail.financingInfo.5ukerfniw3o0')">
              <a-input
                :disabled="true"
                v-model="form.data.name['en']"
                :placeholder="$t('detail.financingInfo.5ukerfnixlw0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="lot_size" :label="$t('detail.financingInfo.5ukepm4okkw0')">
              <a-input
                :disabled="true"
                v-model="form.data.lot_size"
                :placeholder="$t('detail.financingInfo.5ukepm4olao0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="currency" :label="$t('detail.financingInfo.5ukepm4ole80')">
              <a-input
                v-model="form.data.currency"
                disabled
                :placeholder="$t('detail.financingInfo.5ukepm4olgw0')"
              />
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col :xs="24" :sm="12" :md="12" :xl="8">
            <div style="display: flex">
              <div style="display: flex">
                <a-form-item field="is_support_finance" :label="$t('detail.financingInfo.5ukepm4olj40')">
                  <a-radio-group
                    :disabled="true"
                    v-model="form.data.is_support_finance"
                    :options="options"
                  >
                  </a-radio-group>
                </a-form-item>
              </div>
            </div>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_finance == '1'"
          >
            <a-form-item field="finance_begin_time" :label="$t('detail.financingInfo.5ukepm4ollg0')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.finance_begin_time"
                @change="changeDatePicker($event, 'finance_begin_time')"
                :placeholder="$t('detail.financingInfo.5ukepm4ollg0')"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_finance == '1'"
          >
            <a-form-item field="finance_end_time" :label="$t('detail.financingInfo.5ukepm4olns0')">
              <a-date-picker
                style="width: 100%"
                :disabled="!form.setup"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                v-model="form.data.finance_end_time"
                :disabledDate="(current) => dayjs(current).isBefore(dayjs(form.data.finance_begin_time))"
                @change="changeDatePicker($event, 'finance_end_time')"
                :placeholder="$t('detail.financingInfo.5ukepm4olns0')"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_finance == '1'"
          >
            <a-form-item field="finance_fare" :label="$t('detail.financingInfo.5ukepm4olps0')">
              <a-input
                :disabled="true"
                v-model="form.data.finance_fare"
                :placeholder="$t('detail.financingInfo.5ukepm4oltk0')"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_finance == '1'"
          >
            <a-form-item field="finance_interest_day" :label="$t('detail.financingInfo.5ukepm4olvk0')">
              <a-input
                :disabled="true"
                v-model="form.data.finance_interest_day"
                :placeholder="$t('detail.financingInfo.5ukepm4olxs0')"
              />
            </a-form-item>
          </a-col>
          <a-col
            :xs="24"
            :sm="12"
            :md="8"
            :xl="8"
            v-if="form.data.is_support_finance == '1'"
          >
            <a-form-item field="finance_interest_ratio" :label="$t('detail.financingInfo.5ukepm4om000')">
              <a-input
                :disabled="true"
                v-model="form.data.finance_interest_ratio"
                :placeholder="$t('detail.financingInfo.5ukepm4om2s0')"
              />
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col
            :xs="24"
            :sm="12"
            :md="12"
            :xl="12"
            v-if="form.data.is_support_finance == '1'"
          >
            <div style="display: flex">
              <div style="width: 250px">{{ $t('detail.financingInfo.5ukepm4om5g0') }}</div>
              <div style="display: flex">
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    padding-right: 20px;
                  "
                >
                  <span>{{ $t('detail.financingInfo.5ukepm4om7o0') }}</span>
                  <div class="gearInput">
                    <a-input
                      v-for="item in form.data.finance_ratio"
                      v-model="item.ratio"
                      disabled
                      :placeholder="$t('detail.financingInfo.5ukepm4om7o0')"
                    />
                  </div>
                </div>
                <div style="display: flex; flex-direction: column">
                  <span>{{ $t('detail.financingInfo.5ukepm4om9w0') }}</span>
                  <div class="gearInput">
                    <a-input
                      v-for="item in form.data.finance_ratio"
                      v-model="item.multiple"
                      disabled
                      :placeholder="$t('detail.financingInfo.5ukepm4om9w0')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// import { useEnums } from "@/hooks/enums";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
// const local = useLocal();
// const route = useRoute();
const props = defineProps({
  form: Object,
});
const dataName = ref('')
const emit = defineEmits(["update:form"]);
const options = ref([
  { label: t('detail.financingInfo.5ukepm4omc00'), value: "0" },
  { label: t('detail.financingInfo.5ukepm4omeg0'), value: "1" },
]);
const formRef:any = ref()
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
  const publish_time = getValueInSeconds('publish_time');
  const cash_begin_time = getValueInSeconds('cash_begin_time');
  const finance_begin_time = getValueInSeconds('finance_begin_time');
  const finance_end_time = getValueInSeconds('finance_end_time');

  const isCashDataName = ['finance_begin_time','finance_end_time'].includes(name);
  // const isSupportGrey = form.value?.data.is_support_grey === '1';
  const checkTime = (value:any, msg:any) => {
    if (value) {
      return { msg, whethernot: true };
    }
    return { whethernot: false };
  };
  switch (name) {
    case 'finance_begin_time':
      if (isCashDataName) {
        if (finance_begin_time > finance_end_time) {
          return checkTime(true, t('detail.financingInfo.5ukepm4omgg0'));
        }
        if (finance_begin_time < cash_begin_time) {
          return checkTime(true, t('detail.financingInfo.5ukepm4omio0'));
        }
      }
    break;
    case 'finance_end_time':
      if (isCashDataName) {
        if (finance_end_time < finance_begin_time) {
          return checkTime(true, t('detail.financingInfo.5ukepm4omlg0'));
        }
        if (finance_end_time > publish_time) {
          return checkTime(true, t('detail.financingInfo.5ukepm4omn40'));
        }
      }
    break;
  }
};
const Validator1 = (value:any,callback:any) =>{
  if (!value) {
    return;
  }
  let beginTime:any = TimeVal("finance_begin_time")
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
  let beginTime:any = TimeVal("finance_end_time")
  if (beginTime?.whethernot) {
    callback(beginTime.msg)
    return
  }
  formRef.value.clearValidate()
  return true
}
const formRules = ref({
  finance_begin_time: [{ required: true, message: t('detail.financingInfo.5ukepm4ollg0') },{validator:Validator1}],
  finance_end_time: [{ required: true, message: t('detail.financingInfo.5ukepm4olns0') },{validator:Validator2}],
});
const changeDatePicker = (value: any, name: any) => {
  if (!value) {
    return;
  }
  dataName.value = name
};
const watchData = watch(
  () => props.form,
  (newval: any) => {
    form.value = newval;
    if (typeof newval.data.finance_ratio == "string") {
      form.value.data.finance_ratio = JSON.parse(newval.data.finance_ratio);
    }
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
.gearInput {
  :deep(.arco-input-wrapper) {
    margin: 10px 0;
  }
  :deep(.arco-input-wrapper:last-child) {
    margin: 0px 0;
  }
}
:deep(.arco-picker-disabled input[disabled]) {
  -webkit-text-fill-color: var(--color-text-1);
}
:deep(.arco-radio-disabled .arco-radio-label){
  -webkit-text-fill-color: var(--color-text-1);
}
</style>
