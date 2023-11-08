<template>
  <div class="container" style="width: 100%;">
    <div class="left-side" v-if="$permission(['trsIndex'])">
      <div class="panel" v-if="$permission(['statisticsAccountInfo'])">
        <Banner />
        <DataPanel />
      </div>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px" v-if="$permission(['statisticsFinanceInfo'])">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
          <div class="panel">
            <financing-situation />
          </div>
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px" v-if="$permission(['statisticsOrderInfo'])">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
          <thoroughfareChart />
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px" v-if="$permission(['statisticsChannelInfo'])">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
          <CustomerChart />
        </a-grid-item>
      </a-grid>
    </div>
    <div class="right-side" v-if="$permission(['trsIndex'])">
      <a-grid :cols="24">
        <a-grid-item :span="24" v-if="$permission(['trsSettlementRateChannelList'])">
          <div class="panel moduler-wrap">
            <QuickOperation />
          </div>
        </a-grid-item>
        <a-grid-item class="panel" :span="24" style="margin-top: 30px;" v-if="$permission(['statisticsFinanceMessage'])">
          <Announcement />
        </a-grid-item>
        <a-grid-item class="panel" :span="24" style="margin-top: 12px;" v-if="$permission(['systemDownloadInfo'])">
          <Docs />
        </a-grid-item>
      </a-grid>
    </div>
    <div class="left-side" v-if="$permission(['cmsIndex'])">
      <div class="cmspanel" v-if="$permission(['cmsUserSummary'])">
        <Banner />
        <Registration />
      </div>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px" v-if="$permission(['cmsCashOutChart']) || $permission(['cmsCashDepositChart'])">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }">
          <div class="panel">
            <money-chart />
          </div>
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px" v-if="$permission(['cmsAppStatistics']) || $permission(['cmsUserStatistics'])">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }">
          <appStatistics/>
        </a-grid-item>
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }">
          <userStatistics/>
        </a-grid-item>
      </a-grid>
      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px" v-if="$permission(['cmsUserRetention']) || $permission(['cmsUsageDuration'])">
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }">
          <userRetention />
        </a-grid-item>
        <a-grid-item :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12, xxl: 12 }">
          <usageDuration/>
        </a-grid-item>
      </a-grid>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import Banner from './TRScomponents/banner.vue';
import DataPanel from './TRScomponents/data-panel.vue';
import financingSituation from './TRScomponents/financingSituation.vue';
import thoroughfareChart from './TRScomponents/thoroughfare-chart.vue';
import CustomerChart from './TRScomponents/Customer-chart.vue';
import QuickOperation from './TRScomponents/quick-operation.vue';
import Announcement from './TRScomponents/announcement.vue';
import Docs from './TRScomponents/docs.vue';

// cms
import Registration from './CMScomponents/Registration.vue';
import moneyChart from './CMScomponents/money-chart.vue';
import userRetention from './CMScomponents/user-retention.vue';
import usageDuration from './CMScomponents/usage-duration.vue';
import appStatistics from './CMScomponents/app-statistics.vue';
import userStatistics from './CMScomponents/user-statistics.vue';
</script>
  
<script lang="ts">
export default {
  name: 'Dashboard'
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
.cmspanel{
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
</style>
  