<template>
  <a-card
    class="general-card"
    :title="$t('TRScomponents.quick-operation.5uli3zk4nr40')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '20px 20px 0 20px' }"
    :style="{'height': local.lang == 'en'? '420px':'356px'}"
    :bordered='false'
  >
    <template #extra>
      <!-- <a-link>{{ '管理' }}</a-link> -->
    </template>
    <a-row :gutter="8">
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsSettlementRateChannelList'])"
        @click="router.push({ name: 'trsSettlementRateChannel' })"
      >
        <div class="icon">
          <img src="@/assets/img/exchange.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4oc80')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4oc80') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsAccountCreate'])"
        @click="router.push({ name: 'trsAccountCreate' })"
      >
        <div class="icon">
          <img src="@/assets/img/TRSaccount.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4olk0')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4olk0') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['otcAccountCreate'])"
        @click="router.push({ name: 'otcAccountCreate' })"
      >
        <div class="icon">
          <img src="@/assets/img/account.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4oo40')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4oo40') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsAccountApplyList'])"
        @click="router.push({ name: 'trsAccountApply' })"
      >
        <div class="icon">
          <img src="@/assets/img/apply.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4oq80')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4oq80') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsAccountFinanceApplyList'])"
        @click="router.push({ name: 'trsAccountFinanceApply' })"
      >
        <div class="icon">
          <img src="@/assets/img/apply.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4osg0')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4osg0') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsAccountSymbolApplyList'])"
        @click="router.push({ name: 'trsAccountSymbolApply' })"
      >
        <div class="icon">
          <img src="@/assets/img/apply.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4ouo0')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4ouo0') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsAccountTerminateApplyList'])"
        @click="router.push({ name: 'trsAccountTerminateApply' })"
      >
        <div class="icon">
          <img src="@/assets/img/apply.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4owk0')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4owk0') }}
        </a-typography-paragraph>
      </a-col>
      <a-col
        :span="8"
        class="wrapper"
        v-if="$permission(['trsAccountContinueApplyList'])"
        @click="router.push({ name: 'trsAccountContinueApply' })"
      >
        <div class="icon">
          <img src="@/assets/img/apply.png" :alt="$t('TRScomponents.quick-operation.5uli3zk4p140')" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t('TRScomponents.quick-operation.5uli3zk4p140') }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" setup>
import router from "@/router";
const local = useLocal()
</script>

<style scoped lang="less">
:deep(.arco-card-header){
  height: 46px;
  padding:0px;
  align-items: center;
  padding-left: 10px;
}
</style>
