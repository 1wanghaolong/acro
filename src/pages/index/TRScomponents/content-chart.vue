<template>
  <div
    v-if="
      JSON.stringify(from.info) != '{}' && $permission(['statisticsOrderInfo'])
    "
  >
    <a-card class="general-card">
      <template #title>
        <div style="display: flex">
          <a-grid-item class="title">
            <a-col :span="24">
              <a-typography-title
                style="
                  margin-top: 0;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                "
                class="typographyTitle"
              >
                <span>{{ $t('TRScomponents.content-chart.5ulhi7m49xo0') }}</span>
                <a-select
                  @change="selectChange($event, '1')"
                  v-model="DataVal"
                  style="width: 110px; margin-left: 10px"
                  :placeholder="$t('TRScomponents.content-chart.5ulhi7m4afg0')"
                >
                  <a-option v-for="item in dataList" :value="item.value">{{
                    item.trans[local.lang]
                  }}</a-option>
                </a-select>
              </a-typography-title>
            </a-col>
            <a-col :span="24" style="margin-right: 20px">
              <a-typography-title
                style="
                  margin-top: 0;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  height: 51px;
                  margin-bottom: 0px;
                "
              >
                <a-link style="margin-left: 10px"
                  >{{ $t('TRScomponents.content-chart.5ulhi7m4ais0')
                  }}{{
                    formData.currency == "HKD"
                      ? $t('TRScomponents.content-chart.5ulhi7m4al00')
                      : formData.currency == "USD"
                      ? $t('TRScomponents.content-chart.5ulhi7m4amw0')
                      : formData.currency == "CNY"
                      ? $t('TRScomponents.content-chart.5ulhi7m4ap40')
                      : ""
                  }}</a-link
                >
                <a-select
                  @change="selectChange($event, '2')"
                  v-model="currency"
                  style="width: 80px; margin-left: 10px"
                  :placeholder="$t('TRScomponents.content-chart.5ulhi7m4arc0')"
                >
                  <a-option
                    v-for="item in useEnums('currency')"
                    :value="item.value"
                    >{{ item.trans[local.lang] }}</a-option
                  >
                </a-select>
              </a-typography-title>
            </a-col>
          </a-grid-item>
        </div>
      </template>
      <a-spin style="width: 100%">
        <a-grid :cols="24" :row-gap="16" class="panel">
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/transactions.png" :alt="$t('TRScomponents.content-chart.5ulhi7m4atc0')" />
              </a-avatar>
              <a-statistic
                :title="$t('TRScomponents.content-chart.5ulhi7m4atc0')"
                :value="from.info.count"
                :precision="1"
                :value-from="0"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.content-chart.5ulhi7m4awg0') }}</span>
                  </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image" /> -->
                <img
                  src="@/assets/img/Transaction.png"
                  :alt="$t('TRScomponents.content-chart.5ulhi7m4ayk0')"
                />
              </a-avatar>
              <a-statistic
                :title="$t('TRScomponents.content-chart.5ulhi7m4ayk0')"
                :value="from.info.deal_amount"
                :value-from="0"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.content-chart.5ulhi7m4awg0') }}</span>
                  </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
          >
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/interest.png" :alt="$t('TRScomponents.content-chart.5ulhi7m4b0o0')" />
              </a-avatar>
              <a-statistic
                :title="$t('TRScomponents.content-chart.5ulhi7m4b0o0')"
                :value="from.info.calculate_value"
                :value-from="0"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.content-chart.5ulhi7m4awg0') }}</span>
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
              <a-avatar :size="54" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image" /> -->
                <img src="@/assets/img/profit.png" :alt="$t('TRScomponents.content-chart.5ulhi7m4b2o0')" />
              </a-avatar>
              <a-statistic
                :title="$t('TRScomponents.content-chart.5ulhi7m4b2o0')"
                :value="from.info.charge_fare"
                :precision="1"
                :value-from="0"
                animation
                :value-style="{
                  color:
                    Number(from.info.charge_fare) >= 0
                      ? '#0fbf60'
                      : 'rgb(255 108 108)',
                }"
              >
                <template #prefix>
                  <icon-arrow-rise v-if="Number(from.info.charge_fare) >= 0" />
                  <icon-arrow-fall v-if="Number(from.info.charge_fare) < 0" />
                </template>
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item :span="24">
            <a-divider class="panel-border" />
          </a-grid-item>
        </a-grid>
        <!-- <a-card class="general-card" :header-style="{ paddingBottom: 0 }" :body-style="{
            paddingTop: '20px',
          }"> -->
        <!-- <template #extra>
              <a-link>{{ $t('TRScomponents.content-chart.5ulhi7m4cqc0') }}</a-link>
            </template> -->
        <VCharts
          :loading="loading"
          ref="Charts"
          :option="options"
          :autoresize="true"
          style="width: 100%; height: 320px; padding: 0 10px"
        />
        <!-- </a-card> -->
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 501px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
    >
      {{ !$permission(["statisticsOrderInfo"]) ? $t('TRScomponents.content-chart.5ulhi7m4ct00') : $t('TRScomponents.content-chart.5ulhi7m4cvc0') }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import { ref } from "vue";
import { useEnums } from "@/hooks/enums";
import dayjs from "dayjs";
const local = useLocal();
const DataVal = ref("1");
const { t } = useI18n();
const currency = ref(useEnums('currency')?.[0].value);
const from: any = ref({
  info: {
    // count:0,
    // deal_amount:0,
    // calculate_value:0,
    // charge_fare:0,
  },
  xAxisList: [],
  chartsData: [],
  chartsData2: [],
});
const Charts: any = ref();
const loading = ref(false);
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
// 获取最近七天日期
const getRecentSevenDays = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }
  return dates;
};
const recentSevenDays: any = getRecentSevenDays(); //获取最近七天日期

