<template>
  <div
    v-if="
      JSON.stringify(from.info) != '{}' && $permission(['statisticsChannelInfo'])
    "
  >
    <a-card class="general-card">
      <template #title>
        <div style="display: flex; width: 100%">
          <a-grid-item class="title">
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
                <span>{{ $t('TRScomponents.Customer-chart.5ulhiwmwomo0') }}</span>
                <div style="padding: 0 10px">
                  {{ $t('TRScomponents.Customer-chart.5ulhiwmwp680') }}
                </div>
                <a-range-picker
                  :allow-clear="false"
                  v-model="formData.trade_time"
                  @change="selectChange($event)"
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
                <div style="margin-left: 10px">{{ $t('TRScomponents.Customer-chart.5ulhiwmwp9k0') }}</div>
                <a-select
                  @change="selectChange($event)"
                  v-model="currency"
                  style="width: 150px; margin-left: 10px"
                  :placeholder="$t('TRScomponents.Customer-chart.5ulhiwmwpbk0')"
                >
                  <a-option
                    v-for="item in useEnums('currency')"
                    :value="item.value"
                    >{{
                      item.trans[local.lang] == "HKD"
                        ? $t('TRScomponents.Customer-chart.5ulhiwmwpdk0')
                        : item.trans[local.lang] == "USD"
                        ? $t('TRScomponents.Customer-chart.5ulhiwmwpg00')
                        : $t('TRScomponents.Customer-chart.5ulhiwmwpi00')
                    }}</a-option
                  >
                </a-select>
                <div style="margin: 0 10px">{{ $t('TRScomponents.Customer-chart.5ulhiwmwpk40') }}</div>
                <a-select
                  @change="selectChange($event,'3')"
                  v-model="counterAccountId"
                  style="width: 200px; margin-left: 10px"
                  allow-clear
                  @clear="selectChange($event,'3')"
                  :placeholder="$t('TRScomponents.Customer-chart.5ulhiwmwpk40')"
                >
                  <a-option
                    v-for="item in counterAccountList"
                    :value="item.id"
                    >{{ item.name }}</a-option
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
                <img
                  src="@/assets/img/transactions.png"
                  :alt="$t('TRScomponents.Customer-chart.5ulhiwmwpmc0')"
                />
              </a-avatar>
              <a-statistic
                :title="$t('TRScomponents.Customer-chart.5ulhiwmwpmc0')"
                :value="from.info.count"
                :precision="0"
                :value-from="0"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.Customer-chart.5ulhiwmwpok0') }}</span>
                  </template> -->
              </a-statistic>
            </a-space>
          </a-grid-item>
          <a-grid-item
            class="panel-col"
            :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
            style="border-right: none;"
          >
            <a-space>
              <a-avatar :size="54" class="col-avatar">
                <!-- <img alt="avatar"
                  src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image" /> -->
                <img
                  src="@/assets/img/Transaction.png"
                  :alt="`${$t('TRScomponents.Customer-chart.5ulhiwmwq0w0')}(${
                    currency == 'HKD'
                      ? $t('TRScomponents.Customer-chart.5ulhiwmwpdk0')
                      : currency == 'USD'
                      ? $t('TRScomponents.Customer-chart.5ulhiwmwpg00')
                      : $t('TRScomponents.Customer-chart.5ulhiwmwpi00')
                  })`"
                />
              </a-avatar>
              <a-statistic
                :title="`${$t('TRScomponents.Customer-chart.5ulhiwmwq0w0')}(${
                  currency == 'HKD'
                    ? $t('TRScomponents.Customer-chart.5ulhiwmwpdk0')
                    : currency == 'USD'
                    ? $t('TRScomponents.Customer-chart.5ulhiwmwpg00')
                    : $t('TRScomponents.Customer-chart.5ulhiwmwpi00')
                })`"
                :value="from.info.deal_amount"
                :value-from="0"
                :precision="2"
                animation
                show-group-separator
              >
                <!-- <template #suffix>
                    <span class="unit">{{ $t('TRScomponents.Customer-chart.5ulhiwmwpok0') }}</span>
                  </template> -->
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
              <a-link>{{ $t('TRScomponents.Customer-chart.5ulhiwmwpqg0') }}</a-link>
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
      <div style="padding: 10px 38px">
        <a-button :loading="loading" type="primary" @click="download">{{ $t('TRScomponents.Customer-chart.5ulhiwmwpso0') }}</a-button>
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
      {{ !$permission(["statisticsChannelInfo"]) ? $t('TRScomponents.Customer-chart.5ulhiwmwpus0') : $t('TRScomponents.Customer-chart.5ulhiwmwpww0') }}
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
const { t } = useI18n();
const currency = ref(useEnums("currency")?.[0].value);
const from: any = ref({
  info: {},
  xAxisList: [],
  chartsData: [],
  chartsData1: [],
});
const counterAccountList: any = ref([]);
const counterAccountId: any = ref(""); //通道账户id
const counterChannelAccountName:any = ref("") //通道账户名称
const Charts: any = ref();
const loading = ref(false);
const dataList:any = ref([])
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
    data: [t('TRScomponents.Customer-chart.5ulhiwmwpz00'), t('TRScomponents.Customer-chart.5ulhiwmwq0w0')],
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
      name: t('TRScomponents.Customer-chart.5ulhiwmwpz00'),
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
      name: t('TRScomponents.Customer-chart.5ulhiwmwq0w0'),
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
  ],
});
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
const selectChange = (val: any,type?:any) => {
  if (!val) {
    return;
  }
  fetchData();
  if (type == '3') {
    let list = counterAccountList.value.find((item:any)=> item.id == val)
    counterChannelAccountName.value = list.name
  }
};
const fetchData = async () => {
  from.value.xAxisList = [];
  from.value.chartsData = [];
  from.value.chartsData1 = [];
  let parms = {
    currency: currency.value,
    trade_time: formData.value.trade_time,
    counter_channel_account_id: counterAccountId.value,
  };
  loading.value = true;
  const { code, data } = await apiTrs.statisticsChannelInfo({
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
      from.value.chartsData1.push(item.deal_amount);
    });
  } else {
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
        ],
      });
      Charts.value.resize();
    }
    graphColour(local.theme)
  }, 100);
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
// 上手账户列表
const getCounterAccountlListAll = async () => {
  let parms = {
    account: "",
    counter_channel_id: "",
  };
  const { code, data } = await apiTrs.counterChannelAccountAll({
    ...useFilter(parms),
  });
  if (code != 1) return;
  counterAccountList.value = data;
};
const download = () => {
    if(!dataList.value?.length) return Message.warning(t('TRScomponents.Customer-chart.5ulhiwmwpww0'))
    let fields = [
        {
            title: t('TRScomponents.Customer-chart.5ulhiwmwq380'),
            field: 'date'
        },{
            title: t('TRScomponents.Customer-chart.5ulhiwmwpz00'),
            field: 'trade_count'
        },{
            title: t('TRScomponents.Customer-chart.5ulhiwmwq0w0'),
            field: 'deal_amount'
        },
        {
            title: t('TRScomponents.Customer-chart.5ulhiwmwp9k0'),
            field: 'currency'
        },
        {
            title: t('TRScomponents.Customer-chart.5ulhiwmwpk40'),
            field: 'counterChannelAccountName'
        }
    ]
    let list:any = cloneDeep(dataList.value)
    if (list.length) {
      list.forEach((item:any)=>{
        item.currency = currency.value || ""
        item.counterChannelAccountName = counterChannelAccountName.value || ""
        item.trade_count = ''+item.trade_count || ""
        item.deal_amount = ''+item.deal_amount || ""
      })
    }
    useDownloadExcel(fields, list, t('TRScomponents.Customer-chart.5ulhiwmwomo0'))
}
nextTick(async () => {
  await usePermission(["statisticsChannelInfo"]) && fetchData();
  await usePermission(["counterChannelAccountAll"]) && getCounterAccountlListAll();
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
