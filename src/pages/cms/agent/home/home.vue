<template>
  <div class="container" style="width: 100%">
    <div class="left-side">
      <div class="cmspanel">
        <a-col class="banner">
          <a-col :span="8">
            <a-typography-title
              :heading="5"
              style="margin-top: 0"
              class="title"
            >
            {{$t('home.home.5um37pbu5zg0')}}
            </a-typography-title>
          </a-col>
          <!-- <a-divider class="panel-border" /> -->
        </a-col>
      </div>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <div class="panel">
            <finance />
          </div>
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <div class="panel">
            <agent />
          </div>
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }"
        >
          <newCustomerTrends />
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }"
        >
          <newAccountOpeningTrendsfrom />
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }"
        >
          <newInvestmentTrend />
        </a-grid-item>
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }"
        >
          <newTradingCustomerTrends />
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <div class="panel">
            <monthAgent />
          </div>
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <div class="panel">
            <lastMonthAgent />
          </div>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import finance from "./components/finance.vue";
import agent from "./components/agent.vue";
import newCustomerTrends from "./components/newCustomerTrends.vue";
import newAccountOpeningTrendsfrom from "./components/newAccountOpeningTrendsfrom.vue";
import newInvestmentTrend from "./components/newInvestmentTrend.vue";
import newTradingCustomerTrends from "./components/newTradingCustomerTrends.vue";
import monthAgent from "./components/monthAgent.vue";
import lastMonthAgent from "./components/lastMonthAgent.vue";
</script>

<script lang="ts">
export default {
  name: "Dashboard",
};
</script>

<style lang="less" scoped>
:deep(::-webkit-scrollbar) {
  width: 0px;
  height: 0px;
}

.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
  overflow: auto;
}

.left-side {
  flex: 1;
  // overflow: auto;
}

.right-side {
  width: 350px;
  margin-left: 16px;
  // overflow: auto;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
.cmspanel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}

.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);

  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }

    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        // background-color: #e8f3ff;
      }

      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    // background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>

<style lang="less" scoped>
// responsive
.mobile {
  .container {
    display: block;
  }

  .right-side {
    // display: none;
    width: 100%;
    margin-left: 0;
    margin-top: 16px;
  }
}

:deep(.link-card .arco-card-body) {
  padding: 16px 0px;
}
.banner {
    width: 100%;
    background-color: var(--color-fill-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
  .title{
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: 0px;
    margin-bottom:0px;
  }
  :deep(.arco-divider-horizontal){
    margin:0px;
  }
</style>
