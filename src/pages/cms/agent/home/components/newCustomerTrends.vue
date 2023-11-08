<template>
  <div v-if="$permission(['cmsAgentPopularizeInviteUserTrend'])">
    <a-card class="general-card">
      <a-spin
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
            <div style="font-size: 20px;padding-bottom:4px;">
              {{ $t('components.newCustomerTrends.5um3fl4c8dc0') }}
            </div>
          </div>
          <div>
            <a-select  :style="{'width': local.lang=='en'?'140px':'120px'}" v-model="timeType" :placeholder="$t('components.newCustomerTrends.5um3fl4cin80')"  @change="selectChange">
              <a-option :value="1">{{$t('components.newCustomerTrends.5um3fl4cixc0')}}</a-option>
              <a-option :value="2">{{$t('components.newCustomerTrends.5um3fl4cjp40')}}</a-option>
              <a-option :value="3">{{$t('components.newCustomerTrends.5um3fl4cjv80')}}</a-option>
            </a-select>
          </div>
        </div>
      </a-spin>
      <VCharts
          ref="Charts"
          :loading="loading"
          :option="options"
          :autoresize="true"
          style="width: 100%; height: 400px"
        />
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        height: 479px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
    >
      {{ !$permission(["cmsAgentPopularizeInviteUserTrend"]) ? $t('components.newCustomerTrends.5um3fl4cjzg0') : $t('components.newCustomerTrends.5um3fl4ck380') }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const loading = ref(false);
const local = useLocal()
const Charts = ref()
const timeType = ref(1);
const dataTimeList:any = ref([])
const dataSeriesList:any = ref([])
const selectChange = () => {
  userChart()
};
const userChart = async () => {
  dataTimeList.value = []
  dataSeriesList.value = []
  let parms = {
    type:timeType.value
  };
  loading.value = true;
  const { code, data } = await apiCms.cmsAgentPopularizeInviteUserTrend(parms);
  loading.value = false;
  if (code != 1) return;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      dataTimeList.value.push(key)
      dataSeriesList.value.push(data[key])
    }
  }
  if (Charts.value) {
    Charts.value.setOption({
      xAxis: {
        data: dataTimeList.value,
      },
      series: [
        {
          data: dataSeriesList.value,
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
    left: "5%",
    right: "40",
    top: "60",
    bottom: "30",
  },
  legend: {
    data: [t('components.newCustomerTrends.5um3fl4c8dc0')],
    left: "2%",
    top: "4%",
    textStyle: {
      color: "#4E5969",
    },
  },
  xAxis: {
    type: "category",
    offset: 2,
    data: dataTimeList.value,
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
      data: dataSeriesList.value,
      name: t('components.newCustomerTrends.5um3fl4c8dc0'),
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
nextTick(async() => {
  await usePermission(["cmsAgentPopularizeInviteUserTrend"]) && userChart()
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
