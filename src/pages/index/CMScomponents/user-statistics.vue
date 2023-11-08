<template>
  <div v-if="$permission(['cmsUserStatistics'])">
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
            align-items:center;
            padding-top: 15px;
          "
        >
          <div style="display: flex; align-items: center">
            <div style="font-size: 1.2rem;padding-bottom:4px;">
              {{ $t('CMScomponents.user-statistics.5un2hpmuvh80') }}
            </div>
            <a-select style="width: 106px;" v-model="moneyFrom.moneyType" :placeholder="$t('CMScomponents.user-statistics.5un2hpmuwh80')"  @change="moneyTypeSelect">
              <a-option :value="1">Android</a-option>
              <a-option :value="2">iOS</a-option>
            </a-select>
            <a-range-picker
              style="width: 250px;"
              shortcuts-position="right"
              :shortcuts="rangeShortcuts"
              v-model="rangeValue"
              :allow-clear='false'
              :disabledDate="
                (current) => dayjs(current).isAfter(dayjs())
              "
              @select-shortcut="selectShortcut"
              @change="changeRangePicker"
            />
          </div>
          <div>
            <a-radio-group v-model="moneyFrom.type" type="button" @change='radioGroupChange'>
              <a-radio value="1" v-if="$permission(['cmsaddUserStatistics'])">{{$t('CMScomponents.user-statistics.5un2hpmuwmc0')}}</a-radio>
              <a-radio value="2" v-if="$permission(['cmsactiveUserStatistics'])">{{$t('CMScomponents.user-statistics.5un2hpmuwpw0')}}</a-radio>
              <a-radio value="3" v-if="$permission(['cmsstartupUserStatistics'])">{{$t('CMScomponents.user-statistics.5un2hpmuwtc0')}}</a-radio>
            </a-radio-group>
          </div>
        </div>
        <VCharts
            ref="Charts"
            :option="options"
            :autoresize="true"
            style="width: 100%; height: 300px"
          />
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
      {{ !$permission(["cmsUserStatistics"]) ? $t('CMScomponents.user-statistics.5un2hpmuwz40') : "" }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import dayjs from "dayjs";
const loading = ref(false);
const { t } = useI18n();
const Charts = ref()
const local = useLocal();
const rangeValue = ref([dayjs().subtract(7,'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')])
const moneyFrom = ref({
  moneyType: 1,
  type:"1"
});
const rangeShortcuts = ref([
  {
    label: t('CMScomponents.user-statistics.5un2hpmux2g0'),
    value: () => [dayjs().subtract(7,'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
  },
  {
    label: t('CMScomponents.user-statistics.5un2hpmux680'),
    value: () => [dayjs().subtract(1,'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
  },
  {
    label: t('CMScomponents.user-statistics.5un2hpmux9k0'),
    value: () => [dayjs().subtract(3, 'month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
  },
])
const graphicFactory = (side: any) => {
  return {
    type: "text",
    bottom: "8",
    ...side,
    style: {
      text: "",
      textAlign: "center",
      fill: "#4E5969",
      fontSize: 12,
    },
  };
};
const graphicElements = ref([
  graphicFactory({ left: "0%" }),
  graphicFactory({ right: 0 }),
]);
const axiosData = () =>{
  if (moneyFrom.value.type == '1') {
    registerUserChart()
  }
  if (moneyFrom.value.type == '2') {
    activeUserChart()
  }
  if (moneyFrom.value.type == '3') {
    launchesUserChart()
  }
}
const moneyTypeSelect = () =>{
  axiosData()
}
const radioGroupChange = () =>{
  axiosData()
}
const changeRangePicker = () =>{
  axiosData()
}
const selectShortcut = () =>{
  axiosData()
}
const registerUserChart = async () => { // 新增
  loading.value = true;
  let parms = {
    'filter[device]':moneyFrom.value.moneyType,
    'filter[start_date]':rangeValue.value[0],
    'filter[end_date]':rangeValue.value[1]
  }
  const { code, data } = await apiCms.cmsStatisticsUserRegister(parms);
  loading.value = false;
  if (code != 1) return;
  optionUpdateData(data)
};
const activeUserChart = async () => { // 活跃
  loading.value = true;
  let parms = {
    'filter[device]':moneyFrom.value.moneyType,
    'filter[start_date]':rangeValue.value[0],
    'filter[end_date]':rangeValue.value[1]
  }
  const { code, data } = await apiCms.cmsStatisticsUserTodayActive(parms);
  loading.value = false;
  if (code != 1) return;
  optionUpdateData(data)
};
const launchesUserChart = async () => { // 启动
  loading.value = true;
  let parms = {
    'filter[device]':moneyFrom.value.moneyType,
    'filter[start_date]':rangeValue.value[0],
    'filter[end_date]':rangeValue.value[1]
  }
  const { code, data } = await apiCms.cmsStatisticsUserTodaylaunches(parms);
  loading.value = false;
  if (code != 1) return;
  optionUpdateData(data)
};
const optionUpdateData = (data:any) =>{
  let xAxisList: any = [];
  const chartsData: number[] = [];
  xAxisList.push(...data.map((item: any) => item.date));
  chartsData.push(...data.map((item: any) => item.num));
  if (Charts.value) {
    Charts.value.setOption({
      xAxis: {
        data: xAxisList,
      },
      series: [
        {
          data: chartsData
        },
      ],
    });
    Charts.value.resize();
  }
}
const options = ref({
  grid: {
    left: "5%",
    right: "40",
    top: "60",
    bottom: "30",
  },
  legend: {
    data: [t('CMScomponents.user-statistics.5un2hpmuvh80')],
    left: "2%",
    top: "4%",
    textStyle: {
      color: "#4E5969",
    },
  },
  xAxis: {
    type: "category",
    offset: 2,
    data: [],
    boundaryGap: false,
    axisLabel: {
      color: "#4E5969",
      formatter(value: number) {
        return `${value}`;
      },
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      interval: (idx: number) => {
        if (idx === 0) return false;
        // if (idx === from.value.xAxisList.length - 1) return false;
        return true;
      },
      lineStyle: {
        color: "#E5E8EF",
      },
    },
    axisPointer: {
      show: true,
      lineStyle: {
        color: "#23ADFF",
        width: 2,
      },
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    axisLabel: {
      formatter(value: any, idx: number) {
        if (idx === 0) return value;
        return `${value}`;
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#E5E8EF",
      },
    },
  },
  tooltip: {
    trigger: "axis",
  },
  graphic: {
    elements: graphicElements.value,
  },
  series: [
    {
      data: [],
      name: t('CMScomponents.user-statistics.5un2hpmuvh80'),
      type: "line",
      symbolSize: 12,
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: 2,
        },
      },
      lineStyle: {
        width: 3,
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(30, 231, 255, 1)",
          },
          {
            offset: 0.5,
            color: "rgba(36, 154, 255, 1)",
          },
          {
            offset: 1,
            color: "rgba(111, 66, 251, 1)",
          },
        ]),
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(17, 126, 255, 0.16)",
          },
          {
            offset: 1,
            color: "rgba(17, 128, 255, 0)",
          },
        ]),
      },
    },
  ],
});
const graphColour = (newval:any) => {
  if (Charts.value) {
    Charts.value.setOption({
      legend: {
        textStyle: {
          color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#4E5969",
        },
      },
      xAxis: {
        axisLabel: {
          color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#4E5969",
        },
      },
      yAxis: {
        axisLabel: {
          color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#4E5969",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: newval == "dark" ? "rgba(255, 255, 255, 0.9)" : "#E5E8EF",
          },
        },
      },
    });
    Charts.value.resize();
  }
};
watch(
  () => local.theme,
  (newval:any) => {
    graphColour(newval)
  }
);
nextTick(async () => {
  await usePermission(["cmsUserStatistics"]) && registerUserChart()
  await graphColour(local.theme)
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
  font-size: 1.2rem;
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
</style>
