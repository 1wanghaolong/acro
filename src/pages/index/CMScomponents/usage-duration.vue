<template>
  <div v-if="$permission(['cmsUsageDuration'])">
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
            <div style="font-size: 1.2rem; padding-bottom: 4px">
              {{ $t('CMScomponents.usage-duration.5un2enqztlc0') }}
            </div>
            <a-select
              style="width: 120px"
              v-model="moneyFrom.moneyType"
              :placeholder="$t('CMScomponents.usage-duration.5un2enqzubg0')"
              @change="moneyTypeSelect"
            >
              <a-option :value="1">Android</a-option>
              <a-option :value="2">iOS</a-option>
            </a-select>
            <a-date-picker
              style="width: 200px"
              shortcuts-position="right"
              :allow-clear="false"
              v-model="rangeValue"
              :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
              @select-shortcut="selectShortcut"
              @change="changeRangePicker"
            />
          </div>
          <div>
            <a-radio-group
              v-model="moneyFrom.type"
              type="button"
              @change="radioGroupChange"
            >
              <a-radio value="daily_per_launch">{{ $t('CMScomponents.usage-duration.5un2enqzueo0') }}</a-radio>
              <a-radio value="daily">{{ $t('CMScomponents.usage-duration.5un2enqzugw0') }}</a-radio>
            </a-radio-group>
          </div>
        </div>
        <VCharts
          ref="Charts"
          :option="options"
          :autoresize="true"
          style="width: 100%; height: 500px"
        />
      </a-spin>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 579px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
    >
      {{ !$permission(["cmsUsageDuration"]) ? $t('CMScomponents.usage-duration.5un2enqzuiw0') : "" }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import dayjs from "dayjs";
const loading = ref(false);
const local = useLocal();
const { t } = useI18n();
const Charts = ref();
const rangeValue = ref(dayjs().subtract(1,'day').format("YYYY-MM-DD"));
const moneyFrom = ref({
  moneyType: 1,
  type: "daily_per_launch",
});
const selectShortcut = () => {
  userChart();
};
const changeRangePicker = () => {
  userChart();
};
const radioGroupChange = () => {
  userChart();
};
const moneyTypeSelect = () => {
  userChart();
};
const userChart = async () => {
  loading.value = true;
  let parms = {
    "filter[device]": moneyFrom.value.moneyType,
    "filter[date]": rangeValue.value,
    "filter[stat_type]": moneyFrom.value.type,
  };
  const { code, data } = await apiCms.cmsStatisticsUserTodayDurations(parms);
  loading.value = false;
  if (code != 1) return;
  if (!data.average || !data.list) {
    if (Charts.value) {
      Charts.value.setOption({
        xAxis: {
          data: [],
        },
        series: [
          {
            data: [],
          },
        ],
      });
      Charts.value.resize();
    }
    return;
  }
  optionUpdateData(data.list);
};
const optionUpdateData = (data: any) => {
  let xAxisList: any = [];
  const chartsData: number[] = [];
  xAxisList.push(...data.map((item: any) => item.name + "s"));
  xAxisList.forEach((item:any,index:any) => {
    if (index+1 == xAxisList.length) {
      let val = item.split('-')
      xAxisList[index] = val[0] + 's+'
    }
  });
  chartsData.push(...data.map((item: any) => item.num));
  if (Charts.value) {
    Charts.value.setOption({
      xAxis: {
        data: xAxisList,
      },
      series: [
        {
          data: chartsData,
        },
      ],
    });
    Charts.value.resize();
  }
};
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
    left: "6%",
    right: "40",
    top: "60",
    bottom: "30",
  },
  legend: {
    data: [t('CMScomponents.usage-duration.5un2enqztlc0')],
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
    // boundaryGap: false,
    axisLabel: {
      color: "#4E5969",
      formatter(value: number) {
        return `${value}`;
      },
    },
    axisLine: {
      show: true,
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
      name: t('CMScomponents.usage-duration.5un2enqztlc0'),
      type: "bar",
      barWidth: 45, // 设置柱状图的宽度，单位为像素
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
  await usePermission(["cmsUsageDuration"]) && userChart();
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