// 获取最近十五天日期
const getRecentFifteenDays = () => {
  const dates = [];
  for (let i = 14; i >= 0; i--) {
    dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }
  return dates;
};
const recentFifteenDays: any = getRecentFifteenDays(); // 获取最近十五天日期
// 获取最近三十天日期
const getRecentThirtyDays = () => {
  const dates = [];
  for (let i = 29; i >= 0; i--) {
    dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }
  return dates;
};
const recentThirtyDays: any = getRecentThirtyDays(); // 获取最近三十天日期
// 调用环比函数
const getPreviousWeekSevenDays = (list: any, day: any) => {
  const dates: any = [];
  if (!list.length && !day) {
    return;
  }
  list.forEach((item: any) => {
    const date = dayjs(item);
    const newDate = date.subtract(day, "day");
    dates.push(newDate.format("YYYY-MM-DD"));
  });
  return dates;
};
// 示例用法
const WeekSevenDays: any = getPreviousWeekSevenDays(recentSevenDays, 7); //获取上一周日期
const WeekFifteenDays: any = getPreviousWeekSevenDays(recentFifteenDays, 15); // 获取上个15天的日期
const WeekThirtyDays: any = getPreviousWeekSevenDays(recentThirtyDays, 30); // 获取上个月日期
// console.log('WeekSevenDays',WeekSevenDays);
// console.log('WeekFifteenDays',WeekFifteenDays);
// console.log('WeekThirtyDays',WeekThirtyDays);
const options = ref({
  grid: {
    left: "3%",
    right: "40",
    top: "50",
    bottom: "30",
  },
  legend: {
    data: [t('TRScomponents.content-chart.5ulhi7m4cxk0'), t('TRScomponents.content-chart.5ulhi7m4d0c0')],
    left: "2%",
    top: "4%",
    textStyle: {
      color: "#4E5969",
    },
  },
  xAxis: {
    type: "category",
    offset: 2,
    data: from.value.xAxisList,
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
    formatter(params: any) {
      const [firstElement, WeekElement] = params as any[];
      if (firstElement && WeekElement) {
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>${
              firstElement.seriesName
            }:</span><span class="tooltip-value">${Number(
          firstElement.value
        ).toLocaleString()}</span></div>
          </div>
          <div v-if='${WeekElement}'>
            <p class="tooltip-title">${
              DataVal.value == "1"
                ? WeekSevenDays[WeekElement?.dataIndex]
                : DataVal.value == "2"
                ? WeekFifteenDays[WeekElement?.dataIndex]
                : DataVal.value == "3"
                ? WeekThirtyDays[WeekElement?.dataIndex]
                : ""
            }</p>
            <div class="content-panel"><span>${
              WeekElement?.seriesName
            }:</span><span class="tooltip-value">${Number(
          WeekElement?.value
        ).toLocaleString()}</span></div>
          </div>`;
      }
      if (firstElement) {
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>${
              firstElement.seriesName
            }:</span><span class="tooltip-value">${Number(
          firstElement.value
        ).toLocaleString()}</span></div>
          </div>`;
      }
      if (WeekElement) {
        return `
          <div v-if='${WeekElement}'>
            <p class="tooltip-title">${
              DataVal.value == "1"
                ? WeekSevenDays[WeekElement?.dataIndex]
                : DataVal.value == "2"
                ? WeekFifteenDays[WeekElement?.dataIndex]
                : DataVal.value == "3"
                ? WeekThirtyDays[WeekElement?.dataIndex]
                : ""
            }</p>
            <div class="content-panel"><span>${
              WeekElement?.seriesName
            }:</span><span class="tooltip-value">${Number(
          WeekElement?.value
        ).toLocaleString()}</span></div>
          </div>`;
      }
    },
    className: "echarts-tooltip-diy",
  },
  graphic: {
    elements: graphicElements.value,
  },
  series: [
    {
      data: from.value.chartsData,
      name: t('TRScomponents.content-chart.5ulhi7m4cxk0'),
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
      data: from.value.chartsData2,
      name: t('TRScomponents.content-chart.5ulhi7m4d0c0'),
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
            color: "rgba(123, 181, 252, 1)",
          },
          {
            offset: 0.5,
            color: "rgba(101, 237, 252, 1)",
          },
          {
            offset: 1,
            color: "rgba(123, 181, 252, 1)",
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
const formData: any = ref({
  trade_time: [recentSevenDays[0], recentSevenDays[6]],
});
const formWeekData: any = ref({
  trade_time: [WeekSevenDays[0], WeekSevenDays[6]],
});
const selectChange = (val: any, type: any) => {
  if (!val) {
    return;
  }
  if (type == "1") {
    if (val == "1") {
      formData.value.trade_time = [recentSevenDays[0], recentSevenDays[6]];
      formWeekData.value.trade_time = [WeekSevenDays[0], WeekSevenDays[6]];
    }
    if (val == "2") {
      formData.value.trade_time = [recentFifteenDays[0], recentFifteenDays[14]];
      formWeekData.value.trade_time = [WeekFifteenDays[0], WeekFifteenDays[14]];
    }
    if (val == "3") {
      formData.value.trade_time = [recentThirtyDays[0], recentThirtyDays[29]];
      formWeekData.value.trade_time = [WeekThirtyDays[0], WeekThirtyDays[29]];
    }
    fetchData();
  }
  if (type == "2") {
    fetchData();
  }
};
const dataList = ref([
  {
    value: "1",
    trans: {
      "zh-CN": t('TRScomponents.content-chart.5ulhi7m4d280'),
      tc: t('TRScomponents.content-chart.5ulhi7m4d280'),
      en: t('TRScomponents.content-chart.5ulhi7m4d280'),
    },
  },
  {
    value: "2",
    trans: {
      "zh-CN": t('TRScomponents.content-chart.5ulhi7m4d4c0'),
      tc: t('TRScomponents.content-chart.5ulhi7m4d4c0'),
      en: t('TRScomponents.content-chart.5ulhi7m4d4c0'),
    },
  },
  {
    value: "3",
    trans: {
      "zh-CN": t('TRScomponents.content-chart.5ulhi7m4d680'),
      tc: t('TRScomponents.content-chart.5ulhi7m4d680'),
      en: t('TRScomponents.content-chart.5ulhi7m4d680'),
    },
  },
]);
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
const fetchData = async () => {
  from.value.xAxisList = [];
  from.value.chartsData = [];
  formData.value.currency = currency.value;
  loading.value = true;
  const { code, data } = await apiTrs.statisticsOrderInfo({
    ...useFilter(formData.value),
  });
  loading.value = false;
  if (code != 1) return;
  from.value.info = data.total;
  if (data.list.length) {
    data.list.forEach((item: any) => {
      from.value.xAxisList.push(item.date);
      from.value.chartsData.push(item.trade_count);
    });
  }
  chainData();
};
const chainData = async () => {
  from.value.weekXAxisList = [];
  from.value.chartsData2 = [];
  loading.value = true;
  formWeekData.value.currency = currency.value;
  const { code, data } = await apiTrs.statisticsOrderInfo({
    ...useFilter(formWeekData.value),
  });
  loading.value = false;
  if (code != 1) return;
  if (data.list.length) {
    data.list.forEach((item: any) => {
      from.value.chartsData2.push(item.trade_count);
    });
  } else {
    let indexList: any;
    if (DataVal.value == "1") {
      indexList = 7;
    }
    if (DataVal.value == "2") {
      indexList = 15;
    }
    if (DataVal.value == "3") {
      indexList = 30;
    }
    for (let index = 0; index < indexList; index++) {
      from.value.chartsData2.push(0);
    }
  }
  if (Charts.value) {
    Charts.value.setOption({
      xAxis: {
        data: from.value.xAxisList,
      },
      series: [
        {
          data: from.value.chartsData,
        },
        {
          data: from.value.chartsData2,
        },
      ],
    });
    Charts.value.resize()
  }
};
watch(
  () => local.theme,
  (newval:any) => {
    graphColour(newval)
  }
);
nextTick( async () => {
  await usePermission(["statisticsOrderInfo"]) && fetchData();
  await graphColour(local.theme)
});
</script>

<style scoped lang="less">
.panel {
  margin-bottom: 0;
  padding: 3px 0px;
}

.panel-col {
  padding-left: 30px;
  border-right: 1px solid rgb(var(--gray-2));
}
.col-avatar {
  margin-right: 12px;
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
</style>
