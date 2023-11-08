<template>
  <div v-if="$permission(['cmsCashOutChart']) || $permission(['cmsCashDepositChart'])">
    <a-card class="general-card">
      <a-spin :loading="loading" style="width: 100%">
        <div
          style="
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding-top: 15px;
          "
        >
          <div style="display: flex">
            <!-- <a-select
              style="margin-left: 25px"
              v-model="moneyFrom.moneyType"
              :placeholder="$t('CMScomponents.money-chart.5un2dk25r4k0')"
            >
              <a-option :value="1">{{$t('CMScomponents.money-chart.5un2dk25rqo0')}}</a-option>
              <a-option :value="2">{{$t('CMScomponents.money-chart.5un2dk25rw00')}}</a-option>
            </a-select> -->
            <a-select
              style="margin-left: 25px"
              v-model="moneyFrom.currency"
              :placeholder="$t('CMScomponents.money-chart.5un2dk25s1s0')"
              @change='selectChange'
            >
              <a-option
                v-for="item in useEnums('currency')"
                :value="item.value"
                >{{ item.trans[local.lang] }}</a-option
              >
            </a-select>
          </div>
          <a-range-picker
            style="margin-right: 40px"
            shortcuts-position="right"
            :shortcuts="rangeShortcuts"
            :allow-clear='false'
            v-model="rangeValue"
            :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
            @select-shortcut="selectShortcut"
            @change="changeRangePicker"
          />
        </div>
        <VCharts
          ref="Charts"
          :option="options"
          :autoresize="true"
          style="width: 100%; height: 320px"
        />
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 399px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
    >
      {{ !$permission(['cmsCashOutChart']) && !$permission(['cmsCashDepositChart']) ? $t('CMScomponents.money-chart.5un2dk25s700') : "" }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import { useEnums } from "@/hooks/enums";
import dayjs from "dayjs";
const local = useLocal();
const { t } = useI18n();
const loading = ref(false);
const rangeValue: any = ref([
  dayjs().subtract(7, "day").format("YYYY-MM-DD"),
  dayjs().format("YYYY-MM-DD"),
]);
const moneyFrom = ref({
  // moneyType: 1,
  currency: "HKD",
});
const Charts = ref();
const rangeShortcuts = ref([
  {
    label: t('CMScomponents.money-chart.5un2dk25sa80'),
    value: () => [
      dayjs().subtract(7, "day").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
  {
    label: t('CMScomponents.money-chart.5un2dk25scs0'),
    value: () => [
      dayjs().subtract(1, "month").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
  {
    label: t('CMScomponents.money-chart.5un2dk25sf00'),
    value: () => [
      dayjs().subtract(3, "month").format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ],
  },
]);
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
const options = ref({
  grid: {
    left: "3%",
    right: "40",
    top: "70",
    bottom: "30",
  },
  legend: {
    data: [t('CMScomponents.money-chart.5un2dk25si80')],
    left: "2%",
    top: "4%",
    textStyle: {
      color: "#4E5969",
    },
  },
  xAxis: {
    type: "category",
    offset: 2,
    data: ["10-01", "10-02", "10-03", "10-04", "10-05", "10-06", "10-07"],
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
      data: [1, 2, 1, 0, 2, 2, 2],
      name: t('CMScomponents.money-chart.5un2dk25rqo0'),
      type: "line",
      smooth: true,
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
    {
      data: [2, 3, 1, 0, 2, 2, 2],
      name: t('CMScomponents.money-chart.5un2dk25rw00'),
      type: "line",
      smooth: true,
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
            color: "rgb(164, 212, 140)",
          },
          {
            offset: 1,
            color: "rgb(236, 241, 241)",
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
const selectShortcut = () => {
  cashDepositChart();
  cashOutChart()
};
const changeRangePicker = () =>{
  cashDepositChart();
  cashOutChart()
}
const selectChange = () =>{
  cashDepositChart();
  cashOutChart()
}
const dataTimeListClick = (startDate:any, endDate:any,data:any) => {
  const allDates = [];
  const dataTimeList: { time: string; count: number }[] = [];
  let currentDate = dayjs(startDate).startOf('day');

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    allDates.push(currentDate.format('MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  allDates.forEach((item: any) => {
    dataTimeList.push({
      time: item,
      count: 0,
    });
  });
  if (data.length) {
    data.forEach((item: any) => {
      const dataTimeItem = dataTimeList.find(
        (item2: any) => item.time === item2.time
      );
      if (dataTimeItem) {
        dataTimeItem.count = Number(item.amount);
      }
    });
  }
  return {allDates,dataTimeList}
};
const cashOutChart = async () => {
  loading.value = true;
  let parms = {
    status:'2',
    chargeCurrency:moneyFrom.value.currency,
    checkTime:rangeValue.value,
    '_fields.fields':'sum(charge_amount - charge_fee) as amount,FROM_UNIXTIME(check_time, "%m-%d") as time',
    '_group.group':'time'
  }
  const { code, data } = await apiCms.cmsChargeWithdrawSummary({
    ...useFilter(parms),
  });
  loading.value = false;
  if (code != 1) return;
  let xAxisList: any;
  const chartsData: number[] = [];
  let objectData = dataTimeListClick(rangeValue.value[0],rangeValue.value[1],data.list)
  xAxisList = objectData.allDates || []
  chartsData.push(...objectData.dataTimeList.map((item: any) => item.count));
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
};
const cashDepositChart = async () => {
  loading.value = true;
  let parms = {
    status:'4',
    chargeCurrency:moneyFrom.value.currency,
    checkTime:rangeValue.value,
    '_fields.fields':'sum(charge_amount - charge_fee) as amount,FROM_UNIXTIME(check_time, "%m-%d") as time',
    '_group.group':'time'
  }
  const { code, data } = await apiCms.cmsChargePaymentSummary({
    ...useFilter(parms),
  });
  loading.value = false;
  if (code != 1) return;
  let xAxisList: any;
  const chartsData: number[] = [];  
  let objectData = dataTimeListClick(rangeValue.value[0],rangeValue.value[1],data.list)
  xAxisList = objectData.allDates || []
  chartsData.push(...objectData.dataTimeList.map((item: any) => item.count));
  if (Charts.value) {
    Charts.value.setOption({
      xAxis: {
        data: xAxisList,
      },
      series: [
        {
          
        },
        {
          data: chartsData,
        },
      ],
    });
    Charts.value.resize();
  }
};
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
  await usePermission(["cmsCashOutChart"]) && cashOutChart(); //出金
  await usePermission(["cmsCashDepositChart"]) && cashDepositChart(); //入金
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
  font-size: 20px;
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
