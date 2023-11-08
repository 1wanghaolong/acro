<template>
  <div
    v-if="$permission(['cmsAgentAccountSummary']) && JSON.stringify(from.info) != '{}'"
  >
    <a-card class="general-card">
      <a-spin style="width: 100%">
        <div
          class="panel-col"
          style="margin-bottom: 10px; font-size: 1rem"
          :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        >
          {{ $t('components.finance.5um395762j00') }}
        </div>
        <a-grid :loading="loading" :cols="24" :row-gap="16" class="panel">
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/member.png" :alt="$t('components.finance.5um3957637o0')" />
              </a-avatar>
              <a-statistic
                :title="$t('components.finance.5um3957637o0')"
                :value="from.info.wait_withdraw_num"
                :value-from="0"
                animation
                show-group-separator
              >
                <template #suffix>
                  <span class="unit">{{ $t('components.finance.5um395763eg0') }}</span>
                </template>
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/moon.png" :alt="$t('components.finance.5um395763jc0')" />
              </a-avatar>
              <a-statistic
                :title="$t('components.finance.5um395763jc0')"
                :value="from.info.moneyHKD"
                :value-from="0"
                :precision="2"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                  <span class="unit">{{ $t('components.finance.5um395763eg0') }}</span>
                </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/moon.png" :alt="$t('components.finance.5um395763o00')" />
              </a-avatar>
              <a-statistic
                :title="$t('components.finance.5um395763o00')"
                :value="from.info.moneyUSD"
                :value-from="0"
                :precision="2"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                  <span class="unit">{{ $t('components.finance.5um395763eg0') }}</span>
                </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
            style="border-right: none"
          >
            <a-space>
              <a-avatar :size="40" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/moon.png" :alt="$t('components.finance.5um395763ss0')" />
              </a-avatar>
              <a-statistic
                :title="$t('components.finance.5um395763ss0')"
                :value="from.info.moneyCNY"
                :value-from="0"
                :precision="2"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                  <span class="unit">{{ $t('components.finance.5um395763eg0') }}</span>
                </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
        </a-grid>
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 119px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-bottom: 1px solid rgb(var(--gray-2));
      "
    >
      {{ !$permission(["cmsAgentAccountSummary"]) ? $t('components.finance.5um395763ws0') : $t('components.finance.5um3957640w0') }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const loading = ref(false);
const from: any = reactive({
  info: {
    // wait_withdraw_num:0,
    // moneyHKD:0,
    // moneyUSD:0,
    // moneyCNY:0,
  },
});
const fetchData = async () => {
  loading.value = true;
  const { code, data } = await apiCms.cmsAgentAccountSummary();
  loading.value = false;
  if (code != 1) return;
  from.info.wait_withdraw_num = data.wait_withdraw_num
  if (data.this_month_clear_money.length) {
    data.this_month_clear_money.forEach((item:any)=>{
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (key == 'HKD') {
            from.info.moneyHKD = item[key]
          }
          if (key == 'USD') {
            from.info.moneyUSD = item[key]
          }
          if (key == 'CNY') {
            from.info.moneyCNY = item[key]
          }   
        }
      }
    })
  }
};
nextTick(() => {
  usePermission(["cmsAgentAccountSummary"]) && fetchData();
});
</script>

<style scoped lang="less">
.panel {
  margin-bottom: 0;
  padding: 3px 0px;
}

.panel-col {
  padding-left: 43px;
  border-right: 1px solid rgb(var(--gray-2));
}
.col-avatar {
  margin-right: 12px;
  background-color: var(--color-bg-1);
}

.up-icon {
  color: rgb(var(--red-6));
}

.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}

:deep(.panel-border) {
  margin: 4px 0 0 0;
}

:deep(.arco-select-view-single) {
  background-color: var(--color-fill-0);
}
:deep(.arco-card-size-medium .arco-card-header) {
  height: 50px;
  padding: 0px 0px 0px;
}
.title {
  display: flex;
  width: 200px;
  align-items: center;
}
.typographyTitle {
  display: flex;
  align-items: center;
  height: 51px;
  margin-left: 20px;
  margin-bottom: 0px;
}
:deep(.arco-card-size-medium .arco-card-body) {
  padding: 16px 0px;
}
:deep(.arco-card-bordered) {
  border: 0px;
}
:deep(.arco-statistic) {
  display: flex;
  flex-direction: column;
}
:deep(.arco-statistic-content .arco-statistic-value) {
  font-size: 20px;
}
:deep(.arco-statistic-title) {
  margin-bottom: 0px;
  cursor: pointer;
}
.rate {
  :deep(.arco-statistic-title) {
    color: var(--color-neutral-4);
  }
  :deep(.arco-statistic-content .arco-statistic-value) {
    font-size: 14px;
    color: var(--color-neutral-6);
  }
}
</style>
