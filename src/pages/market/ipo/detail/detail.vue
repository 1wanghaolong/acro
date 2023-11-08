<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <a-page-header
        @back="router.back()"
        :subtitle="$t(`router.${String(route.name)}`)"
      />
      <div
        style="
          display: flex;
          flex-direction: column;
          overflow: auto;
          padding-bottom: 10px;
        "
      >
        <div class="title">
          <a-space :size="18" style="padding-left: 10px">
            <!-- {{ "详情" }} -->
          </a-space>
          <div v-if="$permission(['marketIPOSymbolEdit'])">
            <a-space :size="18">
              <a-button
                v-if="form.setup"
                @click="
                  form.setup = false;
                  getData();
                "
              >
                <template #icon>
                  <icon-refresh />
                </template>
                {{$t('detail.detail.5ukepgf37pw0')}}
              </a-button>
              <a-button
                v-if="form.setup"
                @click="submit"
                type="primary"
                :loading="form.loading"
              >
                <template #icon>
                  <icon-save />
                </template>
                {{$t('detail.detail.5ukepgf39ww0')}}
              </a-button>
              <a-button
                v-if="!form.setup"
                @click="form.setup = true"
                type="primary"
              >
                <template #icon>
                  <icon-edit />
                </template>
                {{$t('detail.detail.5ukepgf3a6s0')}}
              </a-button>
            </a-space>
          </div>
        </div>
        <a-menu
          mode="horizontal"
          :selected-keys="keys"
          @menu-item-click="changeRouter($event)"
        >
          <a-menu-item key="1">{{$t('detail.detail.5ukepgf3afg0')}}</a-menu-item>
          <a-menu-item key="2">{{$t('detail.detail.5ukepgf3ajw0')}}</a-menu-item>
          <a-menu-item key="3">{{$t('detail.detail.5ukepgf3aos0')}}</a-menu-item>
        </a-menu>
        <div
          style="flex: 1; overflow: auto; padding-top: 10px"
          v-if="keys.includes('1')"
        >
          <index-info v-model:form="form" ref="refIndexInfo"></index-info>
        </div>
        <div
          style="flex: 1; overflow: auto; padding-top: 10px"
          v-if="keys.includes('2')"
        >
          <gear-position v-model:form="form"></gear-position>
        </div>
        <div
          style="flex: 1; overflow: auto; padding-top: 10px"
          v-if="keys.includes('3')"
        >
          <financing-info v-model:form="form"  ref="refIndexInfo"></financing-info>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat } from "@/hooks/enums";
import indexInfo from "./index.vue";
import gearPosition from "./gearPosition.vue";
import financingInfo from "./financingInfo.vue";
const keys = ref(["1"]);
const router = useRouter();
const route = useRoute();
const refIndexInfo = ref();
const form: any = ref({
  show: false,
  loading: false,
  setup: false,
  data: {
    securityTypeName: "",
    name: { "zh-CN": "", tc: "", en: "" },
  }
});
const changeRouter = (val: any) => {
  if (!val) {
    return;
  }
  keys.value = [val];
  getData();
};
const submit = async () => {
  const validate = await refIndexInfo.value.$refs.formRef?.validate();
  if (validate) return;
  form.value.loading = true;
  let {
    name,
    lot_size,
    min_price,
    max_price,
    min_amount,
    total_quantity,
    publish_quantity,
    prospectus_link,
    sponsor,
    company_profile,
    cash_begin_time,
    cash_end_time,
    publish_time,
    is_support_grey,
    listing_time,
    grey_begin_time,
    grey_end_time,
    success_rate,
    booking_ratio,
    first_gain,
    first_close,
    issue_price,
    finance_begin_time,
    finance_end_time,
  } = form.value.data;
  let parms = {
    IPOId: route.params?.id,
    data: {
      name,
      lot_size,
      min_price,
      max_price,
      min_amount,
      total_quantity,
      publish_quantity,
      prospectus_link,
      sponsor,
      company_profile,
      cash_begin_time,
      cash_end_time,
      publish_time,
      is_support_grey,
      listing_time,
      grey_begin_time,
      grey_end_time,
      success_rate: "" + success_rate,
      booking_ratio,
      first_gain: "" + first_gain,
      first_close,
      issue_price,
      finance_begin_time,
      finance_end_time,
    },
  };
  const { code } = await apiCms.cmsIpoUpdate(parms);
  form.value.loading = false;
  if (code != 1) return;
  form.value.setup = false;
  getData();
};
const getData = async () => {
  form.value.loading = true;
  const { code, data } = await apiCms.cmsIpoDetail({
    IPOId: route.params?.id,
  });
  form.value.loading = false;
  if (code != 1) return;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (typeof data[key] == "number") {
        data[key] = "" + data[key];
      }
      if (key == "market_value" && data[key].indexOf("-")) {
        let list = data[key].split("-");
        let val1 = list[0] ? Number(list[0]) / 100000000 : 0;
        let val2 = list[1] ? Number(list[1]) / 100000000 : 0;
        data[key] = val1 && val2 ? `${val1}亿-${val2}亿` : `${val1}-${val2}`;
      }
    }
  }
  form.value.data = data;
  form.value.data.securityTypeName = useEnumsFormat(
    "market.security_type",
    data.security_type
  );
};
{
  usePermission(["marketIPOSymbolDetail"]) && getData();
}
onMounted(() => {
  if (route.query?.setup) {
    form.value.setup = true;
  }
});
</script>
<style lang="less" scoped>
:deep(.arco-select-view-disabled) {
  color: var(--color-text-1);
  background-color: var(--color-fill-2);
}

:deep(.arco-textarea[disabled]) {
  -webkit-text-fill-color: var(--color-text-1);
}

:deep(.arco-input-wrapper.arco-input-disabled) {
  color: var(--color-text-1);
  background-color: var(--color-fill-2);
}

:deep(.arco-input-wrapper .arco-input[disabled]) {
  -webkit-text-fill-color: var(--color-text-1);
}
.title {
  width: 100%;
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-between;
}
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: 14px 0px;
}
:deep(.arco-menu-horizontal .arco-menu-pop-header) {
  padding: 0px;
}
:deep(.arco-menu-horizontal .arco-menu-item:not(:first-child)) {
  margin: 0px;
}
</style>
