<template>
  <div v-if="JSON.stringify(from) != '{}' && $permission(['statisticsFinanceInfo'])">
    <a-grid :cols="24" :row-gap="16" class="panel">
      <a-grid-item class="title" :span="24">
        <a-col>
          <a-col :span="24">
            <a-typography-title style="margin-top: 0;font-size: 14px;display: flex; align-items: center;" class='typographyTitle'>
              <span>{{ $t('TRScomponents.financingSituation.5uli3qkw7cg0') }}</span>
              <a-link style="margin-left: 10px;"><span style="margin-right: 5px;">{{ $t('TRScomponents.financingSituation.5uli3qkw7zg0') }}</span>{{ currency == 'HKD' ? $t('TRScomponents.financingSituation.5uli3qkw82s0') : currency == 'USD' ? $t('TRScomponents.financingSituation.5uli3qkw87k0') :
                currency ==
                  'CNY' ? $t('TRScomponents.financingSituation.5uli3qkw8ic0') : '' }}</a-link>
              <a-select @change="selectChange" v-model="currency" style="width: 80px;margin-left: 10px;"
                :placeholder="$t('TRScomponents.financingSituation.5uli3qkw8lc0')">
                <a-option v-for="item in useEnums('currency')" :value="item.value">{{
                  item.trans[local.lang] }}</a-option>
              </a-select>
            </a-typography-title>
          </a-col>
          <a-divider class="panel-border" />
        </a-col>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <!-- <img alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image" /> -->
            <img src="@/assets/img/ensure.png" :alt="$t('TRScomponents.financingSituation.5uli3qkw8o40')">
          </a-avatar>
          <a-statistic :title="$t('TRScomponents.financingSituation.5uli3qkw8o40')" :value="from.use_status_normal_total_cash" :precision="2" :value-from="0"
            animation show-group-separator>
            <template #suffix>
              <span class="unit">{{ $t('TRScomponents.financingSituation.5uli3qkw8qc0') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <!-- <img alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image" /> -->
            <img src="@/assets/img/financing.png" :alt="$t('TRScomponents.financingSituation.5uli3qkw8so0')">
          </a-avatar>
          <a-statistic :title="$t('TRScomponents.financingSituation.5uli3qkw8so0')" :precision="2" :value="from.use_status_normal_total_finance" :value-from="0" animation
            show-group-separator>
            <template #suffix>
              <span class="unit">{{ $t('TRScomponents.financingSituation.5uli3qkw8qc0') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <!-- <img alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image" /> -->
            <img src="@/assets/img/ensure.png" :alt="$t('TRScomponents.financingSituation.5uli3qkw8v80')">
          </a-avatar>
          <a-statistic :title="$t('TRScomponents.financingSituation.5uli3qkw8v80')" :precision="2" :value="from.no_settlement_total_cash" :value-from="0" animation
            show-group-separator>
            <template #suffix>
              <span class="unit">{{ $t('TRScomponents.financingSituation.5uli3qkw8qc0') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item class="panel-col" :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        style="border-right: none">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <!-- <img alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image" /> -->
            <img src="@/assets/img/financing.png" :alt="$t('TRScomponents.financingSituation.5uli3qkw8xo0')">
          </a-avatar>
          <a-statistic style='width: 80%' :title="$t('TRScomponents.financingSituation.5uli3qkw8xo0')" :precision="2" :value="from.no_settlement_total_finance" :value-from="0" animation
            show-group-separator>
            <template #suffix>
              <span class="unit">{{ $t('TRScomponents.financingSituation.5uli3qkw8qc0') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item :span="24">
        <a-divider class="panel-border" />
      </a-grid-item>
    </a-grid>
  </div>
  <div v-else>
    <a-grid :cols="24" :row-gap="16" class="panel"
      style="width: 100%;display: flex;justify-content: center;align-items: center;font-size: 17px;" :style='local.lang == "en"? "height: 176px":"height: 154px"'>
      <div>
        {{ !$permission(['statisticsFinanceInfo'])? $t('TRScomponents.financingSituation.5um34jdjt8o0'): $t('TRScomponents.financingSituation.5um34jdjtxs0') }}
      </div>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
import { useEnums } from '@/hooks/enums'
const local = useLocal()
const from: any = ref({})
const currency = ref(useEnums('currency')?.[0].value)
const selectChange = (val: any) => {
  if (!val) {
    return
  }
  getData()
}
const getData = async () => {  //统计账户情况
  const { code, data } = await apiTrs.statisticsFinanceInfo({
    ...useFilter({ currency: currency.value }),
  })
  if (code != 1) return;
  from.value = data
}
nextTick(()=>{
  usePermission(['statisticsFinanceInfo']) && getData()
})
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  background-color: var(--color-bg-2);
  border-radius: 4px 4px 0 0;
  font-size: 14px;

  .titleSpan {
    border-width: 0px;
    padding: 3px;
    margin-left: 10px;
    background: inherit;
    background-color: rgba(33, 116, 243, 0.156862745098039);
    border: none;
    border-radius: 2px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #2174F3;
    text-align: center;
    line-height: 20px;
  }
}
.typographyTitle{
  display: flex;
  align-items: center;
  height: 50px;
  margin-left: 20px;
  margin-bottom:0px;
}
:deep(.arco-icon-home) {
  margin-right: 6px;
}

.arco-grid.panel {
  margin-bottom: 0;
}

.panel-col {
  padding-left: 30px;
  padding-right: 30px;
  border-right: 1px solid rgb(var(--gray-2));
}

.col-avatar {
  margin-right: 5px;
  background-color: var(--color-fill-2);
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
  margin: 0px 0 0 0;
}

:deep(.arco-select-view-single) {
  background-color: var(--color-fill-0);
}</style>
