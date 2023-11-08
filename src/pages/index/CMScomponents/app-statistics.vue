<template>
  <div v-if="$permission(['cmsAppStatistics'])">
    <a-card class="general-card">
      <a-spin
        :loading="loading"
        style="width: 100%; display: flex; flex-direction: column"
      >
        <div
          style="
            width: 95%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 15px;
          "
        >
          <div style="display: flex; align-items: center">
            <div style="width: 150px; font-size: 1.2rem; padding-bottom: 4px">
              {{ "APP" }}{{ $t('CMScomponents.app-statistics.5un2dabdefs0') }}
            </div>
            <a-select
              v-model="moneyFrom.device"
              :placeholder="$t('CMScomponents.app-statistics.5un2d24fkug0')"
              @change="fetchData()"
            >
              <a-option :value="1">Android</a-option>
              <a-option :value="2">iOS</a-option>
            </a-select>
          </div>
          <div>
            <icon-sync :style="{fontSize:'25px'}" v-if='!Refresh' style="cursor: pointer" @click='fetchData()' />
            <icon-sync :style="{fontSize:'25px'}" spin v-else style="cursor: pointer" />
          </div>
        </div>
        <div class="statistics_content">
          <div class="statistics_card bg-reds">
            <div class="card_title">{{$t('CMScomponents.app-statistics.5un2d24fm900')}}</div>
            <div class="card_num big-red">{{ from?.newUsers || 0 }}</div>
            <div class="card_contrast">
              <span>{{$t('CMScomponents.app-statistics.5un2d24fmew0')}}</span>
              <span>
                <i class="">
                  {{
                    Number(from?.newUsers) - Number(from?.yesterdayNewUsers) ||
                    0
                  }}
                  ({{
                    percentageVal(from?.newUsers,from?.yesterdayNewUsers)
                  }}%)
                </i></span
              >
            </div>
            <div class="card_line line-red"></div>
            <div class="card_yesterday">
              <span class="yesterday_title">{{$t('CMScomponents.app-statistics.5un2d24fmhw0')}}</span>
              <span class="yesterday_num">{{
                from?.yesterdayNewUsers || 0
              }}</span>
            </div>
          </div>
          <div class="statistics_card bg-blues">
            <div class="card_title">{{$t('CMScomponents.app-statistics.5un2d24fmkw0')}}</div>
            <div class="card_num big-blue">{{ from?.totalUsers || 0 }}</div>
            <div class="card_contrast">
              <span>{{$t('CMScomponents.app-statistics.5un2d24fmew0')}}</span>
              <span
                ><!---->
                <i class="">
                  {{
                    Number(from?.totalUsers) -
                      Number(from?.yesterdayTotalUsers) || 0
                  }}({{
                    percentageVal(from?.totalUsers,from?.yesterdayTotalUsers)
                  }}%)
                </i></span
              >
            </div>
            <div class="card_line line-blue"></div>
            <div class="card_yesterday">
              <span class="yesterday_title">{{$t('CMScomponents.app-statistics.5un2d24fmhw0')}}</span>
              <span class="yesterday_num">{{
                from?.yesterdayTotalUsers || 0
              }}</span>
            </div>
          </div>
          <div class="statistics_card bg-yellows">
            <div class="card_title">{{$t('CMScomponents.app-statistics.5un2d24fmp40')}}</div>
            <div class="card_num big-yellow">
              {{ from?.activityUsers || 0 }}
            </div>
            <div class="card_contrast">
              <span>{{$t('CMScomponents.app-statistics.5un2d24fmew0')}}</span>
              <span
                ><!---->
                <i class="">
                  {{
                    Number(from?.activityUsers) -
                      Number(from?.yesterdayActivityUsers) || 0
                  }}({{
                    percentageVal(from?.activityUsers,from?.yesterdayActivityUsers)
                  }}%)
                </i></span
              >
            </div>
            <div class="card_line line-yellow"></div>
            <div class="card_yesterday">
              <span class="yesterday_title">{{$t('CMScomponents.app-statistics.5un2d24fmhw0')}}</span>
              <span class="yesterday_num">{{
                from?.yesterdayActivityUsers || 0
              }}</span>
            </div>
          </div>
          <div class="statistics_card bg-greens">
            <div class="card_title">{{$t('CMScomponents.app-statistics.5un2d24fmrw0')}}</div>
            <div class="card_num big-green" style='padding: 18px 15px;'>{{ from?.launches || 0 }}</div>
            <div class="card_contrast">
              <span>{{$t('CMScomponents.app-statistics.5un2d24fmew0')}}</span>
              <span
                ><!---->
                <i>
                  {{
                    Number(from?.launches) - Number(from?.yesterdayLaunches) ||
                    0
                  }}({{
                    percentageVal(from?.launches,from?.yesterdayLaunches)
                  }}%)
                </i></span>
            </div>
            <div class="card_line line-green"></div>
            <div class="card_yesterday">
              <span class="yesterday_title">{{$t('CMScomponents.app-statistics.5un2d24fmhw0')}}</span>
              <span class="yesterday_num">{{
                from?.yesterdayLaunches || 0
              }}</span>
            </div>
          </div>
        </div>
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 379px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
    >
      {{ !$permission(["cmsAppStatistics"]) ? $t('CMScomponents.app-statistics.5un2d24fmuk0') : "" }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
const loading = ref(false);
const moneyFrom = ref({
  device: 1,
});
const from: any = ref({});
const Refresh = ref(false)
const fetchData = async () => {
  loading.value = true;
  Refresh.value = true
  const { code, data } = await apiCms.cmsStatisticsUserTodayYesterday({
    ...useFilter(moneyFrom.value),
  });
  loading.value = false;
  Refresh.value = false
  if (code != 1) return;
  from.value = data;
};
const percentageVal = (val:any,yesterdayval:any) =>{
  if (!val && !yesterdayval) {
    return '0'
  }
  if (!yesterdayval && val) {
    return '100'
  }
  let value = Number.isInteger((Number(val)  / Number(yesterdayval) * 100)-100) ? (Number(val)  / Number(yesterdayval) * 100)-100 : ((Number(val)  / Number(yesterdayval) * 100)-100).toFixed(2)
  return value 
}
onMounted(() => {
  usePermission(["cmsAppStatistics"]) && fetchData();
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
  align-items: center;
}
:deep(.arco-statistic-content .arco-statistic-value) {
  font-size: 1.5rem;
  padding-left: 10px;
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
.statistics_content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  padding: 60px 15px;
  height: 300px;
}
.statistics_content .bg-reds {
  background-image: url("@/assets/img/appCount1.png");
}
.statistics_content .bg-blues {
  background-image: url("@/assets/img/appCount2.png");
}
.statistics_content .bg-yellows {
  background-image: url("@/assets/img/appCount3.png");
}
.statistics_content .bg-greens {
  background-image: url("@/assets/img/appCount4.png");
}
.statistics_content .statistics_card {
  width: 164px;
  background-size: 164px 180px;
  background-repeat: no-repeat;
  height: 100%;
}
.statistics_content .statistics_card .card_title {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  color: var(--color-neutral-10);
  padding: 15px;
}
.statistics_content .statistics_card .card_num {
  padding: 10px 15px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-family: DIN;
  font-weight: 700;
  color: rgb(var(--red-6));
}
.statistics_content .statistics_card .card_contrast {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: var(--color-neutral-8);
  text-align: center;
  padding-bottom: 5px;
}
.statistics_content .statistics_card .card_contrast i {
  font-style: normal;
}
.statistics_content .statistics_card .line-red {
  background-color: rgb(var(--red-6));
}
.statistics_content .statistics_card .card_line {
  height: 3px;
  margin: 0 16px;
}
.statistics_content .statistics_card .card_yesterday {
  text-align: center;
}
.statistics_content .statistics_card .card_yesterday .yesterday_title {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: var(--color-neutral-8);
}
.statistics_content .statistics_card .card_yesterday .yesterday_num {
  font-size: 20px;
  font-family: DIN;
  font-weight: 700;
  display: line-block;
  margin-left: 5px;
}
.statistics_content .statistics_card .line-blue {
  background-color: rgb(var(--arcoblue-6));
}
.statistics_content .statistics_card .line-yellow {
  background-color: rgb(var(--orange-5));
}
.statistics_content .statistics_card .line-green {
  background-color: rgb(var(--green-6));
}
.statistics_content .statistics_card .big-red {
  color: rgb(var(--red-6));
}
.statistics_content .statistics_card .big-blue {
  color: rgb(var(--arcoblue-6));
}
.statistics_content .statistics_card .big-yellow {
  color: rgb(var(--orange-5));
}
.statistics_content .statistics_card .big-green {
  color: rgb(var(--green-6));
}
</style>
