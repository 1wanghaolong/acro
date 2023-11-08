<template>
  <div v-if="JSON.stringify(from) != '{}' && $permission(['statisticsAccountInfo'])">
    <a-grid :cols="24" :row-gap="16" class="panel">
        <a-grid-item
          class="panel-col"
          :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        >
          <a-space>
            <a-avatar :size="54" class="col-avatar">
              <!-- <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
              /> -->
              <img src="@/assets/img/Pending.png" :alt="$t('TRScomponents.data-panel.5ulhj6zis340')">
            </a-avatar>
            <a-statistic
              :title="$t('TRScomponents.data-panel.5ulhj6zis340')"
              :value="from.trs_account_apply_count"
              :precision="0"
              :value-from="0"
              animation
              show-group-separator
            >
              <template #suffix>
                <span class="unit">{{ $t('TRScomponents.data-panel.5ulhj6zisj40') }}</span>
              </template>
              <template #title>
                <div style="cursor: pointer;display: flex;align-items: center;">
                  <span>{{$t('TRScomponents.data-panel.5ulhj6zis340')}}</span>
                  <img src="@/assets/svg/tz.svg" v-if="$permission(['trsAccountApplyList'])" @click="router.push({name:'trsAccountApply',query:{'status':0}})" :alt="$t('TRScomponents.data-panel.5ulhj6zis340')" style="width: 16px;height: 16px;margin-left:5px;">
                </div>
              </template>
            </a-statistic>
          </a-space>
        </a-grid-item>
        <a-grid-item
          class="panel-col"
          :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        >
          <a-space>
            <a-avatar :size="54" class="col-avatar">
              <!-- <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
              /> -->
              <img src="@/assets/img/settled.png" :alt="$t('TRScomponents.data-panel.5ulhj6zism00')">
            </a-avatar>
            <a-statistic
              :title="$t('TRScomponents.data-panel.5ulhj6zism00')"
              :value="from.trs_account_settlement_count"
              :value-from="0"
              animation
              show-group-separator
            >
              <template #suffix>
                <span class="unit">{{ $t('TRScomponents.data-panel.5ulhj6zisj40') }}</span>
              </template>
              <template #title>
                <div style="cursor: pointer;display: flex;align-items: center;">
                  <span>{{$t('TRScomponents.data-panel.5ulhj6zism00')}}</span>
                  <img src="@/assets/svg/tz.svg" v-if="$permission(['trsSettlementContractList'])" @click="router.push({name:'trsSettlementContract',query:{'settlement_status':1}})" :alt="$t('TRScomponents.data-panel.5ulhj6zism00')" style="width: 16px;height: 16px;margin-left:5px;">
                </div>
              </template>
            </a-statistic>
          </a-space>
        </a-grid-item>
        <a-grid-item
          class="panel-col"
          :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        >
          <a-space>
            <a-avatar :size="54" class="col-avatar">
              <!-- <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
              /> -->
              <img src="@/assets/img/Risk.png" :alt="$t('TRScomponents.data-panel.5ulhj6zisrk0')">
            </a-avatar>
            <a-statistic
              :title="$t('TRScomponents.data-panel.5ulhj6zisrk0')"
              :value="from.trs_account_risk_count"
              :value-from="0"
              animation
              show-group-separator
            >
              <template #suffix>
                <span class="unit">{{ $t('TRScomponents.data-panel.5ulhj6zisj40') }}</span>
              </template>
              <template #title>
                <div style="cursor: pointer;display: flex;align-items: center;">
                  <span>{{$t('TRScomponents.data-panel.5ulhj6zisrk0')}}</span>
                  <img src="@/assets/svg/tz.svg" @click="router.push({name:'trsRiskControlStatus',query:{'risk_control_status':2}})"  v-if="$permission(['trsRiskControlStatusList'])" :alt="$t('TRScomponents.data-panel.5ulhj6zisrk0')" style="width: 16px;height: 16px;margin-left:5px;">
                </div>
              </template>
            </a-statistic>
          </a-space>
        </a-grid-item>
        <a-grid-item
          class="panel-col"
          :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          style="border-right: none"
        >
          <a-space>
            <a-avatar :size="54" class="col-avatar">
              <!-- <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image"
              /> -->
              <img src="@/assets/img/Riskevents.png" :alt="$t('TRScomponents.data-panel.5ulhj6zistw0')">
            </a-avatar>
            <a-statistic
              :title="$t('TRScomponents.data-panel.5ulhj6zistw0')"
              :value="from.today_total_risk_count"
              :precision="0"
              :value-from="0"
              animation
            >
              <template #suffix>
                <span class="unit">{{ $t('TRScomponents.data-panel.5ulhj6zisj40') }}</span>
              </template>
              <template #title>
                <div style="cursor: pointer;display: flex;align-items: center;">
                  <span>{{$t('TRScomponents.data-panel.5ulhj6zistw0')}}</span>
                  <img src="@/assets/svg/tz.svg" v-if="$permission(['trsRiskControlRecordList'])" @click="router.push({name:'trsRiskControlRecord',query:{'time':1}})" :alt="$t('TRScomponents.data-panel.5ulhj6zistw0')" style="width: 16px;height: 16px;margin-left:5px;">
                </div>
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
    <a-grid :cols="24" :row-gap="16" class="panel" style="width: 100%;height: 107px;display: flex;justify-content: center;align-items: center;font-size: 17px;">
        <div>
            {{ !$permission(['statisticsAccountInfo'])? $t('TRScomponents.data-panel.5um33y7ku1w0') : $t('TRScomponents.data-panel.5um33y7kur80') }}
        </div>
    </a-grid>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';

const from:any = ref({})
const getData = async () =>{  //统计账户情况
  const { code, data } = await apiTrs.statisticsAccountInfo()
  if(code != 1) return;
  from.value = data
}
nextTick(()=>{
  usePermission(['statisticsAccountInfo']) && getData()
})
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 0px 0 0px;
  }
  .panel-col {
    padding-left: 30px;
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
    margin: 4px 0 0 0;
  }
</style>
