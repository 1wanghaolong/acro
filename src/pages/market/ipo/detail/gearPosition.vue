<template>
  <div>
    <a-card :loading="form.loading">
      <a-form
        ref="formRef"
        :model="form.data"
        :rules="(form.rules as any)"
        auto-label-width
        layout="vertical"
      >
        <a-row :gutter="18">
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.zh-CN" :label="$t('detail.gearPosition.5ukes2zlqdk0')">
              <a-input
                :disabled="true"
                v-model="form.data.name['zh-CN']"
                :placeholder="$t('detail.gearPosition.5ukes2zltqg0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.tc" :label="$t('detail.gearPosition.5ukes2zlu780')">
              <a-input
                :disabled="true"
                v-model="form.data.name['tc']"
                :placeholder="$t('detail.gearPosition.5ukes2zlug40')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="name.en" :label="$t('detail.gearPosition.5ukes2zlumo0')">
              <a-input
                :disabled="true"
                v-model="form.data.name['en']"
                :placeholder="$t('detail.gearPosition.5ukes2zlvto0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="lot_size" :label="$t('detail.gearPosition.5ukes2zlvzk0')">
              <a-input
                :disabled="true"
                v-model="form.data.lot_size"
                :placeholder="$t('detail.gearPosition.5ukes2zlxwc0')"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="8">
            <a-form-item field="currency" :label="$t('detail.gearPosition.5ukes2zm11o0')">
              <a-input
                v-model="form.data.currency"
                disabled
                :placeholder="$t('detail.gearPosition.5ukes2zm2j40')"
              />
            </a-form-item>
          </a-col>
          <a-divider />
          <a-col :xs="24" :sm="12" :md="12" :xl="12">
              <div style='display: flex;'>
                <div style='width:250px'>{{$t('detail.gearPosition.5ukes2zm3b00')}}</div>
                <div style='display: flex;'>
                  <div style='display: flex;flex-direction: column;padding-right:20px'>
                     <span>{{ $t('detail.gearPosition.5ukes2zm3yo0') }}</span>
                     <div class='gearInput'>
                      <a-input
                        v-for='item in form.data.price_gear'
                        v-model="item.qty"
                        disabled
                        :placeholder="$t('detail.gearPosition.5ukes2zm3yo0')"
                      />
                     </div>
                  </div>
                  <div style='display: flex;flex-direction: column;'>
                     <span>{{ $t('detail.gearPosition.5ukes2zm4hk0') }}</span>
                     <div class='gearInput'>
                      <a-input
                        v-for='item in form.data.price_gear'
                        v-model="item.amount"
                        disabled
                        :placeholder="$t('detail.gearPosition.5ukes2zm4hk0')"
                      />
                     </div>
                  </div>
                </div>
              </div>
          </a-col>
          <a-divider />
          <a-col :xs="24" :sm="24" :md="24" :xl="24">
            <div>
              {{ $t('detail.gearPosition.5ukes2zm5ec0') }}
            </div>
            <div>
              {{ "· " }}{{ $t('detail.gearPosition.5ukes2zm8800') }}
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  form: Object,
});
const emit = defineEmits(["update:form"]);
const form: any = ref({
  show: false,
  loading: false,
  setup: false,
  data: {
    name: { "zh-CN": "", tc: "", en: "" },
  },
  rules: {
    real_name: [{ required: true, message: t('detail.gearPosition.5ukes2zm8rw0') }],
    english_name: [{ required: true, message: t('detail.gearPosition.5ukes2zm97o0') }],
    email: [
      { required: true, message: t('detail.gearPosition.5ukes2zm9is0') },
      { type: "email", message: t('detail.gearPosition.5ukes2zm9u80') },
    ],
  },
});
const watchData = watch(
  () => props.form,
  (newval:any) => {
    form.value = newval;
    if ( typeof newval.data.price_gear == 'string') {
      form.value.data.price_gear=JSON.parse(newval.data.price_gear)
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
.gearInput{
  :deep(.arco-input-wrapper){
    margin:10px 0;
  }
  :deep(.arco-input-wrapper:last-Child){
    margin:0px 0;
  }
}
</style>
