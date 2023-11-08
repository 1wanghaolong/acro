<template>
  <div
    v-if="
      JSON.stringify(from.info) != '{}' && $permission(['statisticsOrderInfo'])
    "
  >
    <a-card class="general-card">
      <template #title>
        <div style="display: flex; width: 100%">
          <a-grid-item class="title" >
            <a-col :span="12">
              <a-typography-title
                style="
                  margin-top: 0;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  width: 100%;
                "
                class="typographyTitle"
              >
                <span>{{ $t('TRScomponents.thoroughfare-chart.5uli4f7e8hg0') }}</span>
                <div style="padding: 0 10px">
                  {{ $t('TRScomponents.thoroughfare-chart.5uli4f7e8yw0') }}
                </div>
                <a-range-picker
                  :allow-clear='false'
                  v-model="formData.trade_time"
                  @change="selectChange()"
                  :disabledDate="(current) => dayjs(current).isAfter(dayjs())"
                  style="width: 300px"
                />
              </a-typography-title>
            </a-col>
            <a-col :span="20" style='padding-left:10px'>
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
                <div style="margin-left: 10px">{{ $t('TRScomponents.thoroughfare-chart.5uli4f7e9280') }}</div>
                <a-select
                  @change="selectChange()"
                  v-model="currency"
                  style="width: 150px; margin-left: 10px"
                  :placeholder="$t('TRScomponents.thoroughfare-chart.5uli4f7e94g0')"
                >
                  <a-option
                    v-for="item in useEnums('currency')"
                    :value="item.value"
                    >{{
                      item.trans[local.lang] == "HKD"
                        ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                        : item.trans[local.lang] == "USD"
                        ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                        : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                    }}</a-option
                  >
                </a-select>
                <div style="margin: 0 10px">{{'TRS'}}{{ $t('TRScomponents.thoroughfare-chart.5um2guje48w0') }}</div>
                <a-input
                  :style="{ width: '200px' }"
                  @change="selectChange()"
                  :placeholder="$t('TRScomponents.thoroughfare-chart.5uli4f7e9dg0')"
                  v-model='trsAccount'
                  allow-clear
                />
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
                <img src="@/assets/img/transactions.png" :alt="$t('TRScomponents.thoroughfare-chart.5uli4f7e9fo0')" />
              </a-avatar>
              <a-statistic
                :title="$t('TRScomponents.thoroughfare-chart.5uli4f7e9fo0')"
                :value="from.info.count"
                :precision="0"
                :value-from="0"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.thoroughfare-chart.5uli4f7e9i00') }}</span>
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
                  :alt="`${$t('TRScomponents.thoroughfare-chart.5uli4f7e9uo0')}(${
                    currency == 'HKD'
                      ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                      : currency == 'USD'
                      ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                      : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                  })`"
                />
              </a-avatar>
              <a-statistic
                :title="`${$t('TRScomponents.thoroughfare-chart.5uli4f7e9uo0')}(${
                  currency == 'HKD'
                    ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                    : currency == 'USD'
                    ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                    : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                })`"
                :value="from.info.deal_amount"
                :value-from="0"
                :precision="2"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.thoroughfare-chart.5uli4f7e9i00') }}</span>
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
                <img
                  src="@/assets/img/interest.png"
                  :alt="`${$t('TRScomponents.thoroughfare-chart.5uli4f7e9x40')}(${
                    currency == 'HKD'
                      ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                      : currency == 'USD'
                      ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                      : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                  })`"
                />
              </a-avatar>
              <a-statistic
                :title="`${$t('TRScomponents.thoroughfare-chart.5uli4f7e9x40')}(${
                  currency == 'HKD'
                    ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                    : currency == 'USD'
                    ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                    : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                })`"
                :value="from.info.calculate_value"
                :value-from="0"
                :precision="2"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.thoroughfare-chart.5uli4f7e9i00') }}</span>
                  </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
            style="border-right: none; padding-left: 21px"
          >
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image" /> -->
                <img
                  src="@/assets/img/profit.png"
                  :alt="`${$t('TRScomponents.thoroughfare-chart.5um2ied9op00')}(${
                    currency == 'HKD'
                      ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                      : currency == 'USD'
                      ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                      : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                  })`"
                />
              </a-avatar>
              <a-statistic
                :title="`${$t('TRScomponents.thoroughfare-chart.5um2ied9op00')}(${
                  currency == 'HKD'
                    ? $t('TRScomponents.thoroughfare-chart.5uli4f7e96s0')
                    : currency == 'USD'
                    ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9980')
                    : $t('TRScomponents.thoroughfare-chart.5uli4f7e9bc0')
                })`"
                :value="from.info.charge_fare"
                :precision="2"
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
              <a-link>{{ $t('TRScomponents.thoroughfare-chart.5uli4f7e9k00') }}</a-link>
            </template> -->
        <VCharts
          :loading="loading"
          ref="Charts"
          :option="options"
          :autoresize="true"
          style="width: 100%; height: 320px;padding:0 10px;"
        />
        <!-- </a-card> -->
      </a-spin>
      <div style='padding:10px 38px'>
        <a-button :loading="loading" type="primary" @click="download">{{$t('TRScomponents.thoroughfare-chart.5uli4f7e9m00')}}</a-button>
      </div>
    </a-card>
  </div>
  <div v-else>
    <a-card
      class="general-card"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
      "
      :style='local.lang == "en"? "height: 575px":"height: 553px"'
    >
      {{ !$permission(["statisticsOrderInfo"]) ? $t('TRScomponents.thoroughfare-chart.5uli4f7e9oc0') : $t('TRScomponents.thoroughfare-chart.5uli4f7e9q80') }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import VCharts from "vue-echarts";
import { graphic } from "echarts";
import { ref } from "vue";
import { useEnums } from "@/hooks/enums";
import dayjs from "dayjs";
const { t } = useI18n();
const local = useLocal();
const currency = ref(useEnums("currency")?.[0].value);
const from: any = ref({
  info: {},
  xAxisList: [],
  chartsData: [],
  chartsData1: [],
  chartsData2: [],
  chartsData3: [],
});
const Charts: any = ref();
const loading = ref(false);
const trsAccount = ref('')
const dataList:any = ref([])
// 获取最近七天日期
const getRecentSevenDays = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
  }
  return dates;
};
const recentSevenDays: any = getRecentSevenDays(); //获取最近七天日期
const formData: any = ref({
  trade_time: [recentSevenDays[0], recentSevenDays[6]],
});
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
    left: "4%",
    right: "40",
    top: "50",
    bottom: "30",
  },
  legend: {
    data: [t('TRScomponents.thoroughfare-chart.5uli4f7e9sk0'), t('TRScomponents.thoroughfare-chart.5uli4f7e9uo0'), t('TRScomponents.thoroughfare-chart.5uli4f7e9x40'), t('TRScomponents.thoroughfare-chart.5uli4f7ea140')],
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
    className: "echarts-tooltip-diy",
  },
  graphic: {
    elements: graphicElements.value,
  },
  series: [
    {
      data: from.value.chartsData,
      name: t('TRScomponents.thoroughfare-chart.5uli4f7e9sk0'),
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
      data: from.value.chartsData1,
      name: t('TRScomponents.thoroughfare-chart.5uli4f7e9uo0'),
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
            color: "rgba(36, 196, 252)",
          },
          {
            offset: 0.5,
            color: "rgba(112, 205, 64)",
          },
          {
            offset: 1,
            color: "rgba(196, 236, 176, 1)",
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
      name: t('TRScomponents.thoroughfare-chart.5uli4f7e9x40'),
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
            color: "rgba(36, 196, 252)",
          },
          {
            offset: 0.5,
            color: "rgba(252, 191, 53)",
          },
          {
            offset: 1,
            color: "rgba(252, 227, 189)",
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
      data: from.value.chartsData3,
      name: t('TRScomponents.thoroughfare-chart.5uli4f7ea140'),
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
            color: "rgba(36, 196, 252)",
          },
          {
            offset: 0.5,
            color: "rgba(239, 65, 65)",
          },
          {
            offset: 1,
            color: "rgba(228, 162, 195)",
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
const selectChange = () => {
  fetchData();
};
const fetchData = async () => {
  from.value.xAxisList = [];
  from.value.chartsData = [];
  from.value.chartsData1 = [];
  from.value.chartsData2 = [];
  from.value.chartsData3 = [];
  let parms = {
    currency: currency.value,
    trade_time: formData.value.trade_time,
    trs_account:trsAccount.value
  };
  loading.value = true;
  const { code, data } = await apiTrs.statisticsOrderInfo({
    ...useFilter(parms),
  });
  loading.value = false;
  if (code != 1) return;
  from.value.info = data.total;
  dataList.value = data?.list || []
  if (data.list.length) {
    data.list.forEach((item: any) => {
      from.value.xAxisList.push(item.date);
      from.value.chartsData.push(item.trade_count);
      from.value.chartsData1.push(item.deal_amount)
      from.value.chartsData2.push(item.calculate_value)
      from.value.chartsData3.push(item.charge_fare)
    });
  }else {
    let timeArray = [],
      startDate = dayjs(formData.value.trade_time[0]),
      endDate = dayjs(formData.value.trade_time[1]),
      currentDate = startDate,timeData = [] 
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      timeArray.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
    for (let index = 0; index < timeArray.length; index++) {
      timeData.push(0)
    }
    from.value.xAxisList = timeArray
    from.value.chartsData = timeData
    from.value.chartsData1 = timeData
    from.value.chartsData2 = timeData
    from.value.chartsData3 = timeData
  }
  setTimeout(() => {
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
            data: from.value.chartsData1,
          },
          {
            data: from.value.chartsData2,
          },
          {
            data: from.value.chartsData3,
          },
        ],
      });
      Charts.value.resize();
    }
    graphColour(local.theme)
  }, 100);
};
const download = () => {
    if(!dataList.value?.length) return Message.warning(t('TRScomponents.thoroughfare-chart.5uli4f7e9q80'))
    let fields = [
        {
            title: t('TRScomponents.thoroughfare-chart.5uli4f7ea3s0'),
            field: 'date'
        },{
            title: t('TRScomponents.thoroughfare-chart.5uli4f7e9sk0'),
            field: 'trade_count'
        },{
            title: t('TRScomponents.thoroughfare-chart.5uli4f7e9uo0'),
            field: 'deal_amount'
        },{
            title: t('TRScomponents.thoroughfare-chart.5uli4f7e9x40'),
            field: 'calculate_value'
        },{
            title: t('TRScomponents.thoroughfare-chart.5uli4f7ea140'),
            field: 'charge_fare'
        },
        {
            title: t('TRScomponents.thoroughfare-chart.5uli4f7e9280'),
            field: 'currency'
        },
        {
            title: 'TRS'+t('TRScomponents.thoroughfare-chart.5um2guje48w0'),
            field: 'trsAccount'
        }
    ]
    let list:any = cloneDeep(dataList.value)
    if (list.length) {
      list.forEach((item:any)=>{
        item.currency = currency.value || ""
        item.trsAccount = trsAccount.value || ""
        item.trade_count = ''+item.trade_count || ""
        item.deal_amount = ''+item.deal_amount || ""
        item.calculate_value = ''+item.calculate_value || ""
        item.charge_fare = ''+item.charge_fare || ""
      })
    }
    useDownloadExcel(fields, list, t('TRScomponents.thoroughfare-chart.5uli4f7e8hg0'))
}
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
  await usePermission(["statisticsOrderInfo"]) && fetchData();
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

:deep(.arco-select-view-single) {
  background-color: var(--color-fill-0);
}
:deep(.arco-card-size-medium .arco-card-header) {
  height: 50px;
  padding: 0px 0px 0px;
}
.title {
  display: flex;
  // width: 460px;
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
